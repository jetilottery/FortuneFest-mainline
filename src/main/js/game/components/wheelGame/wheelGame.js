define(require => {

    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const wheel = require('game/components/wheelGame/wheel');
    const WheelButton = require('game/components/wheelGame/WheelButton');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const bonusHelpButton = require('game/components/bonusHelpButton');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const PIXI = require('com/pixijs/pixi');
    const text = require('skbJet/componentManchester/standardIW/components/fittedText');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const lights = require('game/components/lights/lightController');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let promise;
    let wheelData = [];
    let wheelButton;

    let complete = false;

    let totalWin = 0;
    let multiplier = 0;

    function init() {
        displayList.wheelCelebration.addChild(new PIXI.spine.Spine(resLib.spine['specialSymbols'].spineData));
        displayList.wheelCelebration.addChild(new text("COLLECT"));
        displayList.wheelCelebration.children[1].style = textStyles.parse('wheelGameSegmentWin');
        displayList.wheelCelebration.children[1].anchor.set(0.5);
        displayList.wheelCelebration.children[1].scale.set(1.2);
        displayList.wheelCelebration.children[1].renderable = false;

        displayList.wheelCelebration.children[0].renderable = false;


        wheel.init();
        displayList.wheelGame.visible = false;

        wheelButton = WheelButton.fromContainer(displayList.wheel_button);
        displayList.wheelGameMultiplierMeterValue.text = 0+"x";
        displayList.wheelGameTotalBonusWinMeterValueEcho.alpha = 0;

    }

    function enable() {
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

        return new Promise(async resolve => {
            promise = resolve;

            bonusHelpButton.enable();

            complete = true;

            await wheelButton.enable();
            bonusHelpButton.disable();

            spin();

            msgBus.publish('UI.updateButtons', {
                help: {enabled: false},
            });
        });
    }

    async function spin() {
        let data = next();

        await wheel.spinWheel({
            endpoint: data,
        });

        if (Number(data[3]) !== 0) {
            lights.setSpeed(1);
            spin();
        } else {
            await wheel.showEndOfGameWin();
            lights.setSpeed(0.25);
            msgBus.publish('Game.ResolveBonusTokenValue', totalWin);
            promise();
        }
    }

    function next() {
        return wheelData.shift();
    }

    function populate(data) {
        data.forEach(e => {
            wheelData.push(e);
        });
    }

    function updateTotalWin(data) {
        totalWin += data.amount;
        displayList.wheelGameTotalBonusWinMeterValue.text = SKBeInstant.formatCurrency(totalWin).formattedAmount;
        multiplier += data.multiplier;

        displayList.wheelGameMultiplierMeterValueEcho.alpha = 1;
        displayList.wheelGameMultiplierMeterValue.alpha = 0;

        displayList.wheelGameMultiplierMeterValue.scale.set(10);
        displayList.wheelGameMultiplierMeterValue.text = multiplier + 'x';
        Tween.to(displayList.wheelGameMultiplierMeterValue.scale,0.25,{
            x:1,
            y:1,
            onComplete:()=>{
                displayList.wheelGameMultiplierMeterValueEcho.text = displayList.wheelGameMultiplierMeterValue.text;
            }
        });
        Tween.to(displayList.wheelGameMultiplierMeterValue,0.25,{
            alpha:1
        });
        Tween.to(displayList.wheelGameMultiplierMeterValueEcho,0.25,{
            alpha:0
        });
        displayList.wheelGameMultiplierMeterValueEcho.scale.set(1);
        Tween.to(displayList.wheelGameMultiplierMeterValueEcho.scale,0.25,{
            x:2,
            y:2
        });
    }

    function reset() {
        wheel.reset();
        wheelButton.reset();
        wheelData = [];
        promise = undefined;
        displayList.wheelGameTotalBonusWinMeterValue.text = " ";
        displayList.wheelGameTotalBonusWinMeterValueEcho.alpha = 0;
        displayList.wheelGameMultiplierMeterValue.text = "";
        displayList.wheelGameMultiplierMeterValueEcho.text = displayList.wheelGameMultiplierMeterValue.text;
        totalWin = 0;
        multiplier = 0;
        complete = false;
    }

    function checkIfComplete() {
        return complete;
    }

    function endOfGamePrompt() {
        return new Promise(resolve => {
            displayList.wheelGameTotalBonusWinMeterValueEcho.text = displayList.wheelGameTotalBonusWinMeterValue.text;
            displayList.wheelGameTotalBonusWinMeterValueEcho.alpha = 1;
            displayList.wheelGameTotalBonusWinMeterValueEcho.scale.set(0);


            Tween.to(displayList.wheelGameTotalBonusWinMeterValueEcho.scale,
                0.5, {
                    delay: 0.5,
                    x: 3.5,
                    y: 3.5,
                    repeat:2,
                    onStart:()=>{
                        audio.play('totalBonusWin');
                    },
                    onComplete: ()=>{
                        meterData.win += totalWin;
                        lights.setSpeed(1);
                        resolve();
                    }
                });
            Tween.to(displayList.wheelGameTotalBonusWinMeterValueEcho,
                0.5, {
                    delay: 0.5,
                    alpha: 0,
                    repeat: 2
                });
        });
    }

    msgBus.subscribe('game.wheel.addToBonusWin', updateTotalWin);

    return {
        init,
        reset,
        enable,
        populate,
        checkIfComplete,
        endOfGamePrompt
    };

});