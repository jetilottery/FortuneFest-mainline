define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resultParticles = require('game/components/effects/resultParticles');
    const templateLayout = require('game/template/layout');
    const customLayout = require('game/custom/layout');
    const PIXI = require('com/pixijs/pixi');
    require('com/pixijs/pixi-particles');

    const background = require('game/components/background');


    let _bigWin_portrait;
    let _bigWin_landscape;
    let _container;
    let _thresholds;

    function init() {
        _container = new PIXI.Container();

        // Set up spine project
        _bigWin_portrait = new PIXI.spine.Spine(resLib.spine['MM_MasterPopUps'].spineData);
        _bigWin_landscape = new PIXI.spine.Spine(resLib.spine['MM_MasterPopUps'].spineData);

        // Grab the thresholds
        _thresholds = gameConfig.bigWinThresholds;

        // Add to background containers
        _container.addChild(_bigWin_portrait, _bigWin_landscape);
        _bigWin_landscape.x = -250;

        // Add the container at the very back, so big win sits below all UI (1+), but above the game layout (0)
        displayList.winPlaqueEffects.addChild(_container);

        // Call onOrientationChange to show the relevant one for this orientation
        onOrientationChange();

        // Does resultPlaquesContainer exist in customLayout?
        // If it exists, refer to the custom layout, otherwise use template
        const layout = customLayout.resultPlaquesContainer ? customLayout : templateLayout;

        // Position at the same position as the result plaque
        _bigWin_landscape.x = layout.resultPlaquesContainer.landscape.x;
        _bigWin_landscape.y = layout.resultPlaquesContainer.landscape.y;
        _bigWin_portrait.x = layout.resultPlaquesContainer.portrait.x;
        _bigWin_portrait.y = layout.resultPlaquesContainer.portrait.y;

        // Scale if we can
        if (gameConfig.scaleBigWinWithPlaque) {
            _bigWin_landscape.scale.x = _bigWin_landscape.scale.y = layout.resultPlaquesContainer.landscape.scale || 1;
            _bigWin_portrait.scale.x = _bigWin_portrait.scale.y = layout.resultPlaquesContainer.portrait.scale || 1;
        }

        // Set state
        setState({
            state: orientation.get(),
            loop: true,
            level: -1
        });

        // Set up the result particles
        resultParticles.init();

        // Listen for orientation change
        msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);

        // Listen for the result plaque being dismissed, this has no event so let's listen for the buttons/plaque being pressed
        displayList.winPlaqueCloseButton.on('press', () => setState({
            level: -1
        }));
    }

    function setState(data) {
        if (data === undefined) {
            data = {};
        }

        let syncTime = data.sync || 0;

        if (data.level === -1) {
            _container.visible = false;
            resultParticles.show(false);
            return;
        }

        // Show container
        _container.visible = gameConfig.showResultScreen;

        let animationSuffix;

        switch (data.level) {
            case 1: {
                animationSuffix = "Small";
                background.showWin();
                break;
            }
            case 2: {
                animationSuffix = "Medium";
                background.showBigWin();
                break;
            }
            case 3: {
                animationSuffix = "Large";
                background.showBigWin();
                break;
            }
            default : {
                animationSuffix = "Small";
                background.showWin();
                break;
            }
        }

        // Set animation state
        _bigWin_landscape.state.setAnimation(syncTime, 'winPopUpLandscape' + animationSuffix, true);
        _bigWin_portrait.state.setAnimation(syncTime, 'winPopUpPortrait' + animationSuffix, true);

        _bigWin_landscape.state.timeScale = 0.5;
        _bigWin_portrait.state.timeScale = 0.5;

        // Toggle coin shower
        // particleManager({
        //   mode: 1,
        //   level: findPrizeLevel()
        // });
    }

    function findPrizeLevel() {
        // Grab the big win thresholds from the object
        const totalWin = meterData.totalWin;
        const ticketCost = meterData.ticketCost;
        const numLevels = Object.keys(_thresholds).length;

        // Return -1 if this is a non winner
        if (totalWin === 0) {
            return -1;
        }

        for (var i = 0; i < numLevels; i++) {
            const thisObj = _thresholds['level' + (i + 1)];
            const lowerLimitPresent = thisObj.lower || false;
            const upperLimitPresent = thisObj.upper || false;
            let withinUpper = false;
            let withinLower = false;

            if (lowerLimitPresent) {
                if (thisObj.lower.inclusive) {
                    if (totalWin >= ticketCost * thisObj.lower.multiplier) {
                        withinLower = true;
                    }
                } else {
                    if (totalWin > ticketCost * thisObj.lower.multiplier) {
                        withinLower = true;
                    }
                }
            } else {
                //it's the lowest already
                withinLower = true;
            }

            if (upperLimitPresent) {
                if (thisObj.upper.inclusive) {
                    if (totalWin <= ticketCost * thisObj.upper.multiplier) {
                        withinUpper = true;
                    }
                } else {
                    if (totalWin < ticketCost * thisObj.upper.multiplier) {
                        withinUpper = true;
                    }
                }
            } else {
                //it's the highest already
                withinUpper = true;
            }

            if (withinLower && withinUpper) {
                return (i + 1);
            }
        }
    }

    // function particleManager(data) {
    //   if (gameConfig.resultParticleMode === data.mode) {
    //     // Grab the properties for this level
    //     let config = gameConfig.resultParticleConfig['level' + data.level];
    //     // Set properties
    //     resultParticles.setProps(config);
    //     // Start particles
    //     resultParticles.show(config.enabled);
    //   }
    // }

    /*
     *
     */
    function onOrientationChange() {
        _bigWin_landscape.renderable = orientation.get() === 'landscape';
        _bigWin_portrait.renderable = orientation.get() === 'portrait';
    }

    msgBus.subscribe('jLottery.enterResultScreenState', () => setState({
        state: orientation.get(),
        loop: false,
        level: findPrizeLevel()
    }));
    msgBus.subscribe('UI.hideResult', () => setState({
        level: -1
    }));
    // msgBus.subscribe('Result.RollupStarted', () =>
    //     ({
    //   mode: 2,
    //   level: findPrizeLevel()
    // }));
    // msgBus.subscribe('Result.RollupComplete', () => particleManager({
    //   mode: 3,
    //   level: findPrizeLevel()
    // }));

    return {
        init,
        setState
    };
});