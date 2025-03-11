define(function (require) {
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');

    async function endReveal() {

        gameFlow.next('REVEAL_COMPLETE');
    }

    gameFlow.handle(endReveal, 'END_REVEAL');
});
