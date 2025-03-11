define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const BonusLightParticle = require('game/components/effects/bonusLightParticle');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    let particleContainer;
    let index = 0;
    let multiplierIndex;

    function init() {
        particleContainer = [
            new BonusLightParticle(),
            new BonusLightParticle(),
            new BonusLightParticle(),
            new BonusLightParticle()
        ];

        msgBus.subscribe('Game.Particles.Goto', (data) => {
            audio.playSequential('lightTrail');
            if (data.particleType === 'MULTIPLIER') {
                let offset = orientation.get() === orientation.LANDSCAPE ? 55 : 80;
                if (multiplierIndex === 0) {
                    data.pos.x = (data.pos.x - offset);
                }
                if (multiplierIndex === 2) {
                    data.pos.x = (data.pos.x + offset);
                }
                multiplierIndex++;
            }
            particleContainer[index].goto(data);
            index++;
        });
    }

    function reset() {
        index = 0;
        multiplierIndex = 0;
    }

    return {
        init,
        reset
    };
});