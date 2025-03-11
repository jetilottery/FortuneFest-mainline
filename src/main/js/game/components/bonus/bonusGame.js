define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const BonusPoint = require('game/components/bonus/BonusPoint');
    const BonusRow = require('game/components/bonus/BonusRow');
    const RowButton = require('game/components/bonus/RowButton');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const bonusHelpButton = require('game/components/bonusHelpButton');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let points = [];
    let totalWin = 0;
    let pointGroups = {
        1: { points: [], prizeAwarded: null, prizeSpine: null, addedToTotalWin: false },
        2: { points: [], prizeAwarded: null, prizeSpine: null, addedToTotalWin: false },
        3: { points: [], prizeAwarded: null, prizeSpine: null, addedToTotalWin: false },
        4: { points: [], prizeAwarded: null, prizeSpine: null, addedToTotalWin: false },
        5: { points: [], prizeAwarded: null, prizeSpine: null, addedToTotalWin: false },
    };
    let symbolData = [];
    let rowButtons = [];
    let complete = false;

    let multiplier = 0;

    let idle = false;

    function init() {
        displayList.bonusGame.visible = false;
        displayList.bonusGameMultiplierMeterValue.text = multiplier + 'x';
        displayList.bonusGameTotalBonusWinMeterValueEcho.alpha = 0;

        let pointGroupIndex = 0;
        points = displayList.bonusGameNumberContainer.children.map((e, i) => {
            return BonusPoint.fromContainer(e, i);
        });

        points.forEach((e, i) => {
            if (i % 5 === 0) {
                pointGroupIndex++;
            }
            pointGroups[pointGroupIndex]['points'].push(e);
            e.group = pointGroupIndex;
            e.on('press', () => {
                e.onMouseDown();
                idle = true;
                idleMouseOut();
            });
            e.on('mouseover', idleMouseOver);
            e.on('mouseout', idleMouseOut);

            e.interactive = false;
        });

        for (let i = 1; i < 6; i++) {
            pointGroups[i]['prizeSpine'] = BonusRow.fromContainer(displayList['rowAnimationContainer_' + i], i);
        }

        displayList.bonusGameRow1Label.text = 1;
        displayList.bonusGameRow2Label.text = 2;
        displayList.bonusGameRow3Label.text = 3;
        displayList.bonusGameRow4Label.text = 4;
        displayList.bonusGameRow5Label.text = 5;

        displayList.bonusAutoPlayButton.on('press', () => {
            autoPlay._enabled = true;
            disableAutoPlayButton();
            bonusHelpButton.disable();

            msgBus.publish('UI.updateButtons', {
                help: { enabled: false },
            });
        });

        rowButtons = [
            RowButton.fromContainer(displayList.bonusGameRow1LabelContainer, pointGroups[1].points),
            RowButton.fromContainer(displayList.bonusGameRow2LabelContainer, pointGroups[2].points),
            RowButton.fromContainer(displayList.bonusGameRow3LabelContainer, pointGroups[3].points),
            RowButton.fromContainer(displayList.bonusGameRow4LabelContainer, pointGroups[4].points),
            RowButton.fromContainer(displayList.bonusGameRow5LabelContainer, pointGroups[5].points)
        ];

        idle = true;
    }

    function idleMouseOver() {
        if (!autoPlay.enabled) {
            points.forEach(e => {
                if (!e.revealed && e.enabled) {
                    e.onMouseOver();
                }
            });
        }
    }

    function disableMouse() {
        points.forEach(e => {
            e.interactive = false;
        });
    }

    function idleMouseOut() {
        if (!autoPlay.enabled && idle) {
            idle = false;
            Tween.delayedCall(2, () => {

                let unlocked = points.every(e => {
                    return e.getMouseOver() === false;
                });

                points.forEach(e => {
                    if (!e.revealed && e.enabled) {
                        if (unlocked) {
                            e.idleState();
                        }
                        idle = true;
                    }
                });
            });
        }
    }

    function populate(data) {
        symbolData = data;
    }

    function next(tier) {
        return symbolData[tier].shift();
    }

    function endOfGamePrompt() {
        return new Promise(resolve => {
            displayList.bonusGameTotalBonusWinMeterValueEcho.text = displayList.bonusGameTotalBonusWinMeterValue.text;
            displayList.bonusGameTotalBonusWinMeterValueEcho.alpha = 1;
            displayList.bonusGameTotalBonusWinMeterValueEcho.scale.set(0);


            msgBus.publish('Game.ResolveBonusTokenValue', totalWin);

            Tween.to(displayList.bonusGameTotalBonusWinMeterValueEcho.scale,
                0.5, {
                    delay: 0.5,
                    x: 3.5,
                    y: 3.5,
                    repeat: 3,
                    onStart: () => {
                        audio.play('totalBonusWin');

                    },
                    onComplete: () => {
                        meterData.win += totalWin;
                        resolve();
                    }
                });
            Tween.to(displayList.bonusGameTotalBonusWinMeterValueEcho,
                0.5, {
                    delay: 0.5,
                    alpha: 0,
                    repeat: 3
                });
        });
    }

    function enable() {
        displayList.bonusAutoPlayButton.enabled = SKBeInstant.config.autoRevealEnabled;
        Tween.to(displayList.bonusAutoPlayButton, 0.3, {
            alpha: 1
        });
        bonusHelpButton.enable();

        complete = true;

        rowButtons.forEach(e => {
            e.enable();
        });

        msgBus.publish('toPlatform', {
            channel: 'Game',
            topic: 'Game.Control',
            data: { name: 'howToPlay', event: 'enable', params: [true] },
        });
        msgBus.publish('toPlatform', {
            channel: 'Game',
            topic: 'Game.Control',
            data: { name: 'paytable', event: 'enable', params: [true] },
        });

        let index = 0;

        return points.map(async (e, i, a) => {
            await e.enable();
            let data = next(e.group - 1);
            e.setValue(data);
            if (!autoPlay.enabled && !e.buttonPressed) {
                audio.play('megamatchTileFlip');
            }
            index++;
            if (index === a.length) {
                bonusHelpButton.disable();
                disableAutoPlayButton();
            }
            await e.uncover();
            checkLine(e.group, e.value);
        });
    }

    function checkLine(group, data) {
        if (pointGroups[group]) {

            let indices = pointGroups[group]['points'].filter(e => {
                return e.value === data;
            });

            if (indices.length === 3) {
                indices.forEach(e => {
                    e.setToWinState();
                });
                pointGroups[group]['prizeAwarded'] = indices[0].prizeValue;
                if (!indices[0].multiplierSet) {
                    multiplier += Number(indices[0].multiplierValue.slice(0, -1));
                    displayList.bonusGameMultiplierMeterValueEcho.alpha = 1;
                    displayList.bonusGameMultiplierMeterValue.alpha = 0;

                    displayList.bonusGameMultiplierMeterValue.scale.set(10);
                    displayList.bonusGameMultiplierMeterValue.text = multiplier + 'x';
                    Tween.to(displayList.bonusGameMultiplierMeterValue.scale, 0.25, {
                        x: 1,
                        y: 1,
                        onComplete: () => {
                            displayList.bonusGameMultiplierMeterValueEcho.text = displayList.bonusGameMultiplierMeterValue.text;
                        }
                    });
                    Tween.to(displayList.bonusGameMultiplierMeterValue, 0.25, {
                        alpha: 1
                    });
                    Tween.to(displayList.bonusGameMultiplierMeterValueEcho, 0.25, {
                        alpha: 0
                    });

                    displayList.bonusGameMultiplierMeterValueEcho.scale.set(1);
                    Tween.to(displayList.bonusGameMultiplierMeterValueEcho.scale, 0.25, {
                        x: 2,
                        y: 2
                    });

                    indices[0].multiplierSet = true;
                    audio.play('megamatch3Multipliers');
                }
            }

            let lineComplete = pointGroups[group]['points'].every(e => {
                return e.value !== undefined;
            });

            if (lineComplete) {
                pointGroups[group]['points'].forEach(e => {
                    Tween.delayedCall(1, () => {
                        if (!e.winStateSet) {
                            e.dim();
                        }
                    });
                });
                rowButtons[group - 1].disable();
            }

            if (lineComplete && pointGroups[group]['prizeAwarded']) {
                if (!pointGroups[group]['addedToTotalWin']) {
                    pointGroups[group]['addedToTotalWin'] = true;
                    pointGroups[group]['prizeSpine'].playWinningRowAnim();
                    addToTotalWin(pointGroups[group]['prizeAwarded']);
                }
            }
        }
    }

    function revealAll() {

        let unpressed = rowButtons.filter(e => {
            return e.enabled === true;
        });

        return unpressed.map((e) => Tween.delayedCall(0, () => {
            e.onPointerDown();
        }, null, e));
    }

    function addToTotalWin(val) {
        totalWin += val;
        displayList.bonusGameTotalBonusWinMeterValue.text = SKBeInstant.formatCurrency(totalWin).formattedAmount;
    }

    function checkIfComplete() {
        return complete;
    }

    function reset() {
        points.forEach(e => {
            e.reset();
        });
        Object.keys(pointGroups).forEach(e => {
            pointGroups[e].prizeAwarded = null;
            pointGroups[e].prizeSpine.reset();
            pointGroups[e].addedToTotalWin = false;
        });
        rowButtons.forEach(e => {
            e.reset();
        });
        displayList.bonusAutoPlayButton.enabled = false;
        displayList.bonusGameTotalBonusWinMeterValue.text = "";
        displayList.bonusGameTotalBonusWinMeterValueEcho.alpha = 0;
        totalWin = 0;
        complete = false;

        multiplier = 0;
        displayList.bonusGameMultiplierMeterValue.text = "";
        displayList.bonusGameMultiplierMeterValueEcho.text = displayList.bonusGameMultiplierMeterValue.text;
        idle = true;
    }



    function disableAutoPlayButton() {

        disableMouse();

        displayList.bonusAutoPlayButton.enabled = false;
        Tween.to(displayList.bonusAutoPlayButton, 0.3, {
            alpha: 0.5
        });
    }

    return {
        init,
        enable,
        reset,
        populate,
        revealAll,
        checkIfComplete,
        endOfGamePrompt,
    };

});