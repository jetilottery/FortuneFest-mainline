define(require => {
    const baseGame = require('game/components/baseGame/baseGame');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');

    function setRows() {

        let baseGameYourNumbers = baseGame.yourNumbers();
        let baseGameYourNumbersTotal = baseGameYourNumbers.length;
        let baseGameYourNumbersCount = 0;

        baseGameYourNumbers.forEach((e, i) => {
            if (i+1 > ((baseGameYourNumbersTotal / 4) * meterData.spots)) {
                e.disabled();
            } else {
                e.showEnabled();
                baseGameYourNumbersCount++;
            }
        });

        if (meterData.spots === undefined) {
            baseGameYourNumbers.forEach((e, i) => {
                if (i > 4) {
                    e.disabled();
                }
            });
        }

        baseGame.setTotalYourNumberData(baseGameYourNumbersCount);
    }

    return {
        setRows,
    };

});