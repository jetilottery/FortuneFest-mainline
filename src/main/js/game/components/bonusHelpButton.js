define(require=>{

    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let button;

    function init() {
        button = displayList.bonusHelpButton;
        button.visible = false;
        button.alpha = true;

        button.on('press',onPress);
    }

    function checkState(conf = {}) {
        if(button.visible) {
            console.log(conf);
        }
    }

    function onPress() {
        displayList.helpButton._events.press[0].fn();
        displayList.helpButton._events.press[1].fn();
    }

    function disable() {
        button.enabled = false;
        Tween.to(button,0.3,{
            alpha: 0.5
        });
    }
    function enable() {
        button.enabled = true;
        Tween.to(button,0.3,{
            alpha: 1
        });
    }

    function toggle(val,enabled) {
        button.visible = val;
        button.enabled = enabled !== undefined ? enabled : val;
        Tween.to(button,0.3,{
            alpha: val === true ? 1 : 0
        });
    }

    msgBus.subscribe('UI.updateButtons', checkState);

    return {
        init,
        toggle,
        disable,
        enable
    };

});