define(require => {
    const BaseGamePoint = require('game/components/baseGame/BaseGamePoint');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const Text = require('skbJet/componentManchester/standardIW/components/fittedText');
    const TextStyle = require('skbJet/componentManchester/standardIW/textStyles');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const PIXI = require('com/pixijs/pixi');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let instantWinArray = {
        '101': {multiplier: 1, animation: 'multipliersX1'},
        '102': {multiplier: 2, animation: 'multipliersX2'},
        '103': {multiplier: 5, animation: 'multipliersX5'},
        '104': {multiplier: 10, animation: 'multipliersX10'},
        '105': {multiplier: 20, animation: 'multipliersX20'},
        '106': {multiplier: 50, animation: 'multipliersX50'},
        '107': {multiplier: 100, animation: 'multipliersX100'},
        '108': {multiplier: 200, animation: 'multipliersX200'},
    };

    class YourNumber extends BaseGamePoint {
        constructor(index, specialEffects) {
            super(index, specialEffects);

            this.type = "YourStar";
            this.starPos = (this.index % 5) !== 0 ? (this.index % 5) : 5;

            this.hitArea = new PIXI.Rectangle(-50, -40, 100, 80);

            this.valueText.y = -9;
            this.valueTextWin.y = -9;

            this.amount = new Text("");
            this.amount.style = TextStyle.parse('pickPointAmount');
            this.amount.anchor.set(0.5);
            this.amount.maxWidth = 100;

            this.spine = new PIXI.spine.Spine(resLib.spine['specialSymbols'].spineData);
            this.spine.renderable = false;
            this.spine.y = -7;

            this.winEffectSpine = new PIXI.spine.Spine(resLib.spine['multiplierWin'].spineData);
            this.winEffectSpine.renderable = false;

            this.winEffect.addChild(this.winEffectSpine);

            this.effect = new PIXI.spine.Spine(resLib.spine['multiplierWin'].spineData);
            this.effect.renderable = false;
            this.effectBackground = new PIXI.spine.Spine(resLib.spine['multiplierWin'].spineData);
            this.effectBackground.renderable = false;

            this.prizeValue = 0;
            this.originalIndex = null;

            this.amount.y = 30;
            this.valueContainer.addChild(this.effectBackground, this.effect, this.spine, this.amount);

            this.specialEffect.state.setAnimation(0, 'revealMatchEffect', true);
            this.instantWin = false;
            this.valueScale = 0.7;

            this.spine.state.addListener({
                complete: (entry) => {
                    if (entry.animation.name === 'coinFlareIntro') {
                        this.spine.state.setAnimation(0, 'coinFlare', true);
                    }
                }
            });

            this.effectBackground.state.addListener({
                complete: (entry) => {
                    if (entry.animation.name === 'mWin_intro') {
                        this.effectBackground.state.setAnimation(0, 'mWin_loop', true);
                    }
                }
            });

        }

        setToFront() {
            this.parent.parent.setChildIndex(this.parent, this.parent.parent.children.length - 1);
        }

        setParentIndex() {
            this.originalIndex = this.parent.parent.getChildIndex(this.parent);
        }

        setAmount(val) {
            if (val !== "") {
                this.prizeValue = prizeData.prizeTable[val];
                this.amount.text = SKBeInstant.formatCurrency(this.prizeValue).formattedAmount;
            }
        }

        setValue(val, winningNumber) {
            let isNonNumber = false;
            if (instantWinArray[val] !== undefined || ['Y', 'Z'].indexOf(val) > -1) {
                isNonNumber = true;
                this.value = val;
            }
            Tween.delayedCall(0.3, () => {
                if (instantWinArray[val] !== undefined) {
                    this.spine.scale.set(0.8);
                    this.spine.state.setAnimation(0, instantWinArray[val].animation, true);
                    this.spine.renderable = true;
                    audio.playSequential('InstantWin20x');
                    this.instantWin = true;
                    this.spine.scale.set(0);
                    this.setValueAnimation(this.spine);
                    this.setToFront();
                    this.amount.style = TextStyle.parse('pickPointAmountWinMultiplier');

                    this.effectBackground.renderable = true;
                    this.effectBackground.state.setAnimation(0, 'mWin_intro', false);
                    return;
                }
                if (['Y', 'Z'].indexOf(val) > -1) {
                    this.spine.state.setAnimation(0, 'coinFlareIntro', false);
                    this.amount.style = TextStyle.parse('pickPointAmountWin');

                    this.spine.renderable = true;
                    this.spine.scale.set(0.75);
                    this.setToFront();
                    return;
                }
            });

            if (!isNonNumber) {
                super.setValue(val, winningNumber, isNonNumber);
            }

        }

        updateWinMeter() {
            if (instantWinArray[this.value] !== undefined) {
                meterData.win += (this.prizeValue * Number(instantWinArray[this.value].multiplier));
                return;
            }
            meterData.win += this.prizeValue;
        }

        disabled() {
            this.cover.state.setAnimation(0, "disabled" + this.starPos, false);
            this.disabledPoint = true;
        }

        showEnabled() {
            if (!this.inGame) {
                this.setDefaultAnimation();
            } else {
                this.cover.state.timeScale = 1;
                this.cover.state.setAnimation(0, 'yourStarReturn', false);
                this.inGame = false;
            }
            this.disabledPoint = false;
        }

        reset() {
            super.reset();

            if (this.disabledPoint) {
                this.disabled();
            }
            this.prizeValue = 0;
            this.amount.text = "";
            this.spine.renderable = false;
            this.spine.scale.set(1);
            this.specialEffect.renderable = false;
            this.parent.parent.setChildIndex(this.parent, this.originalIndex);
            this.instantWin = false;
            this.effect.renderable = false;
            this.amount.style = TextStyle.parse('pickPointAmount');
            this.effectBackground.renderable = false;
        }

        match(res) {
            super.match(res);

            this.setToFront();

            this.specialEffect.renderable = true;

            this.amount.style = TextStyle.parse('pickPointAmountWin');

            if (!this.prematched) {
                audio.playSequential('numberMatch');
            }


            this.updateWinMeter();
        }

        switchGraphic() {
            if (this.value === 'Y') {
                this.spine.state.setAnimation(0, 'coinFlareMega', true);
            } else {
                this.spine.state.setAnimation(0, 'coinFlareHyper', true);
            }
        }

        playWinEffect() {
            this.winEffectSpine.renderable = true;
            this.winEffectSpine.state.setAnimation(0, 'confetti_idle', true);
        }

        static fromContainer(container, index, effectContainer) {
            const symbol = new YourNumber(index, effectContainer);
            container.addChild(symbol);
            symbol.setParentIndex();
            return symbol;
        }

    }

    return YourNumber;

});