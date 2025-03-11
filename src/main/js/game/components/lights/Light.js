define(require => {

    const PIXI = require('com/pixijs/pixi');


    class Light extends PIXI.Container {
        constructor(pos) {
            super();
            this.light = new PIXI.Sprite(PIXI.Texture.from('logoLightsAnimation'));
            this.light.alpha = 0;

            this.addChild(this.light);

            this.position.set(pos.x,pos.y);
        }

        lightOn(val) {
            if(typeof val === "number") {
                if(val > 100) {
                    val = 100;
                }
                if(val < 0) {
                    val = 0;
                }
                this.light.alpha = (val / 100);
            } else {
                this.light.alpha = 1;
            }
        }

        lightOff() {
            this.light.alpha = 0;
        }

        static fromContainer(container,pos) {
            const valve = new Light(pos);
            container.addChild(valve);
            return valve;
        }
    }

    return Light;
});


