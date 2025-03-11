define(require => {

    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    const PIXI = require('com/pixijs/pixi');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let multiplierSpine = undefined;
    let multiplierPromise;
    let ori;

    let value = 2;
    let start = false;

    function init() {
        multiplierSpine = new PIXI.spine.Spine(resLib.spine['multiplierBonus'].spineData);
        displayList.multiplierGameBackground.addChild(multiplierSpine);
        onOrientationChange();

        multiplierSpine.state.setAnimation(0, ori + "/idle", true);

        multiplierSpine.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === ori + '/trigger' || entry.animation.name === ori + '/triggerRepeat') {
                    nextValue();
                }
                if (entry.animation.name === ori + '/start') {
                    multiplierSpine.state.setAnimation(0, ori + '/trigger', false);
                }
            },
            event: (entry, event) => {
                if (event.data.name === 'swapMesh') {
                    switchAttachment();
                    audio.play('multiplierHammerSmash');
                }
            }
        });

        // multiplierSpine.skeleton.setAttachment('multiplierValue','trans/2x');

        displayList.multiplierStartButton.enabled = false;
        displayList.multiplierStartButton.alpha = 0;
        displayList.multiplierStartButton.on('press', play);

        displayList.multiplierStartButton.spineAnim = new PIXI.spine.Spine(resLib.spine['buyButtonHighlight'].spineData);
        displayList.multiplierStartButton.spineAnim.state.setAnimation(0,"buyButtonHighlight",true);
        displayList.multiplierStartButton.spineAnim.renderable = false;

        displayList.multiplierStartButton.addChild(displayList.multiplierStartButton.spineAnim);

        displayList.multiplierStartButton.hitArea = new PIXI.Rectangle(-131,-42,262,82);


        displayList.multiplierPrizeMultiplierValue.alpha = 0;
    }

    async function enable() {
        await populateInfoFields();

        Tween.to(displayList.multiplierStartButton, 0.01, {
            alpha: 1,
            onComplete: () => {
                displayList.multiplierStartButton.enabled = true;
                displayList.multiplierStartButton.spineAnim.renderable = true;
            }
        });
    }

    function play() {
        if (start === false) {
            displayList.multiplierStartButton.enabled = false;
            displayList.multiplierStartButton.spineAnim.renderable = false;
            multiplierSpine.state.setAnimation(0, ori + '/start', false);
            audio.play('multiplierPowerMeter');
            start = true;
        } else {
            multiplierSpine.state.setAnimation(0, ori + '/triggerRepeat', false);
        }
    }

    function nextValue() {
        if (value !== Number(scenarioData.scenario.multiplierValue)) {
            value += 1;
            play();
        } else {
            end();
        }
    }

    function end() {
        multiplierSpine.state.setAnimation(0, ori + '/end', false);
        displayList.multiplierTotalWinValue.alpha = 1;
        displayList.multiplierTotalWinValue.text = SKBeInstant.formatCurrency((meterData.win * value)).formattedAmount;

        audio.play('multiplierGameReveal');
        Tween.delayedCall(0.5,()=>{
            Tween.to(displayList.multiplierTotalWinValue.scale,0.3,{
                x:1.5,
                y:1.5,
                yoyo:true,
                repeat:1
            });
        });

        updateWinMeter();
        Tween.delayedCall(2,()=>{
            msgBus.publish('Game.TransitionToBaseGame', multiplierPromise);
        });

    }

    function updateWinMeter() {
        meterData.win = (meterData.win * value);
    }

    function reset() {
        multiplierSpine.state.setAnimation(0, ori + "/idle", true);
        start = false;
        value = 2;

        switchAttachment();

        Tween.delayedCall(2,()=>{
            displayList.multiplierTotalWinValue.text = "";
            displayList.multiplierPrizeMultiplierValue.text = "";
            displayList.multiplierPrizeValue.text = "";

            displayList.multiplierPrizeMultiplierValue.alpha = 0;
        });
    }

    function complete() {
        return new Promise(resolve => {
            displayList.multiplierPrizeMultiplierValue.text = value + 'x';

            let delay = 1;

            if (autoPlay.enabled === true) {
                delay = 2;
            }
            if (scenarioData.scenario.bonusTurns.length > 1 && scenarioData.scenario.bonusTurns[0] !== "") {
                delay = 0;
            }

            Tween.delayedCall(delay, () => {
                msgBus.publish('Game.TransitionToMultiplier');
            });

            multiplierPromise = resolve;
        });
    }

    function onOrientationChange() {
        if (multiplierSpine !== undefined) {
            if (orientation.get() === orientation.LANDSCAPE) {
                multiplierSpine.x = 230;
                multiplierSpine.y = 270;
            } else {
                multiplierSpine.x = 0;
                multiplierSpine.y = 0;
            }
        }

        if (orientation.get() === orientation.LANDSCAPE) {
            ori = 'land';
        } else {
            ori = 'port';
        }
    }

    function switchAttachment() {
        multiplierSpine.skeleton.findSlot('multiplierValue_2x').currentMesh.alpha = 0;
        multiplierSpine.skeleton.findSlot('multiplierValue_3x').currentMesh.alpha = 0;
        multiplierSpine.skeleton.findSlot('multiplierValue_4x').currentMesh.alpha = 0;
        multiplierSpine.skeleton.findSlot('multiplierValue_5x').currentMesh.alpha = 0;

        multiplierSpine.skeleton.findSlot('multiplierValue_' + value + 'x').currentMesh.alpha = 1;

        displayList.multiplierPrizeMultiplierValue.text = value + 'x';
        displayList.multiplierPrizeMultiplierValue.scale.set(30);
        displayList.multiplierPrizeMultiplierValue.alpha = 0;
        Tween.to(displayList.multiplierPrizeMultiplierValue.scale,0.3,{
            x:1,
            y:1
        });
        Tween.to(displayList.multiplierPrizeMultiplierValue,0.3,{
            alpha:1
        });



    }

    function populateInfoFields() {
        return new Promise(resolve => {
            displayList.multiplierInfoContainer.children.forEach((e, i, a) => {
                Tween.to(e, (0.5 * i), {
                    delay: 0.5,
                    alpha: 1,
                    onComplete: () => {
                        if (i === a.length - 1) {
                            displayList.multiplierPrizeValue.text = SKBeInstant.formatCurrency(meterData.win).formattedAmount;
                            resolve();
                        }
                    }
                });
            });
        });
    }

    msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);

    return {
        init,
        enable,
        reset,
        complete
    };
});