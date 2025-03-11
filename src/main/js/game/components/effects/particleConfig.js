/**
 * particle Configs
 */
define(function module() { 
    //by returning this from a function, it means we can do e.g. 'new coinFountain()',
    //and have multiples, rather than changing settings for one, and ending up with the same settings for all
    const fountain = function(){
        return {
            //custom particle config settings
            bigWinSettings: {
                animatedParticlePrefix: 'coin',
                isAnimated: true, 
                startFrame: 1,
                endFrame: 10,
                nonAnimatedImages: [],
                frameRate: 10
            },

            //Normal Particle config settings
            "alpha": {
                "start": 1,
                "end": 1
            },
            "scale": {
                "start": 0.74,
                "end": 0.78,
                "minimumScaleMultiplier": 0.74
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 1100,
                "end": 1500,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": 1000
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 250,
                "max": 290
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": -30,
                "max": 30
            },
            "lifetime": {
                "min": 6,
                "max": 6
            },
            "blendMode": "normal",
            "frequency": 0.15,
            "emitterLifetime": 2,
            "maxParticles": 1200,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": -514,
                "y": 405,
                "w": 1028,
                "h": 50
            }
        };
    };

    const background ={
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.01,
            "end": 2,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ff0000",
            "end": "#ff0000"
        },
        "speed": {
            "start": 10,
            "end": 5,
            "minimumSpeedMultiplier": 10
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 10,
        "startRotation": {
            "min": 270,
            "max": 270
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 1,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 30
        },
        "blendMode": "screen",
        "extraData": {
            "path": "cos(x/50) * (2 * (sqrt(x) / 2))"
        },
        "frequency": 0.1,
        "emitterLifetime": -1,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "rect",
        "spawnRect": {
            "x": -1000,
            "y": 0,
            "w": 2000,
            "h": 0
        }
    };

    var bonusLightParticle = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.1,
            "end": 0.4,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ae00ff",
            "end": "#9100ff"
        },
        "speed": {
            "start": 1,
            "end": 200,
            "minimumSpeedMultiplier": 0.1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 1,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 1
        },
        "blendMode": "add",
        "frequency": 0.001,
        "emitterLifetime": -1,
        "maxParticles": 500,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "point"
    };

    var multiplierLightParticle = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.1,
            "end": 0.4,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#10ff00",
            "end": "#10ff00"
        },
        "speed": {
            "start": 1,
            "end": 200,
            "minimumSpeedMultiplier": 0.1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 1,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 1
        },
        "blendMode": "add",
        "frequency": 0.001,
        "emitterLifetime": -1,
        "maxParticles": 500,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "point"
    };

    var flyingBonus = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 3,
            "end": 1,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffffff",
            "end": "#ffffff"
        },
        "speed": {
            "start": 0,
            "end": 0,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 10
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.5,
            "max": 0.5
        },
        "blendMode": "add",
        "frequency": 0.03,
        "emitterLifetime": -1,
        "maxParticles": 500,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 12
        }
    };

    var winningBonus = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 4,
            "end": 2,
            "minimumScaleMultiplier": 2
        },
        "color": {
            "start": "#ffffff",
            "end": "#ffffff"
        },
        "speed": {
            "start": 0,
            "end": 0,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 10
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.5,
            "max": 0.5
        },
        "blendMode": "add",
        "frequency": 0.02,
        "emitterLifetime": -1,
        "maxParticles": 2000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 12
        }
    };

    const baseBGConfig = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.01,
            "end": 3,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#1b9ddb",
            "end": "#1b9ddb"
        },
        "speed": {
            "start": 5,
            "end": 2.5,
            "minimumSpeedMultiplier": 10
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 10,
        "startRotation": {
            "min": 270,
            "max": 270
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 1,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 70
        },
        "blendMode": "normal",
        "extraData": {
            "path": "cos(x/50) * (2 * (sqrt(x) / 2))"
        },
        "frequency": 0.25,
        "emitterLifetime": -1,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "rect",
        "spawnRect": {
            "x": -1000,
            "y": 0,
            "w": 2000,
            "h": 0
        }
    };

    const bonusBGConfig = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.01,
            "end": 3,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#1b9ddb",
            "end": "#1b9ddb"
        },
        "speed": {
            "start": 5,
            "end": 2.5,
            "minimumSpeedMultiplier": 10
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 10,
        "startRotation": {
            "min": 270,
            "max": 270
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 1,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 70
        },
        "blendMode": "normal",
        "extraData": {
            "path": "cos(x/50) * (2 * (sqrt(x) / 2))"
        },
        "frequency": 0.25,
        "emitterLifetime": -1,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "rect",
        "spawnRect": {
            "x": -1000,
            "y": 0,
            "w": 2000,
            "h": 0
        }
    };

    const bonusConfig = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.01,
            "end": 1,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffffff",
            "end": "#ff0400"
        },
        "speed": {
            "start": 10,
            "end": 5,
            "minimumSpeedMultiplier": 10
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 10,
        "startRotation": {
            "min": 270,
            "max": 270
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 1,
            "max": 100
        },
        "lifetime": {
            "min": 0.1,
            "max": 30
        },
        "blendMode": "add",
        "extraData": {
            "path": "cos(x/50) * (2 * (sqrt(x) / 2))"
        },
        "frequency": 0.5,
        "emitterLifetime": -1,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "rect",
        "spawnRect": {
            "x": -1000,
            "y": 0,
            "w": 2000,
            "h": 0
        }
    };

    return{
        fountain: fountain,
        bonusLightParticle : bonusLightParticle,
        multiplierLightParticle : multiplierLightParticle,
        background: background,
        flyingBonus: flyingBonus,
        winningBonus: winningBonus,
        baseBGConfig: baseBGConfig,
        bonusBGConfig: bonusBGConfig,
        bonusConfig: bonusConfig
    };
});