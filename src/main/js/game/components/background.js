define(require => {
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const PIXI = require('com/pixijs/pixi');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    let background;
    let backgroundOverlay;

    require('com/gsap/TweenMax');

    let effectsArray = [];

    function init() {
        background = new PIXI.spine.Spine(resLib.spine['panelSpine'].spineData);
        background.state.setAnimation(0, "idleLoop", true);
        background.state.timeScale = 0.5;

        backgroundOverlay = new PIXI.spine.Spine(resLib.spine['backgroundAnims'].spineData);
        backgroundOverlay.state.setAnimation(0, orientation.get().toLowerCase()+"/bg_basegame", true);
        backgroundOverlay.state.timeScale = 0.5;
        backgroundOverlay.x = backgroundOverlay.width >> 2;

        displayList.backgroundOverlay.addChild(backgroundOverlay);
        displayList.animatedBackground.addChild(background);

        // onOrientationChange();

        msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);

        displayList.backgroundOverlay.blendMode = PIXI.BLEND_MODES.ADD;
        displayList.wheelGlow.blendMode = PIXI.BLEND_MODES.ADD;

        background.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === "pattern01Intro") {
                    background.state.setAnimation(0, "pattern01Loop", false);
                }
                if (entry.animation.name === "pattern01Loop") {
                    background.state.setAnimation(0, "pattern01Outro", false);
                }
                if (entry.animation.name === "pattern01Outro") {
                    background.state.setAnimation(0, "idleLoopSubtle", true);
                }
            }
        });

        onOrientationChange();

        displayList.resultPlaquesContainer.interactive = false;
        displayList.winPlaqueBG.parent.interactive = false;
        displayList.losePlaqueBG.parent.interactive = false;

    }

    function onOrientationChange() {
        let ori = orientation.get();
        let backgroundAnim = backgroundOverlay.state.tracks[0].animation.name.split('/')[1];
        backgroundOverlay.state.setAnimation(0, orientation.get().toLowerCase()+'/'+backgroundAnim, true);

        if(ori === orientation.LANDSCAPE) {
            backgroundOverlay.position.set(720,405);
        } else {
            backgroundOverlay.position.set(405,720);
        }

        displayList.winPlaqueCloseButton.hitArea = orientation.get() === orientation.LANDSCAPE ? new PIXI.Rectangle(-720, -405, 810, 900) : new PIXI.Rectangle(-410, -650, 810, 920);
        displayList.losePlaqueCloseButton.hitArea = orientation.get() === orientation.LANDSCAPE ? new PIXI.Rectangle(-720, -405, 810, 900) : new PIXI.Rectangle(-410, -650, 810, 920);
        displayList.resultPlaqueOverlay.hitArea = orientation.get() === orientation.LANDSCAPE ? new PIXI.Rectangle(-720, -405, 810, 900) : new PIXI.Rectangle(-410, -650, 810, 920);

        effectsArray.forEach(e=>{
            e.parent.removeChild(e.field);
        });

        effectsArray = [];

    }

    function inGame() {
        background.state.setAnimation(0, "pattern01Intro", false);
    }

    function intro() {
        background.state.setAnimation(0, "idleLoopSubtle", true);

    }

    function bonus() {
        background.state.setAnimation(0, "idleLoop", true);
    }

    function showWin() {
        background.state.setAnimation(0, "regularWinLoop", true);
    }

    function showBigWin() {
        background.state.setAnimation(0, "bigWinLoop", true);
    }

    return {
        init,
        intro,
        showWin,
        showBigWin,
        inGame,
        bonus,
    };

});
