define(require => {
        const displayList = require('skbJet/componentManchester/standardIW/displayList');
        const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
        const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
        const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
        const audio = require('skbJet/componentManchester/standardIW/audio');
        var machine = require('skbJet/componentManchester/standardIW/stateMachine/machine');

        const LuckyNumber = require('game/components/baseGame/LuckyNumber');
        const YourNumber = require('game/components/baseGame/YourNumber');

        const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
        const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

        const bonusGame = require('game/components/bonus/bonusGame');
        const wheelGame = require('game/components/wheelGame/wheelGame');
        const transition = require('game/components/transition/transition');


        require('com/gsap/TweenMax');
        const Tween = window.TweenMax;

        let luckyNumbers = [];
        let yourNumbers = [];

        let symbolData = {
            LuckyStar: [],
            YourStar: []
        };

        let luckyNumbersRevealed = false;
        let yourTicketsRevealed = false;

        let totalYourNumbers;
        let totalYourNumbersData;
        let autoRevealLuckyNumbers = gameConfig.autoRevealLuckyNumbers || false;

        let bonusToken = undefined;

        function init() {
            luckyNumbers = [
                LuckyNumber.fromContainer(displayList.luckyNumber_1, 1, displayList.luckyNumberEffect_1),
                LuckyNumber.fromContainer(displayList.luckyNumber_2, 2, displayList.luckyNumberEffect_2),
                LuckyNumber.fromContainer(displayList.luckyNumber_3, 3, displayList.luckyNumberEffect_3),
                LuckyNumber.fromContainer(displayList.luckyNumber_4, 4, displayList.luckyNumberEffect_4),
                LuckyNumber.fromContainer(displayList.luckyNumber_5, 5, displayList.luckyNumberEffect_5),
            ];
            yourNumbers = [
                YourNumber.fromContainer(displayList.yourNumber_1, 1, displayList.yourNumberEffect_1),
                YourNumber.fromContainer(displayList.yourNumber_2, 2, displayList.yourNumberEffect_2),
                YourNumber.fromContainer(displayList.yourNumber_3, 3, displayList.yourNumberEffect_3),
                YourNumber.fromContainer(displayList.yourNumber_4, 4, displayList.yourNumberEffect_4),
                YourNumber.fromContainer(displayList.yourNumber_5, 5, displayList.yourNumberEffect_5),
                YourNumber.fromContainer(displayList.yourNumber_6, 6, displayList.yourNumberEffect_6),
                YourNumber.fromContainer(displayList.yourNumber_7, 7, displayList.yourNumberEffect_7),
                YourNumber.fromContainer(displayList.yourNumber_8, 8, displayList.yourNumberEffect_8),
                YourNumber.fromContainer(displayList.yourNumber_9, 9, displayList.yourNumberEffect_9),
                YourNumber.fromContainer(displayList.yourNumber_10, 10, displayList.yourNumberEffect_10),
                YourNumber.fromContainer(displayList.yourNumber_11, 11, displayList.yourNumberEffect_11),
                YourNumber.fromContainer(displayList.yourNumber_12, 12, displayList.yourNumberEffect_12),
                YourNumber.fromContainer(displayList.yourNumber_13, 13, displayList.yourNumberEffect_13),
                YourNumber.fromContainer(displayList.yourNumber_14, 14, displayList.yourNumberEffect_14),
                YourNumber.fromContainer(displayList.yourNumber_15, 15, displayList.yourNumberEffect_15),
                YourNumber.fromContainer(displayList.yourNumber_16, 16, displayList.yourNumberEffect_16),
                YourNumber.fromContainer(displayList.yourNumber_17, 17, displayList.yourNumberEffect_17),
                YourNumber.fromContainer(displayList.yourNumber_18, 18, displayList.yourNumberEffect_18),
                YourNumber.fromContainer(displayList.yourNumber_19, 19, displayList.yourNumberEffect_19),
                YourNumber.fromContainer(displayList.yourNumber_20, 20, displayList.yourNumberEffect_20),
            ];

            luckyNumbers.forEach(e => {
                e.setDefaultAnimation();
                e.pickpointArray = yourNumbers.concat(luckyNumbers);
            });
            yourNumbers.forEach(e => {
                e.setDefaultAnimation();
                e.pickpointArray = yourNumbers.concat(luckyNumbers);
            });
        }

        function intro() {
            luckyNumbers.forEach(e => {
                e.intro();
            });
            yourNumbers.forEach(e => {
                e.intro();
            });
        }

        function disablePointsForBonus() {
            yourNumbers.forEach(e => {
                e.interactive = false;
            });
        }

        function enablePointsAfterBonus() {
            yourNumbers.forEach(e => {
                if (e.reveal !== undefined) {
                    e.interactive = true;
                }
            });
        }

        function enable() {
            totalYourNumbers = scenarioData.scenario.baseGameAmount.length;

            if (luckyNumbers[0].autoRevealOnStart) {
                if (window.Howler !== undefined) {
                    if (window.Howler._audioUnlocked) {
                        audio.play('autoReveaLuckyNumber');
                    }
                }
            }

            if (totalYourNumbers !== totalYourNumbersData) {
                machine.next('ERROR');
                return;
            }

            return {
                luckyNumbers: () => {

                    let index = 0;
                    let total = 0;

                    return luckyNumbers.map(async (e, i, a) => {
                        total = a.length;
                        e.inGame = true;
                        await e.enable();
                        let data = next(e.type);
                        e.setValue(data);
                        index++;
                        if (index === total) {
                            luckyNumbersRevealed = true;
                            if (yourTicketsRevealed) {
                                msgBus.publish('UI.updateButtons', {
                                    autoPlay: false,
                                    help: {enabled: false},
                                });
                            }
                        }
                        await e.uncover();
                        await findMatch(e);
                    });
                },
                yourNumbers: () => {

                    let index = 0;
                    let total = 0;

                    return yourNumbers.slice(0, totalYourNumbers).map(async (e, i, a) => {
                            total = a.length;
                            e.inGame = true;
                            await e.enable();
                            let data = next(e.type);
                            let value = data.value;
                            if (e.type === "YourStar") {
                                e.setAmount(data.amount);
                            }

                            let preCheckWinReveal = luckyNumbers.map(e => {
                                return e.value;
                            });
                            e.setValue(value, preCheckWinReveal.indexOf(value) !== -1);

                            if (bonusToken === undefined) {

                                bonusToken = e.value === 'Y' || e.value === 'Z' ? e : undefined;

                                if (bonusToken !== undefined && !autoPlay.enabled) {
                                    disablePointsForBonus();
                                }
                            }

                            if (!autoPlay.enabled) {
                                audio.playSequential('yourNumberSelect');
                            }
                            index++;
                            if (index === total) {
                                yourTicketsRevealed = true;
                                if (luckyNumbersRevealed) {
                                    msgBus.publish('UI.updateButtons', {
                                        autoPlay: false,
                                        help: {enabled: false},
                                    });
                                }
                            }
                            await e.uncover();
                            if (['Y', 'Z'].indexOf(value) > -1) {
                                audio.play('goldCoinReveal');
                                if (!autoPlay.enabled) {
                                    await jumpToBonus();
                                }
                            }
                            await findMatch(e);
                        }
                    );
                }
            }
                ;
        }

        function revealAll() {
            let remaining = {
                luckyNumbers: [],
                yourNumbers: [
                    [],
                    [],
                    [],
                    []
                ]
            };

            function yourNumbersRevealAll(e, index) {
                if (e.revealed === false && e.reveal !== undefined) {
                    remaining.yourNumbers[index].push(new Tween.delayedCall(0, () => {
                        e.reveal();
                        if (e.audio !== undefined) {
                            audio.playSequential(e.audio);
                        }
                    }, null, e));
                }
            }

            luckyNumbers.forEach(e => {
                if (e.revealed === false) {
                    remaining.luckyNumbers.push(e);
                }
            });
            yourNumbers.slice(0, 5).map((e) => {
                yourNumbersRevealAll(e,0);
            });
            yourNumbers.slice(5, 10).map((e) => {
                yourNumbersRevealAll(e,1);
            });
            yourNumbers.slice(10, 15).map((e) => {
                yourNumbersRevealAll(e,2);
            });
            yourNumbers.slice(15, 20).map((e) => {
                yourNumbersRevealAll(e,3);
            });

            RevealAllAudioLookAhead(yourNumbers, 'autoRevealYourNumberSelect', 'yourNumberSelect', 5);

            return remaining = {
                luckyNumbers: remaining.luckyNumbers.map((e, i) => Tween.delayedCall(0, () => {
                    e.reveal();
                    if (i % 5 === 0) {
                        audio.play('autoReveaLuckyNumber');
                    }
                }, null, e)),
                yourNumbers: remaining.yourNumbers
            };
        }

        function findMatch(point) {
            return new Promise(resolve => {
                let arrayCheck = [];
                let foundPoint = false;

                if (point.type === "YourStar") {
                    arrayCheck = luckyNumbers;
                } else {
                    arrayCheck = yourNumbers.slice(0, totalYourNumbers);
                }

                if (point.instantWin) {
                    point.updateWinMeter();
                    resolve();
                    return;
                }

                arrayCheck.forEach(e => {
                    if (e.value === point.value) {
                        foundPoint = true;

                        if (!e.matched) {
                            e.match();
                        }
                        if (!point.matched) {
                            point.match(resolve);
                            audio.play('prizeWin');
                            return;
                        }
                        resolve();
                    }
                });

                if (foundPoint === false) {
                    resolve();
                }
            });
        }

        function populate(data) {
            symbolData.LuckyStar = data.baseGameLuckyNumbers;
            data.baseGameValue.forEach((e, i) => {
                symbolData.YourStar.push({
                    amount: data.baseGameAmount[i],
                    value: data.baseGameValue[i]
                });
            });
        }

        function next(type) {
            return symbolData[type].shift();
        }

        function reset() {
            luckyNumbers.forEach(e => {
                e.reset();
            });
            yourNumbers.forEach(e => {
                e.reset();
            });

            bonusToken = undefined;

            luckyNumbersRevealed = false;
            yourTicketsRevealed = false;

            msgBus.publish('Game.Reset');
        }

        function jumpToBonus() {
            return new Promise(async resolve => {

                msgBus.publish('UI.updateButtons', {
                    autoPlay: false,
                    help: {enabled: false},
                });

                if (scenarioData.scenario.bonusGame[0].length > 1) {
                    if (!bonusGame.checkIfComplete()) {
                        msgBus.publish('Game.StateChanged', 'BONUS_GAME');

                        await transition.toBonus('megaMatch');
                        await Promise.all(bonusGame.enable());
                        await bonusGame.endOfGamePrompt();
                    }
                }

                if (scenarioData.scenario.wheelGame[0].length > 1) {
                    if (!wheelGame.checkIfComplete()) {
                        await transition.toBonus('hyperSpin');
                        await wheelGame.enable();
                        await wheelGame.endOfGamePrompt();
                    }
                }

                await transition.fromBonus(3, 0);

                enablePointsAfterBonus();

                msgBus.publish('UI.updateButtons', {
                    autoPlay: true,
                    help: {enabled: true},
                });

                msgBus.publish('Game.StateChanged', 'BASE_GAME');

                resolve();
            });
        }

        function RevealAllAudioLookAhead(array, audioRevealAll, audioNormal, index) {
            array.forEach((e, i) => {
                if (i % index === 0) {

                    let aheadArray = [];

                    for (let y = i; y < index + i; y++) {
                        aheadArray[y] = array[y];
                    }

                    let autoRevealAudioAvalible = aheadArray.every(el => {
                        return !el.revealed;
                    });

                    if (autoRevealAudioAvalible) {
                        e.audio = audioRevealAll;
                    } else {
                        aheadArray.forEach(el => {
                            if (!el.revealed) {
                                el.audio = audioNormal;
                            }
                        });
                    }
                }
            });
        }

        function revealLuckyNumbers() {
            return new Promise(resolve => {
                if (autoRevealLuckyNumbers) {
                    luckyNumbers.forEach((e, i, a) => {
                        e.reveal();
                        if (i === a.length - 1) {
                            resolve();
                        }
                    });
                }
            });
        }

        function resolveBonusTokenValue(val) {
            bonusToken.switchGraphic();
            bonusToken.amount.text = SKBeInstant.formatCurrency(val).formattedAmount;
        }

        msgBus.subscribe('Game.ResolveBonusTokenValue', resolveBonusTokenValue);

        return {
            init,
            intro,
            enable,
            reset,
            populate,
            revealLuckyNumbers,
            revealAll,
            yourNumbers: () => {
                return yourNumbers;
            },
            setTotalYourNumberData(val) {
                totalYourNumbersData = val;
            }
        };
    }
)
;