define(require => {
    const PIXI = require('com/pixijs/pixi');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const text = require('skbJet/componentManchester/standardIW/components/fittedText');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenMax;

    require('com/gsap/easing/EasePack');

    class Segment extends PIXI.Container {
        constructor(data) {
            super();

            this.text = new text("");
            this.prize = 0;

            this.index = data.index;

            this.style = textStyles.parse('wheelGameSegment');

            this.rotation = data.rotation;
            this.pivot.x = data.pivot - data.offset;

            this.data = data.assignedData;

            this.text.anchor.set(0.5, 0.5);

            this.text.rotation = -Math.PI / 2;
            this.spine = displayList.wheelCelebration;

            this.addChild(
                this.text
            );
        }

        showWin() {
            this.text.style = textStyles.parse('wheelGameSegmentWin');
            this.text.scale.set(50);
            this.text.alpha = 0;
            Tween.to(this.text, 0.2, {
                alpha: 1
            });
            Tween.to(this.text.scale, 0.2, {
                    x: 1.2,
                    y: 1.2,
                }
            );
        }

        showEndOfGameWin(promise) {
            if (promise !== undefined) {
                if (this.data === 0) {
                    this.spine.children[0].renderable = true;
                    this.spine.children[1].renderable = true;
                    this.text.renderable = false;
                    this.spine.children[0].state.setAnimation(0, 'revealMatchEffect', true);
                }
                promise();
            }
        }

        update() {
            this.text.style = this.style;
            if (this.data === 0) {
                this.text.text = 'COLLECT';
            } else {
                this.text.text = String(this.data)+'x';
                this.prize = Number(this.data);
            }
            this.text.maxWidth = 150;
        }

        land() {
            // audio.play('prizeWin');
            Tween.to({}, 1, {
                onComplete: () => {
                    if (['x'].indexOf(this.data) === -1) {
                        msgBus.publish('game.wheel.addToBonusWin', {
                            amount: this.prize * (meterData.ticketCost / (meterData.spots * 5)),
                            multiplier : this.data
                        });
                    }
                }
            });

            msgBus.publish('game.wheel.showWin');
        }

        reset() {
            this.text.style = this.style;

            this.spine.children[0].renderable = false;
            this.spine.children[1].renderable = false;
            this.text.renderable = true;

            Tween.to(this.text.scale,0.2,{
                x:1,
                y:1
            });
        }
    }

    return Segment;

});