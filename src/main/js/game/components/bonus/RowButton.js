define(require=>{
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const PIXI = require('com/pixijs/pixi');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    class RowButton extends Pressable {
        constructor(data) {
            super();

            this.on('press',this.onPointerDown);
            this.dataArray = data;

            this.createHitArea();
            this.enabled = false;

            this.spine = new PIXI.spine.Spine(resLib.spine['megaMatchArrows'].spineData);
            this.spine.state.setAnimation(0,'arrowPulse',true);

            this.addChild(this.spine);
        }

        enable() {
            this.enabled = true;
        }

        disable() {
            this.enabled = false;
            let time = this.spine.state.tracks[0].animationLast;
            this.spine.state.setAnimation(0,'arrowPulse',false);
            this.spine.state.tracks[0].time = time;
        }

        createHitArea() {
            let debug = false;
            let graphic = new PIXI.Graphics();

            graphic.beginFill(0xffffff);
            graphic.drawRect(-40,-40,80,80);
            graphic.endFill();

            if(debug) {
                this.addChild(graphic);
            }

            this.hitArea = new PIXI.Rectangle(
                graphic.graphicsData[0].shape.x,
                graphic.graphicsData[0].shape.y,
                graphic.graphicsData[0].shape.height,
                graphic.graphicsData[0].shape.width
            );
        }

        onPointerDown() {
            this.disable();

            let points = this.dataArray.filter(e=>{
                return !e.revealed;
            });

            if(points.length === 5) {
                audio.play('megamatchRevealAll');
            }

            points.forEach((e,i)=>{
                e.interactive = false;
                Tween.delayedCall(gameConfig.autoPlayBonusItemInterval * i, ()=>{
                    if(points.length !== 5) {
                        audio.play('megamatchTileFlip');
                    }
                    e.buttonPressed = true;
                    e.reveal();
                }, null, e);
            });
        }

        reset() {
            this.enabled = false;
            this.spine.state.setAnimation(0,'arrowPulse',true);
        }

        static fromContainer(container,data) {
            const button = new RowButton(data);
            container.addChildAt(button,0);
            return button;
        }
    }

    return RowButton;

});