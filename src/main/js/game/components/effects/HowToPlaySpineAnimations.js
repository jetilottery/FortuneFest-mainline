define(require=>{

    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const PIXI = require('com/pixijs/pixi');
    // const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
    // const textStyles = require('skbJet/componentManchester/standardIW/textStyles');

    let mainPageSpineAnim;
    let bonusSpineAnim;
    let multiplyierSpineAnim;
    let multiplyierSpineAnimOverlay;


    function init() {
        mainPageSpineAnim = new PIXI.spine.Spine(resLib.spine['pickPoints'].spineData);
        bonusSpineAnim = new PIXI.spine.Spine(resLib.spine['bonusMeterAnims'].spineData);
        multiplyierSpineAnim = new PIXI.spine.Spine(resLib.spine['bonusMeterAnims'].spineData);
        multiplyierSpineAnimOverlay = new PIXI.spine.Spine(resLib.spine['bonusMeterAnims'].spineData);

        displayList.howToPlayPage1Image.addChild(mainPageSpineAnim);
        displayList.howToPlayPage2Image.addChild(bonusSpineAnim);
        displayList.howToPlayPage3Image.addChild(multiplyierSpineAnim,multiplyierSpineAnimOverlay);

        bonusSpineAnim.x =  -27;
        bonusSpineAnim.y = 323;

        multiplyierSpineAnim.x = -373;
        multiplyierSpineAnim.y = 323;

        multiplyierSpineAnimOverlay.x = -373;
        multiplyierSpineAnimOverlay.y = 323;

        mainPageSpineAnim.state.setAnimation(0, 'landscape/btn_active_static', true);
        bonusSpineAnim.state.setAnimation(0,'land/bonusTriggerLoop', true);
        multiplyierSpineAnim.state.setAnimation(0,"land/multiplierTrigger_3_loop", false);
        multiplyierSpineAnimOverlay.state.setAnimation(0,"land/multiplierIdle", true);

        multiplyierSpineAnim.state.timeScale = 0;
        multiplyierSpineAnim.state.tracks[0].time = 0;

        // stringReplace();
    }
    
    // function stringReplace() {
    //     let strings = resources.i18n.Game.page1.split('{0}');
    //     let rows = resources.i18n.Game.page1.split('.');
    //
    //     let rowTwoPlus = new PIXI.Text();
    //     rowTwoPlus.style = textStyles.howToPlayInfoText;
    //     rowTwoPlus.style.align = 'center';
    //     rowTwoPlus.text = rows[1] + rows[2];
    //
    //     // displayList.howToPlayPage1.text = resources.i18n.Game.page1.replace('{0}', "    ");
    //
    //     let before = new PIXI.Text(strings[0]);
    //     before.anchor.set(0.5);
    //     before.style = textStyles.howToPlayInfoText;
    //     // before.style.align = 'center';
    //
    //     let after = new PIXI.Text(strings[1]);
    //     after.anchor.set(0.5);
    //     after.style = textStyles.howToPlayInfoText;
    //     // after.style.align = 'center';
    //
    //     displayList.howToPlayPage1SpineContainer.y = before.y;
    //     displayList.howToPlayPage1SpineContainer.x = before.x + (before.width + 20);
    //
    //     after.x = displayList.howToPlayPage1SpineContainer.x + 20;
    //
    //     displayList.howToPlayPage1.addChild(before,after,rowTwoPlus);
    // }

    return {
        init
    };

});