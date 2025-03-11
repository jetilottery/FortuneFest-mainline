define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const resLib = require('skbJet/component/resourceLoader/resourceLib');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const PIXI = require('com/pixijs/pixi');
  require('com/pixijs/pixi-particles');

  require('com/gsap/TweenLite');
  let Tween = window.TweenLite;

  let spineAnim_Buy;
  let spineAnim_Try;

  let anims = {};

  // Button overrides. Some buttons should *never* show based on env or config
  let overrides = {};

  // Keep track of scheduled button updates so we can cancel if needed
  let timeouts = {};

  function init() {
    const buyButton = displayList.buyButtonAnim;
    const tryButton = displayList.tryButtonAnim;

    // Set up an object so we can refer to the anims by button name
    anims = {
      buy: buyButton,
      try: tryButton,
    };

    // Set up spine project
    spineAnim_Buy = new PIXI.spine.Spine(resLib.spine['buyBtnHighlight'].spineData);
    spineAnim_Try = new PIXI.spine.Spine(resLib.spine['buyBtnHighlight'].spineData);

    // Add to background containers
    buyButton.addChild(spineAnim_Buy);
    tryButton.addChild(spineAnim_Try);

    // Set visible false on both
    buyButton.visible = false;
    tryButton.visible = false;

    // Set state
    setState({
      loop: true
    });

    // Position
    position();

    // Add listeners to buy and try buttons
    displayList.buyButton.on('press', () => showHide(buyButton, false));
    displayList.tryButton.on('press', () => showHide(tryButton, false));

    // Subscribe to OrientationChange and updateButtons
    msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);
    msgBus.subscribe('UI.updateButtons', updateButtons);
  }

  function onOrientationChange() {
    position();
  }

  function position() {
    // Position
    spineAnim_Buy.x = displayList.buyButton.x;
    spineAnim_Buy.y = displayList.buyButton.y;
    spineAnim_Try.x = displayList.tryButton.x;
    spineAnim_Try.y = displayList.tryButton.y;
  }

  function setState(data) {
    let nextState;
    let doLoop = data.loop || false;
    let syncTime = data.sync || 0;
    nextState = 'BuyButtonHighlight';
    spineAnim_Buy.state.setAnimation(syncTime, nextState, doLoop);
    spineAnim_Try.state.setAnimation(syncTime, nextState, doLoop);
  }

  /**
   * Duplicate of updateButtons from standardIW buttonBar - so we can show/hide the animations using the same events
   * used to show/hide the buttons themselves, taking into account compulsion delays etc
   */
  function updateButtons(inConfig) {
    Object.keys(inConfig).forEach(function updateButton(buttonName) {
      // Skip if not a named button animation
      if (anims[buttonName] === undefined) {
        return;
      }

      let bConf = inConfig[buttonName];

      // If we're altering visibility cancel any scheduled updates to this button animation
      if (
        timeouts[buttonName] !== undefined &&
        (bConf.visible !== undefined || typeof bConf === 'number' || typeof bConf === 'boolean')
      ) {
        clearTimeout(timeouts[buttonName]);
        timeouts[buttonName] = undefined;
      }

      // Update button animation visibility
      if (bConf === true || bConf.visible === true) {
        // Button animation will be shown if it isn't blocked in this environment
        showHide(anims[buttonName], overrides[buttonName] !== false);
      } else if (bConf === false || bConf.visible === false) {
        // Button animation will be hidden
        showHide(anims[buttonName], false);
      } else if (typeof bConf === 'number') {
        // Button animation will be shown after the specified delay
        timeouts[buttonName] = setTimeout(function showButtonAfterDelay() {
          showHide(anims[buttonName], true);
          timeouts[buttonName] = undefined;
        }, bConf * 1000);
      }
    });
  }

  /**
   * Duplicate of showHide from standardIW buttonBar - so we can show/hide the animations in sync with the buttons
   * including fastFade/fastFadeDuration 
   */
  function showHide(anim, show) {
    if (gameConfig.fastFadeButtons) {
      Tween.to(anim, gameConfig.fastFadeDuration, {
        alpha: show ? 1 : 0,
        onStart: function() {
          if (show) {
            anim.visible = show;
          }
        },
        onComplete: function() {
          anim.visible = show;
        }
      });
    } else {
      anim.visible = show;
    }
  }

  return {
    init
  };
});