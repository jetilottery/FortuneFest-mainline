define(require => {
    const BaseGamePoint = require('game/components/baseGame/BaseGamePoint');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const PIXI = require('com/pixijs/pixi');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');

    class LuckyNumber extends BaseGamePoint {
        constructor(index, specialEffects) {
            super(index, specialEffects);

            this.index = index;

            this.autoRevealOnStart = gameConfig.autoRevealOnStart || false;

            this.winEffectSpine = new PIXI.spine.Spine(resLib.spine['stars'].spineData);
            this.winEffectSpine.renderable = false;
            this.winEffectSpineForeGround = new PIXI.spine.Spine(resLib.spine['multiplierWin'].spineData);
            this.winEffectSpineForeGround.renderable = false;

            this.winEffect.addChild(this.winEffectSpine,this.winEffectSpineForeGround);

            this.type = "LuckyStar";
            this.starPos = this.index;

            this.cover.scale.set(1.1);
        }

        playWinEffect(){
            this.winEffectSpine.renderable = true;
            this.winEffectSpine.state.setAnimation(0,'winLuckyStar',false);

            this.winEffectSpineForeGround.renderable = true;
            this.winEffectSpineForeGround.state.setAnimation(0, 'confetti_idle', true);
        }

        static fromContainer(container, index, effectContainer) {
            const symbol = new LuckyNumber(index, effectContainer);
            container.addChild(symbol);
            return symbol;
        }

        reset() {
            super.reset();

            this.winEffectSpineForeGround.renderable = false;

            if(this.inGame) {
                this.cover.state.timeScale = 1;
                this.cover.state.setAnimation(0,'luckyStarReturn',false);
                this.inGame = false;
            }

        }

    }

    return LuckyNumber;

});