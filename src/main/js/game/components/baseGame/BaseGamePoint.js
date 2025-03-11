define(require => {
    const PIXI = require('com/pixijs/pixi');
    // const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let revealDelay = 0.3;

    class BaseGamePoint extends Pressable {
        constructor(index, effectContainer) {
            super();

            this.enabled = false;
            this.reveal = undefined;
            this.matched = false;

            this.cover = new PIXI.spine.Spine(resLib.spine['stars'].spineData);
            this.background = new PIXI.Sprite(PIXI.Texture.EMPTY);

            this.value = 0;
            this.valueText = new PIXI.Sprite(PIXI.Texture.EMPTY);
            this.valueText.anchor.set(0.5);
            this.valueTextWin = new PIXI.Sprite(PIXI.Texture.EMPTY);
            this.valueTextWin.anchor.set(0.5);

            this.specialEffect = new PIXI.spine.Spine(resLib.spine['specialSymbols'].spineData);
            this.specialEffect.renderable = false;

            this.winEffect = new PIXI.Container();

            this.specialEffect.scale.set(0.75);

            this.autoRevealOnStart = false;

            this.valueContainer = new PIXI.Container;
            this.valueContainer.addChild(this.valueText, this.valueTextWin);

            this.disabledPoint = false;
            this.specialEffectContainer = effectContainer;

            this.specialEffectContainer.addChild(this.specialEffect);
            this.addChild(this.background, this.cover, this.winEffect, this.valueContainer);

            this.on('press', this.onMouseDown);
            // this.on('mouseover',this.onMouseOver);
            // this.on('mouseout',this.onMouseOut);

            this.index = index;

            this.type = "";
            this.starPos = 0;

            this.revealed = false;
            this.reveal = undefined;

            this.audio = undefined;

            this.valueScale = 1;

            this.inGame = false;

            this.cover.state.addListener({
                complete: (entry) => {
                    if (entry.animation.name === "revealAll" + this.type + 0 + this.starPos) {
                        if (this.onUncoverComplete !== undefined) {
                            this.onUncoverComplete();
                        }
                    }
                    if (entry.animation.name === "luckyStarReturn" || entry.animation.name === "yourStarReturn") {
                        this.setDefaultAnimation();
                    }
                }
            });
            this.pickpointArray = [];

            this.prematched = false;
        }

        setDefaultAnimation() {
            this.cover.state.setAnimation(0, "idleIntro" + this.type + 0 + this.starPos, false);
            this.cover.state.timeScale = 0;
        }

        intro() {
            if (!this.disabledPoint) {
                this.cover.state.setAnimation(0, "idleLoop" + this.type, true);
                this.cover.state.timeScale = 1;
            }
        }

        enable() {
            return new Promise(resolve => {
                this.enabled = true;
                this.reveal = resolve;
                this.interactive = true;
                if (this.autoRevealOnStart === true) {
                    this.enabled = false;
                    Tween.delayedCall(gameConfig.autoPlayWinningNumberInterval * this.index, () => {
                        this.reveal();
                    });
                }
            });
        }

        onMouseDown() {
            this.reveal();
        }

        // onMouseOver() {
        //     if(!autoPlay.enabled) {
        //         this.pickpointArray.forEach(e => {
        //             if (!e.revealed && e.enabled) {
        //                 e.setDefaultAnimation();
        //             }
        //         });
        //     }
        // }
        //
        // onMouseOut() {
        //     if(!autoPlay.enabled) {
        //         this.pickpointArray.forEach(e => {
        //             if (!e.revealed && e.enabled) {
        //                 e.intro();
        //             }
        //         });
        //     }
        // }

        reset() {
            this.valueText.texture = PIXI.Texture.EMPTY;
            this.valueTextWin.texture = PIXI.Texture.EMPTY;

            this.value = 0;
            if (this.revealed) {
                this.cover.alpha = 0;

                Tween.to(this.cover, 0.5, {
                    alpha: 1
                });
            }
            this.matched = false;
            this.revealed = false;
            this.specialEffect.renderable = false;
            this.specialEffect.alpha = 0;
            this.reveal = undefined;
            this.audio = undefined;
            this.prematched = false;
            this.winEffectSpine.renderable = false;
        }

        setValue(val, winningMatch) {
            this.value = val;

            this.valueTextWin.scale.set(this.valueScale);

            this.valueText.texture = new PIXI.Texture.from("nos/" + (Number(this.value) < 10 ? "0" : "") + this.value);
            if (winningMatch) {
                this.valueText.texture = new PIXI.Texture.from("nos/" + (Number(this.value) < 10 ? "0" : "") + this.value + "Selected");
                audio.playSequential('numberMatch');
                this.prematched = true;
            }

            this.valueText.alpha = 0;
            this.valueText.scale.set(0);

            this.setValueAnimation(this.valueText);
        }

        setValueAnimation(target) {
            Tween.to(target.scale, 0.3, {
                delay:revealDelay,
                x: this.valueScale,
                y: this.valueScale
            });
            Tween.to(target, 0.3, {
                delay:revealDelay,
                alpha: 1,
            });
        }


        match(res) {
            this.matched = true;
            this.valueTextWin.texture = new PIXI.Texture.from("nos/" + (Number(this.value) < 10 ? "0" : "") + this.value + "Selected");

            this.playWinEffect();

            Tween.delayedCall(revealDelay,()=>{
                this.valueTextWin.alpha = 1;
                if (res !== undefined) {
                    res();
                }
            });
        }

        uncover() {
            return new Promise(resolve => {
                this.enabled = false;
                this.revealed = true;
                this.interactive = false;
                this.onUncoverComplete = resolve;
                this.cover.state.setAnimation(0, "revealAll" + this.type + 0 + this.starPos, false);
                this.parent.parent.setChildIndex(this.parent,this.parent.parent.children.length-1);
            });
        }

        static fromContainer(container, index, effectContainer) {
            const symbol = new BaseGamePoint(index, effectContainer);
            container.addChild(symbol);
            return symbol;
        }
    }

    return BaseGamePoint;

});