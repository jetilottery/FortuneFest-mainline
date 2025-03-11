define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const PIXI = require('com/pixijs/pixi');
    const Segment = require('game/components/wheelGame/Segment');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    require('com/gsap/TimelineMax');
    const TimelineMax = window.TimelineMax;

    let wheelInner_1;
    let wheelInner_2;
    let wheelInner_3;
    let wheelInner_4;

    let isSpinning = false;

    let wheelFade;

    let wheelMap = {
        1: [2, 10, 2, 5, 10, 2, 5, 2, 10, 5],
        2: [3, 10, 15, 3, 5, 20, 10, 3, 15, 5],
        3: [5, 20, 25, 5, 10, 50, 20, 5, 25, 10],
        4: [0, 20, 0, 100, 0, 20, 0, 50, 0, 25]
    };

    let segmentMap = {
        1: [],
        2: [],
        3: [],
        4: []
    };

    let landedSegments = [];

    function init() {
        wheelInner_1 = displayList.wheelInner_1;
        wheelInner_2 = displayList.wheelInner_2;
        wheelInner_3 = displayList.wheelInner_3;
        wheelInner_4 = displayList.wheelInner_4;

        let wheelInner_1Container = new PIXI.Container();
        let wheelInner_2Container = new PIXI.Container();
        let wheelInner_3Container = new PIXI.Container();
        let wheelInner_4Container = new PIXI.Container();

        wheelInner_1.addChild(wheelInner_1Container);
        wheelInner_2.addChild(wheelInner_2Container);
        wheelInner_3.addChild(wheelInner_3Container);
        wheelInner_4.addChild(wheelInner_4Container);

        [
            wheelInner_1Container,
            wheelInner_2Container,
            wheelInner_3Container,
            wheelInner_4Container
        ].forEach(e => {
            e.rotation = Math.PI / 2;
        });

        wheelMap[1].forEach((e, i, a) => {
            let radius = wheelInner_1.height / 2;
            let rotation = (((2 * Math.PI) / a.length) * i);
            let offset = 25;

            let segment = new Segment({
                rotation: rotation,
                pivot: radius,
                assignedData: wheelMap[1][i],
                offset: offset,
                index: i
            });
            segmentMap[1].push(segment);

            wheelInner_1Container.addChild(segment);
        });
        wheelMap[2].forEach((e, i, a) => {
            let radius = wheelInner_2.height / 2;
            let rotation = (((2 * Math.PI) / a.length) * i);
            let offset = 25;

            let segment = new Segment({
                rotation: rotation,
                pivot: radius,
                assignedData: wheelMap[2][i],
                offset: offset,
                index: i
            });
            segmentMap[2].push(segment);

            wheelInner_2Container.addChild(segment);
        });
        wheelMap[3].forEach((e, i, a) => {
            let radius = wheelInner_3.height / 2;
            let rotation = (((2 * Math.PI) / a.length) * i);
            let offset = 25;

            let segment = new Segment({
                rotation: rotation,
                pivot: radius,
                assignedData: wheelMap[3][i],
                offset: offset,
                index: i
            });
            segmentMap[3].push(segment);

            wheelInner_3Container.addChild(segment);
        });
        wheelMap[4].forEach((e, i, a) => {
            let radius = wheelInner_4.height / 2;
            let rotation = (((2 * Math.PI) / a.length) * i);
            let offset = 15;

            let segment = new Segment({
                rotation: rotation,
                pivot: radius,
                assignedData: wheelMap[4][i],
                offset: offset,
                index: i
            });
            segmentMap[4].push(segment);

            wheelInner_4Container.addChild(segment);
        });

        segmentMap[1].forEach(e => e.update());
        segmentMap[2].forEach(e => e.update());
        segmentMap[3].forEach(e => e.update());
        segmentMap[4].forEach(e => e.update());

        wheelFade = displayList.wheelFade;
        wheelFade.alpha = 0;

        wheelInner_1.rotation = 0.3;
        wheelInner_2.rotation = 0.3;
        wheelInner_3.rotation = 0.3;
        wheelInner_4.rotation = 0.3;
    }

    async function spinWheel(data) {
        if (landedSegments.length > 0) {
            landedSegments.forEach(e => {
                e.reset();
            });
            landedSegments = [];
        }

        return new Promise(resolve => {
            if (!isSpinning) {
                [
                    wheelInner_1,
                    wheelInner_2,
                    wheelInner_3,
                    wheelInner_4
                ].forEach((e, i, a) => {
                    let wheel = e;
                    let type = (i + 1) % 2;

                    let target;

                    target = findLandPosition(Number(data.endpoint[i]), i);
                    landedSegments.push(target);

                    audio.play('spin');

                    let timeLine = new TimelineMax({
                        onComplete: () => {
                            wheel.rotation = wheel.rotation % (Math.PI * 2);
                            isSpinning = false;
                            target.land();
                            if (i === a.length - 1) {
                                Tween.delayedCall(1, () => {
                                    resolve();
                                });
                            }
                        },
                    });
                    sustainSpin(wheel, target, timeLine, type, (i + 1));
                });
            }
        });
    }

    function sustainSpin(wheel, target, timeLine, type, index) {


        let startRot = [-(3 * (Math.PI * 2)), (3 * (Math.PI * 2))];
        let midRot = [(-target.rotation + (5 * (Math.PI * 2))) + 0.05, (-target.rotation - (5 * (Math.PI * 2))) + 0.05];
        let endRot = [-target.rotation + (5 * (Math.PI * 2)), -target.rotation - (5 * (Math.PI * 2))];

        let rot_1 = startRot[type];
        let rot_2 = midRot[type];
        let rot_3 = endRot[type];

        timeLine.to(wheel, 3, {
            ease: window.Power3.easeIn,
            rotation: rot_1,
        }, 0);

        timeLine.call(() => {
            // audio.play('spinLoop', -1, 1);
        }, null, null, 1);

        timeLine.to(wheel, 2 * (index / 0.5), {
            ease: window.Power4.easeOut,
            rotation: rot_2,
        }, 3.0);

        timeLine.call(() => {
            // audio.stop('spinLoop');
            // audio.play('spinLoopEnd', 0, 1);
        }, null, null, 3.0);

        timeLine.to(wheel, 0.75 * (index / 0.5), {
            ease: window.Power1.easeOut,
            rotation: rot_3,
            onComplete: () => {
                landedSegments[index - 1].showWin();
                if(landedSegments[index - 1].data === 0) {
                    audio.play('spinStopCollect');
                } else {
                    audio.play('spinStop');
                }
            }
        }, 5);
    }

    function findLandPosition(endpoint, wheel) {
        let map = segmentMap[wheel + 1].filter(e => {
            return e.data === endpoint;
        });
        let index = Math.floor(Math.random() * map.length);

        return map[index];
    }

    function updatePrizeAmounts() {
        segmentMap[1].forEach(e => e.update());
        segmentMap[2].forEach(e => e.update());
        segmentMap[3].forEach(e => e.update());
        segmentMap[4].forEach(e => e.update());

    }

    function reset() {
        segmentMap[1].forEach(e => e.reset());
        segmentMap[2].forEach(e => e.reset());
        segmentMap[3].forEach(e => e.reset());
        segmentMap[4].forEach(e => e.reset());

        wheelFade.alpha = 0;

        wheelInner_1 .rotation = 0.3;
        wheelInner_2 .rotation = 0.3;
        wheelInner_3 .rotation = 0.3;
        wheelInner_4 .rotation = 0.3;
    }

    function showEndOfGameWin() {
        return new Promise(resolve => {
            Tween.to(wheelFade, 0.5, {
                alpha: 1
            });
            landedSegments[3].showEndOfGameWin(resolve);
        });
    }

    msgBus.subscribe('MeterData.TicketCost', updatePrizeAmounts);

    return {
        init,
        reset,
        spinWheel,
        showEndOfGameWin
    };
});