define(require => {

    const Light = require('game/components/lights/Light');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    require('com/gsap/TimelineMax');
    const TimelineMax = window.TimelineMax;

    let baseGameLogoLights = [];
    let wheelLights = [];

    let baseGameLightsTimeLine;
    let wheelGameLightsTimeLine;

    let LightsTimeLineMultiplier = 0;
    let speed = 1;

    function init() {
        baseGameLogoLights = [
            Light.fromContainer(displayList.logoLightContainer, {x: -77, y: -75}),
            Light.fromContainer(displayList.logoLightContainer, {x: -45, y: -74}),
            Light.fromContainer(displayList.logoLightContainer, {x: -16, y: -71}),
            Light.fromContainer(displayList.logoLightContainer, {x: 17, y: -69}),
            Light.fromContainer(displayList.logoLightContainer, {x: 50, y: -66}),
            Light.fromContainer(displayList.logoLightContainer, {x: 81, y: -63}),
            Light.fromContainer(displayList.logoLightContainer, {x: 116, y: -59}),
            Light.fromContainer(displayList.logoLightContainer, {x: 152, y: -57}),
            Light.fromContainer(displayList.logoLightContainer, {x: 188, y: -51}),
            Light.fromContainer(displayList.logoLightContainer, {x: 169, y: 41}),
            Light.fromContainer(displayList.logoLightContainer, {x: 145, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: 117, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: 85, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: 41, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: 11, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: -18, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: -46, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: -74, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: -106, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: -136, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: -164, y: 47}),
            Light.fromContainer(displayList.logoLightContainer, {x: -219, y: -27}),
        ];

        wheelLights = [
            Light.fromContainer(displayList.wheelLightContainer, {x: 210, y: -492}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 309, y: -429}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 388, y: -354}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 445, y: -270}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 485, y: -168}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 507, y: -68}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 510, y: 40}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 488, y: 140}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 446, y: 241}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 385, y: 321}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 306, y: 401}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 211, y: 458}),
            Light.fromContainer(displayList.wheelLightContainer, {x: 102, y: 498}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -14, y: 509}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -128, y: 501}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -238, y: 461}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -336, y: 401}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -418, y: 321}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -479, y: 235}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -519, y: 137}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -536, y: 41}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -536, y: -68}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -520, y: -164}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -481, y: -260}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -419, y: -348}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -334, y: -428}),
            Light.fromContainer(displayList.wheelLightContainer, {x: -239, y: -488}),
        ];

        baseGameLightsTimeLine = new TimelineMax({repeat: -1});
        wheelGameLightsTimeLine = new TimelineMax({repeat: -1});

    }

    function cycle() {
        let switched = false;
        cycleLights();
        if (LightsTimeLineMultiplier === 1 && switched === false) {
            LightsTimeLineMultiplier = 0;
            switched = true;
        }
        if (LightsTimeLineMultiplier === 0 && switched === false) {
            LightsTimeLineMultiplier = 1;
        }
    }

    function cycleLights() {
        [
            baseGameLogoLights,
            wheelLights,
        ].forEach(e=> {
            e.forEach((el, i) => {
                el.lightOff();
                if ((i + LightsTimeLineMultiplier) % 2 === 1) {
                    el.lightOn(100);
                }
            });
        });
    }

    function setSpeed(val) {
        if([
            baseGameLightsTimeLine,
            wheelGameLightsTimeLine
        ].every(e=>{ return e !== undefined;})) {

            baseGameLightsTimeLine.clear();

            speed = val;

            baseGameLightsTimeLine.add(Tween.delayedCall(speed,cycle));
            baseGameLightsTimeLine.restart();
        }
    }


    return {
        init,
        setSpeed
    };
});
