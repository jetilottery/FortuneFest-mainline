define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const PIXI = require('com/pixijs/pixi');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const bonusHelpButton = require('game/components/bonusHelpButton');
    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');
    require('com/gsap/easing/CustomEase');

    let transitionComplete;

    const Tween = window.TweenMax;

    let spine = undefined;
    let effect = undefined;

    let nextGameMode = undefined;

    let nextGameContainer = undefined;

    let effectArray = [];

    let showHomeButton = undefined;

    function init() {
        spine = new PIXI.spine.Spine(resLib.spine['CoinsAll'].spineData);
        effect = new PIXI.spine.Spine(resLib.spine['transition'].spineData);

        displayList.transitionSpine.addChild(spine);
        displayList.transitionEffect.addChild(effect);
        displayList.transitionBackground.alpha = 0;
        displayList.transition.visible = false;

        displayList.transitionSpine.renderable = false;
        displayList.transitionEffect.renderable = false;

        displayList.transitionTitleContainer.scale.set(0);

        showHomeButton = displayList.homeButtonStatic.visible;

        spine.state.addListener({
            complete: (entry) => {
                switch (entry.animation.name) {
                    case 'flipQmarkIntro': {
                        spine.state.setAnimation(0, 'flipLogoToLogoLoop', false);
                        Tween.delayedCall(0.4,()=>{
                            audio.play('bonusRevealEnd',false);
                        });
                        break;
                    }
                    case 'flipLogoToLogoLoop' : {
                        spine.state.setAnimation(0, nextGameMode, false);
                        Tween.delayedCall(1,()=>{
                            showGameTitle(nextGameMode);
                        });
                        break;
                    }
                    case 'flipOutroToMega' : {
                        transitionEnd();
                        break;
                    }
                    case 'flipOutroToHyper': {
                        transitionEnd();
                        break;
                    }
                }
            },
            event: (entry, event) => {
                if (event.data.name === "transition trigger") {
                    let anim = orientation.get() === orientation.LANDSCAPE ?
                        'transitionLandscape' :
                        'transitionPortrait';
                    effect.state.setAnimation(0, anim, false);
                    displayList.transitionEffect.renderable = true;
                }
            }
        });

        effect.state.addListener({
            complete: () => {
                displayList.transitionEffect.renderable = false;
            },
            event: (entry, event) => {
                if (event.data.name === "transitionTrigger") {
                    switchFromBaseGameToBonusElements();
                }
            }
        });

    }

    function reset() {
        displayList.transitionSpine.renderable = false;
        displayList.transitionEffect.renderable = false;
        displayList.transitionTitleContainer.scale.set(0);
        displayList.transitionTitleContainer.alpha = 1;
        nextGameMode = undefined;
    }

    function transitionEnd() {
        Tween.to(spine.scale, 0.5, {
            x: 0,
            y: 0,
        });
        Tween.to(displayList.transitionBackground, 1, {
            alpha: 0,
            onComplete: () => {
                transitionComplete();
                displayList.transitionSpine.renderable = false;
                displayList.transition.visible = false;
            }
        });
        Tween.to(displayList.transitionTitleContainer,0.5,{
           alpha: 0,
        });
        Tween.to(displayList.transitionTitleContainer.scale,0.5,{
            x: 0,
            y: 0,
        });

    }
    function switchFromBaseGameToBonusElements() {
        audio.play('bonusTransition',false);
        Tween.to(displayList.baseGame, 0.5, {
            alpha: 0,
            onComplete: () => {
                audio.play('bonusMusic',true);
                displayList.baseGame.visible = false;
            }
        });
        nextGameContainer.alpha = 0;
        Tween.to(nextGameContainer, 0.5, {
            alpha: 1
        });
        nextGameContainer.visible = true;
        bonusHelpButton.toggle(true,false);
        displayList.backgroundOverlay.children[0].state.setAnimation(0,orientation.get().toLowerCase() + '/' + (nextGameMode === 'flipOutroToMega' ? 'bg_megamatch' : 'bg_hyperspin') ,true);
    }

    function toBonus(next) {
        return new Promise(resolve => {
            transitionComplete = resolve;
            displayList.transition.visible = true;

            audio.play('coinFlip');

            nextGameMode = next === 'megaMatch' ? 'flipOutroToMega' : 'flipOutroToHyper';
            nextGameContainer = next === 'megaMatch' ? displayList.bonusGame : displayList.wheelGame;

            spine.state.setAnimation(0, 'flipQmarkIntro', false);
            displayList.transitionSpine.renderable = true;

            spine.state.timeScale = 0;
            spine.scale.set(0);

            displayList.bonusAutoPlayButton.renderable = SKBeInstant.config.autoRevealEnabled;
            displayList.bonusAutoPlayButton.interactive = SKBeInstant.config.autoRevealEnabled;
            
            Tween.to(displayList.transitionBackground, 1, {
                alpha: 0.8
            });

            Tween.to(spine.scale, 0.5, {
                x: 1,
                y: 1
            });

            Tween.delayedCall(1, () => {
                spine.state.timeScale = 1;
            });

            autoPlay._enabled = false;

            Tween.to(displayList.buttonBar, 0.3, {
                alpha: 0
            });
            Tween.to(displayList.ticketSelectBarSmall, 0.3, {
                alpha: 0,
                onComplete:()=>{
                    displayList.ticketSelectBarSmall.visible = false;
                }
            });
            Tween.to(displayList.ticketMultiplierContainer, 0.3, {
                alpha: 0
            });
            Tween.to(displayList.totalCostContainer, 0.3, {
                alpha: 0
            });

            displayList.ticketSelectBarSmall.renderable = false;
        });
    }

    function fromBonus(delaytime,hold = 2) {
        return new Promise(resolve => {
            let delay = delaytime || 0;
            Tween.delayedCall(delay,()=>{
                Tween.to(nextGameContainer, 0.5, {
                    alpha: 0,
                    onComplete: () => {
                        Tween.delayedCall(hold,()=>{
                            resolve();
                        });
                        nextGameContainer.visible = false;
                    }
                });
                displayList.baseGame.visible = true;
                Tween.to(displayList.baseGame, 0.5, {
                    alpha: 1,
                    onStart:()=>{
                        audio.play('transition',false);
                        audio.play('music',true);
                    }
                });
                displayList.ticketSelectBarSmall.visible = true;
                displayList.autoPlayButton.visible = true;
                displayList.homeButtonStatic.visible = showHomeButton;
                bonusHelpButton.toggle(false,false);

                autoPlay._enabled = false;

                Tween.to(displayList.buttonBar, 0.3, {
                    alpha: 1
                });

                if(SKBeInstant.config.jLotteryPhase !== 1 || meterData.ticketCosts.length > 1) {
                    Tween.to(displayList.ticketSelectBarSmall, 0.3, {
                        alpha: 0.5
                    });
                }

                Tween.to(displayList.totalCostContainer, 0.3, {
                    alpha: 1
                });

                Tween.to(displayList.ticketMultiplierContainer, 0.3, {
                    alpha: 0.5
                });

                displayList.backgroundOverlay.children[0].state.setAnimation(0, orientation.get().toLowerCase()+"/bg_basegame", true);

                displayList.ticketSelectBarSmall.renderable = true;
            });
        });
    }

    function showGameTitle(next) {
        let target = displayList.transitionTitle;

        target.parent.scale.set(0);
        target.alpha = 0;

        target.text = next === 'flipOutroToMega' ? resources.i18n.Game.page2Title : resources.i18n.Game.page3Title;

        Tween.to(target,0.5,{
           alpha : 1
        });
        Tween.to(target.parent.scale,0.5,{
            x:1,
            y:1
        });
        audio.play('bonusTriggered',false);
        effectArray.forEach((e,i)=>{
            let scaleAmmount = e.scale.x;
            e.scale.set(0);
            Tween.to(e.scale,0.5+(i+1 / 0.5),{
                x:scaleAmmount,
                y:scaleAmmount,
                ease: "slow(0.7, 0.7, false)"
            });
        });
    }


    function onOrientationChange() {
        if(effect !== undefined) {
            let time = 0;
            if (effect.state.tracks.length > 0) {
                time = effect.state.tracks[0].time;
            }

            effect.state.timeScale = 0;
            let anim = orientation.get() === orientation.LANDSCAPE ?
                'transitionLandscape' :
                'transitionPortrait';
            effect.state.setAnimation(0, anim, false);
            effect.state.tracks[0].time = time;
            effect.state.timeScale = 1;
        }
    }

    msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);


    return {
        init,
        reset,
        toBonus,
        fromBonus,
    };
});