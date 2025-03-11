define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const utils = require('game/components/utils/utils');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    const _howToPlayConfig = {
        landscape: {
            MAX_HEIGHT: 370,
            DEFAULT_FONT_SIZE: 30
        },
        portrait: {
            MAX_HEIGHT: 640,
            DEFAULT_FONT_SIZE: 30
        }
    };
    
    /*
     *
     */
    function init(){
        doSetup();
        msgBus.subscribe('GameSize.OrientationChange', doSetup);        
    }

    /*
     *
     */
    function doSetup(){
        // TMP012-79 - TMP012_IQA_siteId 0:text overflow on how to play page and total demo win dialog
        // Auto resizing is not implemented on the tutorial plaque by default
        let maxHeight = _howToPlayConfig[orientation.get().toLowerCase()].MAX_HEIGHT;
        let defFont = _howToPlayConfig[orientation.get().toLowerCase()].DEFAULT_FONT_SIZE;
        for (let i = 0; i < displayList.howToPlayPages.children.length; i++){
            utils.autoResize(displayList['howToPlayPage'+(i+1)], maxHeight, defFont);
        }

        // DDDLX-92 - KY - "PLAY WITH MONEY" text very close to edges of button
        // If we are overriding the button max width, set them here
        if (gameConfig.overrideMaxButtonWidth){
            displayList.exitButton.label.maxWidth = gameConfig.overrideButtonWidthValue;
            displayList.playAgainButton.label.maxWidth = gameConfig.overrideButtonWidthValue;
            displayList.tryAgainButton.label.maxWidth = gameConfig.overrideButtonWidthValue; 
            displayList.buyButton.label.maxWidth = gameConfig.overrideButtonWidthValue;
            displayList.tryButton.label.maxWidth = gameConfig.overrideButtonWidthValue;
            displayList.moveToMoneyButton.label.maxWidth = gameConfig.overrideButtonWidthValue;
            displayList.autoPlayStartButton.label.maxWidth = gameConfig.overrideButtonWidthValue;
            displayList.autoPlayStopButton.label.maxWidth = gameConfig.overrideButtonWidthValue;
        }
    }

    return {
      init
    };
  });
  