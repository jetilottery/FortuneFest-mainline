define(function (require) {
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    const baseGame = require('game/components/baseGame/baseGame');
    const bonusGame = require('game/components/bonus/bonusGame');
    const wheelGame = require('game/components/wheelGame/wheelGame');
    const background = require('game/components/background');
    const lightController = require('game/components/lights/lightController');

    const transition = require('game/components/transition/transition');
    const spotUIHandler = require('game/components/spotUIHandeler');

    function prepareOrReset() {
        resetAll();
        gameFlow.next();
    }

    function resetAll() {
        baseGame.reset();
        bonusGame.reset();
        wheelGame.reset();

        background.intro();

        transition.reset();

        spotUIHandler.setAtEndPlaque(false);
        spotUIHandler.setInitPrice();

        lightController.setSpeed(1);

        // Make sure we hide the result
        msgBus.publish('UI.hideResult');

        // Fade out the win/lose terminator in case it is still playing
        if (audio.isPlaying('winTerminator')) {
            audio.fadeOut('winTerminator', 1);
        }
        if (audio.isPlaying('loseTerminator')) {
            audio.fadeOut('loseTerminator', 1);
        }
        msgBus.publish('Game.AutoPlayReset');
        msgBus.publish('Game.StateChanged', 'BASE_GAME');
    }


    // Subscribe to Ticket Cost +/- as we will not be in GAME_RESET when these are called
    msgBus.subscribe('TicketSelect.CostUp', resetAll);
    msgBus.subscribe('TicketSelect.CostDown', resetAll);
    msgBus.subscribe('Game.SpotsChanged',resetAll);

    gameFlow.handle(prepareOrReset, 'GAME_RESET');
    gameFlow.handle(prepareOrReset, 'GAME_PREPARE');
});
