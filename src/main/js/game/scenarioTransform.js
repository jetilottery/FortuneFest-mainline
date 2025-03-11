define((require) => {
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    console.log(prizeData);

    return function scenarioTransform(scenarioString) {
        const [luckyNumbers, yourNumbers, bonusGameData, wheelGameData] = scenarioString.split('|');

        let baseGameValue = [];
        let baseGameAmount = [];
        let baseGameLuckyNumbers = [];
        let bonusGame = [];
        let wheelGame = [];

        // Find the main game data, it's all comma delimited
        yourNumbers.split(',').forEach(e=>{baseGameValue.push(e.split(':')[0]);});
        yourNumbers.split(',').forEach(e=>{baseGameAmount.push(e.split(':')[1]);});
        baseGameLuckyNumbers = luckyNumbers.split(',');
        bonusGameData.split(',').forEach(e=>{bonusGame.push(e.split(':'));});
        wheelGameData.split(',').forEach(e=>{wheelGame.push(e.split(':'));});

        return {
            baseGameAmount,
            baseGameValue,
            baseGameLuckyNumbers,
            bonusGame,
            wheelGame
        };
    };
});