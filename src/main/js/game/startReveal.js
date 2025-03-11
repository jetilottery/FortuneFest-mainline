define(function (require) {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');


    const baseGame = require('game/components/baseGame/baseGame');
    const bonusGame = require('game/components/bonus/bonusGame');
    const wheelGame = require('game/components/wheelGame/wheelGame');
    const background = require('game/components/background');

    const revealAll = require('game/revealAll');

    const transition = require('game/components/transition/transition');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');

    const spotUIHandler = require('game/components/spotUIHandeler');

    async function startReveal() {

        let bonus = false;
        spotUIHandler.setInGame(true);

        spotUIHandler.setBonusTotalCost();


        msgBus.subscribe('Game.AutoPlayStart', revealAll.start);
        msgBus.subscribe('Game.AutoPlayStop', revealAll.stop);

        background.inGame();
        baseGame.intro();

        await Promise.all([
            ...baseGame.enable().yourNumbers(),
            ...baseGame.enable().luckyNumbers(),
        ]);

        msgBus.publish('UI.updateButtons', {
            autoPlay: false,
            help: {enabled: false},
        });

        if (scenarioData.scenario.bonusGame[0].length > 1) {
            if(!bonusGame.checkIfComplete()) {
                bonus = true;
                msgBus.publish('Game.StateChanged', 'BONUS_GAME');

                await transition.toBonus('megaMatch');
                await Promise.all(bonusGame.enable());
                await bonusGame.endOfGamePrompt();
            }
        }

        if (scenarioData.scenario.wheelGame[0].length > 1) {
            if(!wheelGame.checkIfComplete()) {
                bonus = true;
                await transition.toBonus('hyperSpin');
                await wheelGame.enable();
                await wheelGame.endOfGamePrompt();
            }
        }

        msgBus.publish('UI.updateButtons', {
            autoPlay: false,
            help: {enabled: false},
        });

        if (bonus) {
            await transition.fromBonus(3);
        }

        gameFlow.next('REVEAL_COMPLETE');
    }

    gameFlow.handle(startReveal, 'START_REVEAL');
});