define(require => {
    const Timeline = require('com/gsap/TimelineLite');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');

    const orientation = require('skbJet/componentManchester/standardIW/orientation');

    require('com/gsap/plugins/PixiPlugin');


    const FADE_DURATION = 0.5;
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 1.5;
    // const buffer = 10;

    let initPrizeSet = true;
    let initSizeSet = true;

    let outValue = 0;

    let positionData = {
        winUpToInOutText: {
            landscape: {
                x: 55,
                y: -44,
            },
            portrait: {
                x: 0,
                y: -40
            }
        },
        winUpToInValue: {
            landscape: {
                x: 55,
                y: 0,
            },
            portrait: {
                x: 0,
                y: 0
            }
        }
    };


    function setWinUpTo() {
        const inValue = prizeData.prizeStructure[0];
        const formattedAmount = SKBeInstant.formatCurrency(inValue).formattedAmount;
        const outValueformattedAmount = SKBeInstant.formatCurrency(outValue).formattedAmount;

        console.log("Prize structure" + inValue);

        displayList.winUpToInText.text = resources.i18n.Game.winUpToText;
        displayList.winUpToInValue.text = resources.i18n.Game.winUpToValue.replace('{0}', formattedAmount);
        displayList.winUpToOutText.text = resources.i18n.Game.winUpToText;
        displayList.winUpToOutValue.text = resources.i18n.Game.winUpToValue.replace('{0}', outValueformattedAmount);
        displayList.winUpToInTextShadow.text = resources.i18n.Game.winUpToText;
        displayList.winUpToInValueShadow.text = resources.i18n.Game.winUpToValue.replace('{0}', formattedAmount);
        displayList.winUpToOutTextShadow.text = resources.i18n.Game.winUpToText;
        displayList.winUpToOutValueShadow.text = resources.i18n.Game.winUpToValue.replace('{0}', outValueformattedAmount);

        // If outValue is 0 winUpTo is not yet set, so display the in value and skip the timeline
        if (outValue === 0 || outValue === inValue) {
            outValue = inValue;
            displayList.winUpToOut.alpha = 0;
            if(!initSizeSet) {
                return;
            }
        }

        adjustPiviot();
        if(initSizeSet) {
            initSizeSet = false;
            return;
        }

        if(initPrizeSet) {
            displayList.winUpToIn.scaleX === 0 ? displayList.winUpToIn.scaleX = 1 : displayList.winUpToIn.scaleX = 0;
            displayList.winUpToIn.scaleY === 0 ? displayList.winUpToIn.scaleY = 1 : displayList.winUpToIn.scaleY = 0;
            displayList.winUpToOut.scaleX === 0 ? displayList.winUpToIn.scaleX = 1 : displayList.winUpToIn.scaleX = 0;
            displayList.winUpToOut.scaleY === 0 ? displayList.winUpToIn.scaleY = 1 : displayList.winUpToIn.scaleY = 0;

            initPrizeSet = false;
            return;
        }

        const updateTimeline = new Timeline();
        const outScale = inValue > outValue ? MAX_SCALE : MIN_SCALE;
        const inScale = inValue > outValue ? MIN_SCALE : MAX_SCALE;

        // update outValue for next time
        outValue = inValue;

        updateTimeline.fromTo(
            displayList.winUpToIn,
            FADE_DURATION,
            {
                pixi: {scaleX: inScale, scaleY: inScale},
                alpha: 0,
            },
            {
                pixi: {scaleX: 1, scaleY: 1},
                alpha: 1,
            },
            0
        );

        updateTimeline.fromTo(
            displayList.winUpToOut,
            FADE_DURATION,
            {
                pixi: {scaleX: 1, scaleY: 1},
                alpha: 1,
            },
            {
                pixi: {scaleX: outScale, scaleY: outScale},
                alpha: 0,
            },
            0
        );
    }

    function resetPosition() {
        displayList.winUpToInText.position = positionData['winUpToInOutText'][orientation.get().toLowerCase()];
        displayList.winUpToOutText.position = positionData['winUpToInOutText'][orientation.get().toLowerCase()];
        displayList.winUpToInValue.position = positionData['winUpToInValue'][orientation.get().toLowerCase()];
        displayList.winUpToOutValue.position = positionData['winUpToInValue'][orientation.get().toLowerCase()];

        displayList.winUpToInTextShadow.position = positionData['winUpToInOutText'][orientation.get().toLowerCase()];
        displayList.winUpToOutTextShadow.position = positionData['winUpToInOutText'][orientation.get().toLowerCase()];
        displayList.winUpToInValueShadow.position = positionData['winUpToInValue'][orientation.get().toLowerCase()];
        displayList.winUpToOutValueShadow.position = positionData['winUpToInValue'][orientation.get().toLowerCase()];

        displayList.winUpToInTextShadow.y += 5;
        displayList.winUpToOutTextShadow.y += 5;
        displayList.winUpToInValueShadow.y += 5;
        displayList.winUpToOutValueShadow.y += 5;
    }

    function adjustPiviot() {
        resetPosition();

        displayList.winUpToInText.scale.set(1);
        displayList.winUpToOutText.scale.set(1);

        displayList.winUpToInText.maxWidth = 200;
        displayList.winUpToOutText.maxWidth = 200;

        displayList.winUpToInText.anchor.x = 0;
        displayList.winUpToOutText.anchor.x = 0;

        displayList.winUpToInText.x = -displayList.winUpToInText.width / 2;
        displayList.winUpToOutText.x = -displayList.winUpToOutText.width / 2;

        displayList.winUpToInValue.scale.set(1);
        displayList.winUpToOutValue.scale.set(1);

        displayList.winUpToInValue.maxWidth = 200;
        displayList.winUpToOutValue.maxWidth = 200;

        displayList.winUpToInValue.anchor.x = 0;
        displayList.winUpToOutValue.anchor.x = 0;

        displayList.winUpToInValue.x = -displayList.winUpToInValue.width / 2;
        displayList.winUpToOutValue.x = -displayList.winUpToOutValue.width / 2;

        /////////////////////////

        displayList.winUpToInTextShadow.scale.set(1);
        displayList.winUpToOutTextShadow.scale.set(1);

        displayList.winUpToInTextShadow.maxWidth = 200;
        displayList.winUpToOutTextShadow.maxWidth = 200;

        displayList.winUpToInTextShadow.anchor.x = 0;
        displayList.winUpToOutTextShadow.anchor.x = 0;

        displayList.winUpToInTextShadow.x = -displayList.winUpToInTextShadow.width / 2;
        displayList.winUpToOutTextShadow.x = -displayList.winUpToOutTextShadow.width / 2;

        displayList.winUpToInValueShadow.scale.set(1);
        displayList.winUpToOutValueShadow.scale.set(1);

        displayList.winUpToInValueShadow.maxWidth = 200;
        displayList.winUpToOutValueShadow.maxWidth = 200;

        displayList.winUpToInValueShadow.anchor.x = 0;
        displayList.winUpToOutValueShadow.anchor.x = 0;

        displayList.winUpToInValueShadow.x = -displayList.winUpToInValueShadow.width / 2;
        displayList.winUpToOutValueShadow.x = -displayList.winUpToOutValueShadow.width / 2;
    }

    function onOrientationChange() {
        adjustPiviot();
    }

    msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);
    msgBus.subscribe('PrizeData.PrizeStructure', setWinUpTo);

    return {
        reset: setWinUpTo,
    };
});
