define(require => {
    const Pressable = require('skbJet/componentManchester/standardIW/components/pressable');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const PIXI = require('com/pixijs/pixi');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const Text = require('skbJet/componentManchester/standardIW/components/fittedText');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    class WheelButton extends Pressable {

        constructor() {
            super();

            this.spine = new PIXI.spine.Spine(resLib.spine['hyperSpinButtonSetUp'].spineData);

            this.addChild(this.spine);
            this.on('press', this.onPointerDown);
            this.on('mouseover', this.onPointerOver);
            this.on('mouseout', this.onPointerOut);

            this.label = new Text(resources.i18n.Game.spinButton);
            this.label.anchor.set(0.5);
            this.label.style = textStyles.parse('spinButton');
            this.label.maxWidth = 240;

            this.addChild(this.label);

            this.hitArea = this.createHitArea(64, 200);

            this.pressed = undefined;
            this.interactive = false;


            this.onOrientationChange();

            msgBus.subscribe('GameSize.OrientationChange', this.onOrientationChange.bind(this));

        }

        createHitArea(segmentSize, wheelRadius) {
            let _wheelPins = [];

            function degToRad(degrees) {
                return degrees * 0.0174532925;
            }

            for (let i = 0; i < segmentSize; i++) {
                _wheelPins[i] = new PIXI.Point(
                    wheelRadius * Math.cos(degToRad(360 / segmentSize * i)),
                    wheelRadius * Math.sin(degToRad(360 / segmentSize * i))
                );
            }

            return new PIXI.Polygon(_wheelPins);
        }

        enable() {
            return new Promise(resolve => {
                this.interactive = true;
                this.pressed = resolve;
            });
        }

        onPointerDown() {
            this.interactive = false;

            Tween.to(this.label,0.3,{
                alpha: 0.3,
            });

            let anim = orientation.get() === orientation.LANDSCAPE ?
                'landscape/Spin Down' :
                'portrait/Spin Down';
            this.spine.state.setAnimation(0, anim, false);

            audio.play('spinButton');

            this.pressed();
        }

        onPointerOver() {
            if(this.interactive) {
                let anim = orientation.get() === orientation.LANDSCAPE ?
                    'landscape/Spin Over' :
                    'portrait/Spin Over';
                this.spine.state.setAnimation(0, anim, true);
            }
        }

        onPointerOut() {
            if(this.interactive) {
                let anim = orientation.get() === orientation.LANDSCAPE ?
                    'landscape/' :
                    'portrait/';
                this.spine.state.setAnimation(0, anim+'spinButtonGlow', true);
            }
        }

        reset() {
            this.spine.state.timescale = 1;
            this.spine.state.tracks[0].time = 0;
            this.pressed = undefined;
            this.interactive = false;
            this.label.alpha = 1;
        }

        onOrientationChange() {
            let time = 0;
            if (this.spine.state.tracks.length > 0) {
                time = this.spine.state.tracks[0].time;
            }

            let anim = orientation.get() === orientation.LANDSCAPE ?
                'landscape/' :
                'portrait/';
            this.spine.state.setAnimation(0, anim+'spinButtonGlow', true);
            this.spine.state.tracks[0].time = time;

            this.label.y = orientation.get() === orientation.LANDSCAPE ? -40 : 0;
            this.label.x = orientation.get() === orientation.LANDSCAPE ? 0 : 8;
        }

        static fromContainer(container) {
            const button = new WheelButton();
            container.addChild(button);
            return button;
        }
    }

    return WheelButton;
});
