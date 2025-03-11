define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const utils = require('game/components/utils/utils');
    // const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const animState = require('game/state/anim');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let active = false;
    // let currentGameState = 'BASE_GAME';

    let WINNING_SET = 'WINNING';
    let PLAYER_SET = 'PLAYER';
    let PAUSED = 'PAUSED';

    let currentNumberSet = WINNING_SET; // WINNING, PLAYER or PAUSED

    let endOfRows = [5,10];

    function init(){

    }

    function autoPlayManager(inVal){
      utils.log('autoPlayManager: '+inVal);
      active = inVal;

      // TMP012-101 - TMP012: The one more same audio starts and make it not consistent with the number revealed if clicking "Stop" button when the number is revealing.
      // If we are disabling auto play, we need to stop the existing tween
      if (!active){
        Tween.killTweensOf(doNext);
      }else{
        // TMP012-105 - TMP012: The audio of the first and last numbers revealed sometimes doesn't play for the Lucky Number and Your Number on each rows.
        // Make sure the currentNumberSet is set before starting
        // Straightforward enough, if we have winning numbers to be revealed, it's WINNING_SET, else it's PLAYER_SET
        currentNumberSet = (animState.winning.length === 4) ? PLAYER_SET : WINNING_SET;
        if (canPlayNext()){
          //start playing
          doNext();
        }
      }     
    }

    function canPlayNext(){
      // let outVal = true;
      // // let allRevealed = scenarioData.scenario.playSymbolOrder.length === 0 && scenarioData.scenario.playerNumbers.length === 0;
      // if (!active || allRevealed || currentGameState !== 'BASE_GAME' || currentNumberSet === PAUSED){
      //   outVal = false;
      // }
      // return outVal;
    }

    function queueNext(inDelay){
      let delay = inDelay || gameConfig.autoPlayAudioInterval;
      if (canPlayNext()){
        Tween.delayedCall(delay, doNext);
      }      
    }

    // TMP012-99 - TMP012: The custom parameter "autoPlayAudioInterval" doesn't take effect in the "Lucky Number".
    // We need to work out what is currently revealing - a lucky number or a winning number
    // Or indeed... if we are in the pause between the two sets
    function checkNumberSet(type){
      let previousNumberSet = currentNumberSet;
      switch (type){
        case 'WinningNumber':
          currentNumberSet = WINNING_SET;
          break;
        case 'PlayerNumber':
          currentNumberSet = PLAYER_SET;
          break;
      }
      
      // Log out the current state
      utils.log('Changing currentNumberSet to: '+currentNumberSet);

      // If we're no longer pausing, reset the tween and call doNext
      if (previousNumberSet === PAUSED && currentNumberSet !== PAUSED){
        Tween.killTweensOf(doNext);
        doNext();
      }
    }

    function checkPause(type, card){
      switch (type){
        case 'WinningNumber':
          currentNumberSet = WINNING_SET;
          // Now then, very easy to check, have we *just* revealed the last possible Winning Number?
          // If we have, set the currentNumberSet to PAUSED, so we don't play a sound during the delay
          if (animState.winning.length === 4){
            currentNumberSet = PAUSED;
          }
          break;
        case 'PlayerNumber':
          currentNumberSet = PLAYER_SET;
          // Check end of row
          if (checkEndOfRow(card)){
            currentNumberSet = PAUSED;
          }
          break;
      }
      
      // Log out the current state
      utils.log('Changing currentNumberSet to: '+currentNumberSet);
    }

    // TMP012-102 - TMP012: The audio doesn't be consistent with the number revealed when starts to go to the next row.
    // We need to work out exactly when a row delay has started
    // then set the current set to PAUSED at the start of a row delay
    // simple enough, listen for a number being revealed, and see if the number is in endOfRows
    function checkEndOfRow(card){
      return endOfRows.indexOf(card.index+1) > -1;
    }

    function doNext(){
      let outDelay = 0;
      switch (currentNumberSet){
        case WINNING_SET:
          audio.playSequential('winningNumber');
          break;
        case PLAYER_SET:
          audio.playSequential('playerNumber');
          break;
        case PAUSED:
          // Should never happen
          break;
      }
      
      // Now queue the next call
      queueNext(outDelay);      
    }

    // Listen for autoplay activation
    msgBus.subscribe('Game.AutoPlayStart', () => autoPlayManager(true));

    // Listen for autoplay deactivation
    msgBus.subscribe('Game.AutoPlayStop', () => autoPlayManager(false));

    // Listen for change of game state
    // msgBus.subscribe('Game.StateChanged', data => currentGameState = data);

    // Listen for a winning number being revealed
    msgBus.subscribe('Game.WinningPickPoint', () => checkNumberSet('WinningNumber'));
    
    // Listen for a player number being revealed
    msgBus.subscribe('Game.PlayerPickPoint', () => checkNumberSet('PlayerNumber'));

    // Listen for a winning number being revealed
    msgBus.subscribe('Game.WinningAnimated', card => checkPause('WinningNumber', card));
    
    // Listen for a player number being revealed
    msgBus.subscribe('Game.PlayerAnimated', card => checkPause('PlayerNumber', card));

    return {
      init
    };
});