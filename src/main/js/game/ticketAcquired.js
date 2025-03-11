define((require) => {
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const baseGame = require('game/components/baseGame/baseGame');
    const bonusGame = require('game/components/bonus/bonusGame');
    const wheelGame = require('game/components/wheelGame/wheelGame');

    function ticketAcquired() {

        baseGame.populate({
            baseGameLuckyNumbers:scenarioData.scenario.baseGameLuckyNumbers,
            baseGameValue:scenarioData.scenario.baseGameValue,
            baseGameAmount:scenarioData.scenario.baseGameAmount
        });

        bonusGame.populate(scenarioData.scenario.bonusGame);
        wheelGame.populate(scenarioData.scenario.wheelGame);

        if (!audio.isPlaying('music') && gameConfig.backgroundMusicEnabled) {
            audio.fadeIn('music', 0, true, 1);
        }


        gameFlow.next('START_REVEAL');
    }

    gameFlow.handle(ticketAcquired, 'TICKET_ACQUIRED');
});