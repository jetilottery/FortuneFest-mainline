define(function (require) {
    require('polyfill');
    
    const PIXI = require('com/pixijs/pixi');
    PIXI.settings.CAN_UPLOAD_SAME_BUFFER = false;

    const app = require('skbJet/componentManchester/standardIW/app');
    const layout = require('skbJet/componentManchester/standardIW/layout');
    const config = require('skbJet/componentManchester/standardIW/gameConfig');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const gameSize = require('skbJet/componentManchester/standardIW/gameSize');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const documents = require('skbJet/componentManchester/standardIW/documents');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const loadController = require('skbJet/componentManchester/standardIW/loadController');
    const spineSubLoader = require('skbJet/componentManchester/spineLoader/SpineSubLoader');

    const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
    const prizestructureTransform = require("game/prizestructureTransform");

    const prizetableTransform = require('game/prizetableTransform');
    const scenarioTransform = require('game/scenarioTransform');

    const templateLayout = require('game/template/layout');
    const gameLayout = require('game/custom/layout');
    const templateConfig = require('game/template/config');
    const gameConfig = require('game/custom/config');
    const templateAudioMap = require('game/template/audioMap');
    const gameAudioMap = require('game/custom/audioMap');
    const templateTextStyles = require('game/template/textStyles');
    const gameTextStyles = require('game/custom/textStyles');
    const dimensions = require('game/template/dimensions');

    // Require StandardIW component templates
    let buttonBar = require('skbJet/componentManchester/standardIW/ui/buttonBar/template');
    let autoPlayButton = require('skbJet/componentManchester/standardIW/ui/autoPlayButton/template');
    let resultPlaques = require('skbJet/componentManchester/standardIW/ui/resultPlaques/template');
    let howToPlay = require('skbJet/componentManchester/standardIW/ui/howToPlay/template');
    let errorPlaque = require('skbJet/componentManchester/standardIW/ui/errorPlaque/template');
    let ticketSelectBar = require('skbJet/componentManchester/standardIW/ui/ticketSelectBarSmall/template');
    let footer = require('skbJet/componentManchester/standardIW/ui/footer/template');
    let networkActivity = require('skbJet/componentManchester/standardIW/ui/networkActivity/template');

    // Require all game specific components that need initializing
    const background = require('game/components/background');
    const transition = require('game/components/transition/transition');

    const bigWin = require('game/components/effects/bigWin');

    const baseGame = require('game/components/baseGame/baseGame');
    const bonusGame = require('game/components/bonus/bonusGame');
    const wheelGame = require('game/components/wheelGame/wheelGame');

    const lightController = require('game/components/lights/lightController');

    const bonusHelpButton = require('game/components/bonusHelpButton');

    // let buyButtonAnim = require('game/components/effects/buyTryAnim');

    const appPreload = require('game/components/utils/preload');
    require('game/components/winUpTo');
    require('game/components/gameRow');

    // Require game side state handlers.
    require('game/ticketAcquired');
    require('game/startReveal');
    require('game/endReveal');
    require('game/resultScreen');
    require('game/gameReset');
    require('game/error');

    const spotUIHandeler = require('game/components/spotUIHandeler');

    // Register template configs and game overrides
    layout.register(templateLayout, gameLayout);
    audio.register(templateAudioMap, gameAudioMap);
    config.register(templateConfig, gameConfig);
    textStyles.register(templateTextStyles, gameTextStyles);
    // Add Spine subLoader (not included in loadController by default)
    loadController.registerSubLoader('spine', new spineSubLoader());

    // Set game size for portrait and landscape
    gameSize.set(dimensions);

    function gameInit() {
        // Register a transform function that can be used to turn the prizetable data into structured
        // data representing the prizetables in the paytable document

        if (SKBeInstant.isWLA()){
            documents.registerPrizestructureTransform(prizestructureTransform);
        }
        else{
            documents.registerPrizetableTransform(prizetableTransform);
        }

        // Register a transform function that can be used to turn the scenario string into useable data
        scenarioData.registerTransform(scenarioTransform);

        // Init StandardIW UI templates
        howToPlay = howToPlay();
        resultPlaques = resultPlaques();
        errorPlaque = errorPlaque();
        buttonBar = buttonBar();
        autoPlayButton = autoPlayButton();
        ticketSelectBar = ticketSelectBar();
        footer = footer();
        networkActivity = networkActivity();

        // Inititialize all game components
        appPreload.preload(app, () => {
            // Add everything to the stage
            app.stage.addChild(
                layout.container,
                ticketSelectBar,
                buttonBar,
                autoPlayButton,
                resultPlaques,
                howToPlay,
                footer,
                errorPlaque,
                networkActivity
            );
            background.init();
            transition.init();

            baseGame.init();
            bonusGame.init();
            wheelGame.init();

            // buyButtonAnim.init();
            bigWin.init();

            spotUIHandeler.init();
            bonusHelpButton.init();

            lightController.init();

            appPreload.textFix();

            gameFlow.next();
        });
    }

    gameFlow.handle(gameInit, 'GAME_INIT');
});