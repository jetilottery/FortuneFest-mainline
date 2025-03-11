define(require => {

    const PIXI = require('com/pixijs/pixi');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const particleConfig = require('game/components/effects/particleConfig');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    class BonusLightParticle extends PIXI.Container {
        constructor() {
            super();

            this.particleEmitters = {
                'BONUS': new PIXI.particles.Emitter(
                    this,
                    [PIXI.Texture.from('background-particle')],
                    particleConfig.bonusLightParticle
                ),
                'MULTIPLIER': new PIXI.particles.Emitter(
                    this,
                    [PIXI.Texture.from('background-particle')],
                    particleConfig.multiplierLightParticle
                ),
            };

            Object.keys(this.particleEmitters).forEach(e => {
                this.particleEmitters[e].emit = false;
                this.particleEmitters[e].autoUpdate = true;
            });

            displayList.bonusLightParticleContainer.addChild(this);
        }

        bezierConfig(data) {
            let bezierConfig;
            switch(data.config) {
                case 1: {
                    bezierConfig = [
                        {x: (data.pos.x / 4), y: (data.pos.y / 4)},
                        {x: (data.pos.x / 2), y: (data.pos.y / 2 + 100)},
                        {x: data.pos.x, y: data.pos.y},
                    ];
                    break;
                }
                case 2: {
                    bezierConfig = [
                        {x: (data.pos.x / 4), y: (data.pos.y / 4)},
                        {x: (data.pos.x / 2), y: (data.pos.y / 2 - 100)},
                        {x: data.pos.x, y: data.pos.y},
                    ];
                    break;
                }
                case 3: {
                    bezierConfig = [
                        {x: (data.pos.x / 4), y: (data.pos.y / 4)},
                        {x: (data.pos.x / 2), y: (data.pos.y / 2 + 200)},
                        {x: data.pos.x, y: data.pos.y},
                    ];
                    break;
                }
            }
            return bezierConfig;
        }

        goto(data) {
            let _this = this;
            let particle = 'BONUS';
            if (data.particleType === 'MULTIPLIER') {
                particle = 'MULTIPLIER';
            }

            this.particleEmitters[particle].emit = true;

            this.particleEmitters[particle].spawnPos = new PIXI.Point(data.start.x, data.start.y);

            Tween.to(this.particleEmitters[particle].spawnPos, gameConfig.bonusLightParticleTravelTime, {
                x:data.pos.x,
                y:data.pos.y,
                onComplete: () => {
                    _this.particleEmitters[particle].emit = false;
                    if (data.cb !== undefined) {
                        data.cb();
                    }
                }
            });
        }
    }

    return BonusLightParticle;

});