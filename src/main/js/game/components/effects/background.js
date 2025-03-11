define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const displayList = require('skbJet/componentManchester/standardIW/displayList');
  const utils = require('game/components/utils/utils');
  const resLib = require('skbJet/component/resourceLoader/resourceLib');
  const orientation = require('skbJet/componentManchester/standardIW/orientation');
  const particleConfig = require('game/components/effects/particleConfig');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const PIXI = require('com/pixijs/pixi');
  require('com/pixijs/pixi-particles');

  let spineAnim_Base;
  let spineAnim_Bonus;

  let baseParticles;
  let bonusParticles;

  let baseBG;
  let bonusBG;

  let baseEmitter;
  let bonusEmitter;

  function init() {
    const baseBackground = displayList.animatedBackground;
    // Init containers
    baseParticles = new PIXI.Container();
    bonusParticles = new PIXI.Container();
    baseBG = new PIXI.Container();
    bonusBG = new PIXI.Container();
    baseParticles.position.set(410, 1130);
    bonusParticles.position.set(410, 1130);

    // Set up spine project
    spineAnim_Base = new PIXI.spine.Spine(resLib.spine['backgroundAnims'].spineData);
    spineAnim_Bonus = new PIXI.spine.Spine(resLib.spine['backgroundAnims'].spineData);




    // Grab some config    
    let baseConfig = getConfig(particleConfig.baseBGConfig, gameConfig.backgroundParticleConfig.base);
    let bonusConfig = getConfig(particleConfig.bonusBGConfig, gameConfig.backgroundParticleConfig.bonus);

    // Init emitters
    baseEmitter = new PIXI.particles.Emitter(
      baseParticles,
      PIXI.Texture.from('background-particle'),
      baseConfig
    );

    bonusEmitter = new PIXI.particles.Emitter(
      bonusParticles,
      PIXI.Texture.from('background-particle'),
      bonusConfig
    );

    baseEmitter.autoUpdate = true;
    baseEmitter.emit = true;
    bonusEmitter.autoUpdate = true;
    bonusEmitter.emit = true;

    // Add to background containers
    baseBG.addChild(spineAnim_Base);
    bonusBG.addChild(spineAnim_Bonus);
    baseBackground.addChild(baseBG /*, baseParticles*/ );

    // Set state
    setState({
      state: orientation.get(),
      loop: true
    });

    // Position
    position();

    msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);
    //msgBus.subscribe('jLottery.reStartUserInteraction', onGameStart);
    msgBus.subscribe('jLottery.startUserInteraction', onGameStart);
  }

  function onGameStart() {
    position();
    setState({
      state: orientation.get(),
      loop: false,
      isStart: true
    });

  }

  function onOrientationChange() {
    position();
    setState({
      state: orientation.get(),
      loop: true
    });
  }

  function position() {
    // Position
    spineAnim_Base.x = spineAnim_Bonus.x = orientation.get() === 'landscape' ? 720 : 405;
    spineAnim_Base.y = spineAnim_Bonus.y = orientation.get() === 'landscape' ? 405 : 720;
  }

  function setState(data) {
    let nextState;
    let bonusState;
    let doLoop = data.loop || false;
    let syncTime = data.sync || 0;

    switch (data.state) {
      case 'portrait':
        nextState = (data.isStart) ? 'port_backgroundAnim_gameStartAnim' : 'port_backgroundAnim';
        bonusState = 'port_backgroundAnim_Bonus';
        break;
      case 'landscape':
        nextState = (data.isStart) ? 'land_background_gameStartAnim' : 'land_backgroundAnim';
        bonusState = 'land_backgroundAnim_bonus';
        break;
    }

    spineAnim_Base.state.setAnimation(syncTime, nextState, doLoop);
    spineAnim_Bonus.state.setAnimation(syncTime, bonusState, doLoop);

    spineAnim_Base.state.addListener({
      complete: function() {
        if (data.isStart) {
          utils.removeSpineListeners(spineAnim_Base);
          setState({
            state: orientation.get(),
            loop: true,
            isStart: false
          });
        }
      }
    });
  }

  function getConfig(config, customConfig) {
    // If we have no config, this shouldn't have happened, but return
    if (!config) {
      return;
    }

    // Grab the main config
    let newConfig = JSON.parse(JSON.stringify(config));

    // Replace the config values with the configurable parameters
    newConfig.frequency = customConfig.hasOwnProperty('frequency') ? customConfig.frequency : config.frequency;
    newConfig.maxSpeed = customConfig.hasOwnProperty('maxSpeed') ? customConfig.maxSpeed : config.maxSpeed;
    newConfig.noRotation = customConfig.hasOwnProperty('noRotation') ? customConfig.noRotation : config.noRotation;
    newConfig.blendMode = customConfig.hasOwnProperty('blendMode') ? customConfig.blendMode : config.blendMode;
    newConfig.addAtBack = customConfig.hasOwnProperty('addAtBack') ? customConfig.addAtBack : config.addAtBack;
    newConfig.spawnType = customConfig.hasOwnProperty('spawnType') ? customConfig.spawnType : config.spawnType;
    newConfig.emitterLifetime = customConfig.hasOwnProperty('emitterLifetime') ? customConfig.emitterLifetime : config.emitterLifetime;
    newConfig.maxParticles = customConfig.hasOwnProperty('maxParticles') ? customConfig.maxParticles : config.maxParticles;

    newConfig.speed.start = (customConfig.hasOwnProperty('speed') && customConfig.speed.hasOwnProperty('start')) ? customConfig.speed.start : config.speed.start;
    newConfig.speed.end = (customConfig.hasOwnProperty('speed') && customConfig.speed.hasOwnProperty('end')) ? customConfig.speed.end : config.speed.end;
    newConfig.speed.minimumSpeedMultiplier = (customConfig.hasOwnProperty('speed') && customConfig.speed.hasOwnProperty('minimumSpeedMultiplier')) ? customConfig.speed.minimumSpeedMultiplier : config.speed.minimumSpeedMultiplier;

    newConfig.scale.start = (customConfig.hasOwnProperty('scale') && customConfig.scale.hasOwnProperty('start')) ? customConfig.scale.start : config.scale.start;
    newConfig.scale.end = (customConfig.hasOwnProperty('scale') && customConfig.scale.hasOwnProperty('end')) ? customConfig.scale.end : config.scale.end;
    newConfig.scale.minimumScaleMultiplier = (customConfig.hasOwnProperty('scale') && customConfig.scale.hasOwnProperty('minimumScaleMultiplier')) ? customConfig.scale.minimumScaleMultiplier : config.speed.minimumScaleMultiplier;

    newConfig.alpha.start = (customConfig.hasOwnProperty('alpha') && customConfig.alpha.hasOwnProperty('start')) ? customConfig.alpha.start : config.alpha.start;
    newConfig.alpha.end = (customConfig.hasOwnProperty('alpha') && customConfig.alpha.hasOwnProperty('end')) ? customConfig.alpha.end : config.alpha.end;

    newConfig.color.start = (customConfig.hasOwnProperty('color') && customConfig.color.hasOwnProperty('start')) ? customConfig.color.start : config.color.start;
    newConfig.color.end = (customConfig.hasOwnProperty('color') && customConfig.color.hasOwnProperty('end')) ? customConfig.color.end : config.color.end;

    newConfig.startRotation.min = (customConfig.hasOwnProperty('startRotation') && customConfig.startRotation.hasOwnProperty('min')) ? customConfig.startRotation.min : config.startRotation.min;
    newConfig.startRotation.max = (customConfig.hasOwnProperty('startRotation') && customConfig.startRotation.hasOwnProperty('max')) ? customConfig.startRotation.max : config.startRotation.max;

    newConfig.rotationSpeed.min = (customConfig.hasOwnProperty('rotationSpeed') && customConfig.rotationSpeed.hasOwnProperty('min')) ? customConfig.rotationSpeed.min : config.rotationSpeed.min;
    newConfig.rotationSpeed.max = (customConfig.hasOwnProperty('rotationSpeed') && customConfig.rotationSpeed.hasOwnProperty('max')) ? customConfig.rotationSpeed.max : config.rotationSpeed.max;

    newConfig.lifetime.min = (customConfig.hasOwnProperty('lifetime') && customConfig.lifetime.hasOwnProperty('min')) ? customConfig.lifetime.min : config.lifetime.min;
    newConfig.lifetime.max = (customConfig.hasOwnProperty('lifetime') && customConfig.lifetime.hasOwnProperty('max')) ? customConfig.lifetime.max : config.lifetime.max;

    newConfig.acceleration.x = (customConfig.hasOwnProperty('acceleration') && customConfig.acceleration.hasOwnProperty('x')) ? customConfig.acceleration.x : config.acceleration.x;
    newConfig.acceleration.y = (customConfig.hasOwnProperty('acceleration') && customConfig.acceleration.hasOwnProperty('y')) ? customConfig.acceleration.y : config.acceleration.y;

    newConfig.pos.x = (customConfig.hasOwnProperty('pos') && customConfig.pos.hasOwnProperty('x')) ? customConfig.pos.x : config.pos.x;
    newConfig.pos.y = (customConfig.hasOwnProperty('pos') && customConfig.pos.hasOwnProperty('y')) ? customConfig.pos.y : config.pos.y;

    // We need to also stipulate the orientation spawnRect
    newConfig.spawnRect = {};
    newConfig.spawnRect.x = (customConfig.hasOwnProperty('spawnRect') && customConfig.spawnRect.hasOwnProperty('x')) ? customConfig.spawnRect.x : config.spawnRect.x;
    newConfig.spawnRect.y = (customConfig.hasOwnProperty('spawnRect') && customConfig.spawnRect.hasOwnProperty('y')) ? customConfig.spawnRect.y : config.spawnRect.y;
    newConfig.spawnRect.w = (customConfig.hasOwnProperty('spawnRect') && customConfig.spawnRect.hasOwnProperty('w')) ? customConfig.spawnRect.w : config.spawnRect.w;
    newConfig.spawnRect.h = (customConfig.hasOwnProperty('spawnRect') && customConfig.spawnRect.hasOwnProperty('h')) ? customConfig.spawnRect.h : config.spawnRect.h;
    // Init emitters with the new config
    return newConfig;
  }

  return {
    init
  };
});