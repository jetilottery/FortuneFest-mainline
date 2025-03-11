define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const gameRow = require('game/components/gameRow');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const PIXI = require('com/pixijs/pixi');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');

    const layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
    const templateLayout = require('game/template/layout');
    const layout = require('skbJet/componentManchester/standardIW/layout');

    const orientation = require('skbJet/componentManchester/standardIW/orientation');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let spotsUp;
    let spotsDown;

    let inGame = false;
    let atEndPlaque = false;

    let parts = {};

    let indicatorsOff;
    let indicatorsOn;

    let initSetup = true;

    let postionSet = undefined;

    let ticketPrefix = "";

    function init() {
        if (gameConfig.spotsAsMultiplier) {
            parts = {
                indicatorContainer: displayList.ticketMultiplierIndicatorContainer
            };

            spotsUp = displayList.ticketMultiplierUpButton;
            spotsDown = displayList.ticketMultiplierDownButton;

            spotsUp.renderable = false;
            spotsDown.renderable = false;

            spotsUp.on('press', () => {
                meterData.spots += 1;
                atEndPlaque = false;
                adjustSpots({spotUIUpdate: true});
                if (meterData.spotsIndex === (SKBeInstant.config.gameConfigurationDetails.availableNumberOfSpots.length - 1)) {
                    audio.play('costMax');
                } else {
                    audio.play('costUp');
                }
            });

            spotsDown.on('press', () => {
                meterData.spots -= 1;
                atEndPlaque = false;
                adjustSpots({spotUIUpdate: true});
                audio.play('costDown');
            });

            displayList.buyButton.on('press', () => {
                inGame = true;
                disableSpots();
            });
            displayList.tryButton.on('press', () => {
                inGame = true;
                disableSpots();
            });

            displayList.helpButton.on('press', () => {
                disableSpots();
            });

            displayList.ticketCostDownButton.on('press',()=>{
                adjustSpots({spotUIUpdate: true});
            });

            displayList.ticketCostUpButton.on('press',()=>{
                adjustSpots({spotUIUpdate: true});
            });

            adjustSpots({spotUIUpdate: true});

            if (SKBeInstant.config.gameConfigurationDetails.availableNumberOfSpots.length > 1 && SKBeInstant.config.jLotteryPhase === 2) {
                if(SKBeInstant.config.gameType === "ticketReady") {
                    msgBus.publish('MeterData.Spots', meterData.spotsIndex);
                }
                setupPips();
                spotsUp.renderable = true;
                spotsDown.renderable = true;
            }
        } else {
            displayList.ticketMultiplierContainer.visible = false;
            displayList.totalCostContainer.visible = false;
        }
        setTotalCostHeader();
        updatePosition();
    }

    function disableSpots() {
        if (gameConfig.spotsAsMultiplier) {
            spotsUp.enabled = false;
            spotsDown.enabled = false;
            Tween.to(displayList.ticketMultiplierContainer,
                gameConfig.fastFadeDuration, {
                    alpha: 0.5
                });
        }
    }

    function adjustSpots() {
        if (gameConfig.spotsAsMultiplier) {


            if (inGame) {
                disableSpots();
                return;
            }

            Tween.to(displayList.ticketMultiplierContainer,
                gameConfig.fastFadeDuration, {
                    alpha: 1
                });

            disableOrEnableButton(spotsUp, meterData.spotsIndex >= (SKBeInstant.config.gameConfigurationDetails.availableNumberOfSpots.length - 1));
            disableOrEnableButton(spotsDown, meterData.spotsIndex <= 0);
            if (!atEndPlaque) {
                gameRow.setRows();

                displayList.ticketMultiplierValue.text = meterData.spots * 5;
                msgBus.publish('Game.SpotsChanged');

                if (indicatorsOn) {
                    indicatorsOn.forEach(function (indicator, i) {
                        indicator.visible = i === meterData.spotsIndex;
                    });
                }
                if (indicatorsOff) {
                    indicatorsOff.forEach(function (indicator, i) {
                        indicator.visible = i !== meterData.spotsIndex;
                    });
                }

            }
        }
    }

    function disableOrEnableButton(button, condition) {
        if (gameConfig.spotsAsMultiplier) {

            if (condition) {
                button.enabled = false;
            } else {
                button.enabled = true;
            }
        }
    }

    function setTotalCost() {
        displayList.totalCostValue.text = ticketPrefix + SKBeInstant.formatCurrency(meterData.ticketCost).formattedAmount;
    }

    function setupPips() {
        let iWidth = 12;
        let iHeight = 4;
        let iGap = 4;

        if (parts.indicatorActive) {
            iWidth = parts.indicatorActive.width;
            if (parts.indicatorActive.parent) {
                parts.indicatorActive.parent.removeChild(parts.indicatorActive);
            }
        }

        if (parts.indicatorInactive) {
            iWidth = Math.max(iWidth, parts.indicatorInactive.width);
            if (parts.indicatorInactive.parent) {
                parts.indicatorInactive.parent.removeChild(parts.indicatorInactive);
            }
        }

        function createMarker(index, total, fill) {
            let graphic = new PIXI.Graphics();
            let startX = (total * iWidth + (total - 1) * iGap) / -2;
            let x = startX + index * (iWidth + iGap);
            graphic.beginFill(fill);
            graphic.drawRoundedRect(x, iHeight / -2, iWidth, iHeight, 2);
            graphic.endFill();
            return graphic;
        }

        function cloneMarker(index, total, sprite) {
            var clone = new PIXI.Sprite(sprite.texture);
            var startX = (total * iWidth + (total - 1) * iGap) / -2;
            clone.position.x = startX + index * (iWidth + iGap);
            return clone;
        }

        if (parts.indicatorContainer && !indicatorsOn) {
            indicatorsOn = SKBeInstant.config.gameConfigurationDetails.availableNumberOfSpots.map(function (cost, i, costs) {
                if (parts.indicatorActive) {
                    return cloneMarker(i, costs.length, parts.indicatorActive);
                }
                return createMarker(i, costs.length, 0xffffff);
            });
            indicatorsOff = SKBeInstant.config.gameConfigurationDetails.availableNumberOfSpots.map(function (cost, i, costs) {
                if (parts.indicatorInactive) {
                    return cloneMarker(i, costs.length, parts.indicatorInactive);
                }
                return createMarker(i, costs.length, 0x0099cc);
            });
            parts.indicatorContainer.addChild.apply(
                parts.indicatorContainer,
                indicatorsOff.concat(indicatorsOn)
            );
        }
    }

    function setInGame(val) {
        if (gameConfig.spotsAsMultiplier) {
            inGame = val;
            if (inGame) {
                adjustSpots();
            }
        }
    }

    function setInitPrice() {
        if (gameConfig.spotsAsMultiplier) {
            if (initSetup) {
                if (SKBeInstant.config.gameType !== "ticketReady") {
                    meterData._ticketCost = meterData.ticketCosts[0];
                }
                initSetup = false;
            }
        }
    }

    function setAtEndPlaque(val) {
        if (gameConfig.spotsAsMultiplier) {
            atEndPlaque = val;
        }
    }

    function setBonusTotalCost() {
        displayList.wheelGameTicketCostMeterValue.text = displayList.ticketSelectCostValue.text;
        displayList.bonusGameTicketCostMeterValue.text = displayList.ticketSelectCostValue.text;
    }

    function updatePosition() {
        postionSet = displayList.ticketMultiplierPositionStandard;
        if(SKBeInstant.config.jLotteryPhase === 1 || (SKBeInstant.config.gameConfigurationDetails.availableNumberOfSpots.length === 1 && SKBeInstant.config.gameConfigurationDetails.availablePrices.length === 1)) {
            postionSet = displayList.ticketMultiplierPositionSingle;
        }
        displayList.ticketMultiplierContainer.position = postionSet;
    }

    function handleAbortedTicketPurchase() {
        setAtEndPlaque(true);
        setInGame(false);
        adjustSpots({spotUIUpdate: true});

        setTotalCostHeader();
        setTotalCost();
    }

    function onOrientationChange() {
        layoutEngine.update(
            templateLayout.baseGame,
            layout.layouts,
            orientation.get()
        );

        updatePosition();
    }

    function setTotalCostHeader() {
        ticketPrefix = SKBeInstant.config.wagerType === "BUY" ? "" : resources.i18n.Game.ticketCostPrefix.TRY;
        setTotalCost();
    }

    function playerWantsToPlay() {
        disableSpots();
    }

    msgBus.subscribe('UI.updateButtons', adjustSpots);
    msgBus.subscribe('MeterData.TicketCost', setTotalCost);

    msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);

    msgBus.subscribe('jLottery.reInitialize', handleAbortedTicketPurchase);
    msgBus.subscribe('jLotterySKB.reset', handleAbortedTicketPurchase);

    msgBus.subscribe('jLotteryGame.playerWantsToPlay', playerWantsToPlay);
    msgBus.subscribe('jLotteryGame.playerWantsToRePlay', playerWantsToPlay);

    msgBus.subscribe('jLotteryGame.playerWantsToMoveToMoneyGame', playerWantsToPlay);


    return {
        init,
        setInGame,
        setInitPrice,
        setAtEndPlaque,
        setTotalCost,
        setBonusTotalCost,
    };
});