define((require) => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    function preload(app, callback) {
        // Sprite sheets
        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['transition_atlas_page_transition.png']);
        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['transition_atlas_page_transition.jpg']);
        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['transition_atlas_page_transition2.jpg']);

        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['game_image']);
        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['i18n_image']);
        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['numbers_image']);
        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['plaques-0_image']);        
        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['plaques-1_image']);
        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['plaques-2_image']);
        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['plaques-3_image']);
        // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['uiControls_image']); 
        //Preload
        app.renderer.plugins.prepare.upload(callback);
    }

    function textFix() {
        displayList.buyButton.label.maxWidth = 220;
        displayList.tryButton.label.maxWidth = 220;
        displayList.moveToMoneyButton.label.maxWidth = 220;
        displayList.autoPlayStartButton.label.maxWidth = 220;
        displayList.autoPlayStopButton.label.maxWidth = 220;
        displayList.bonusAutoPlayButton.label.maxWidth = 220;
    }

    return {
        preload,
        textFix
    };    
});