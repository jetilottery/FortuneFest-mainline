define(require => {
  const app = require('skbJet/componentManchester/standardIW/app');
  const PIXI = require('com/pixijs/pixi');
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const particleConfig = require('game/components/effects/particleConfig');
  const utils = require('game/components/utils/utils');
  const orientation = require('skbJet/componentManchester/standardIW/orientation');
  const meterData = require('skbJet/componentManchester/standardIW/meterData');

  let _containerPortrait;
  let _containerLandscape;
  let _container;

  // Set up a coin shower
  let coinShowerConfig = new particleConfig.fountain();
  // Set coin properties here
  let bigWinSettings = {
    animatedParticlePrefix: 'showerParticle00',
    startFrame: 0,
    endFrame: 23,
    isAnimated: true,
    nonAnimatedImages: [],
    frameRate: 24
  };

  // Default spawn position, can be overridden with config
  const defaultSpawnRect = {
    landscape: {x: 206, y: 810, w: 1028, h: 50},
    portrait: {x: 84, y: 1200, w: 642, h: 50}
  };

  function init(){
    _container = new PIXI.Container();

    // Init containers
    _containerPortrait = new PIXI.Container();
    _containerLandscape = new PIXI.Container();

    // Add the two orientation containers
    _container.addChild(_containerLandscape, _containerPortrait);
    
    // Add the container at the point directly below the result plaque
    for (let i = 0; i < app.stage.children.length; i++){
      if (app.stage.children[i].name === 'resultPlaquesContainer'){
        app.stage.addChildAt(_container, i-1);
        break;
      }
    }

    // Position it
    updatePositioning();

    // Coin shower not running by default
    toggleCoinShower(false);
  }

  function initEmitters(inOrientation, inContainer, inConfig){
    // Create emitter
    inContainer.emitter = utils.createEmitter(
      inContainer, 
      inConfig, 
      inConfig.bigWinSettings.animatedParticlePrefix,
      inConfig.bigWinSettings.nonAnimatedImages, 
      inConfig.bigWinSettings.isAnimated, 
      {startFrame: inConfig.bigWinSettings.startFrame, endFrame: inConfig.bigWinSettings.endFrame, isSingleNumFormat: false, frameRate: inConfig.bigWinSettings.frameRate}
    );

    // Do not emit by default
    inContainer.emitter.emit = false;
  }

  function setProps(config){
    // Kill both emitters
    if (_containerPortrait.emitter && _containerLandscape.emitter){
      _containerPortrait.emitter.killEmitter();
      _containerLandscape.emitter.killEmitter();
    }
    
    initEmitters('landscape', _containerLandscape, reconfigure(config, 'landscape'));
    initEmitters('portrait', _containerPortrait, reconfigure(config, 'portrait'));
  }

  function reconfigure(config, inOrientation){ 
    // If we have no config, this shouldn't have happened, but return
    if (!config){return;}   

    // Grab the main config
    let newConfig = JSON.parse(JSON.stringify(coinShowerConfig));

    // Refer to this orientation
    let customConfig = config[inOrientation];    

    // Set up big win
    newConfig.bigWinSettings = {};
    newConfig.bigWinSettings.animatedParticlePrefix = gameConfig.bigWinSettings[inOrientation].hasOwnProperty('animatedParticlePrefix') ? gameConfig.bigWinSettings[inOrientation].animatedParticlePrefix : bigWinSettings.animatedParticlePrefix;
    newConfig.bigWinSettings.isAnimated = gameConfig.bigWinSettings[inOrientation].hasOwnProperty('isAnimated') ? gameConfig.bigWinSettings[inOrientation].isAnimated : bigWinSettings.isAnimated;
    newConfig.bigWinSettings.startFrame = gameConfig.bigWinSettings[inOrientation].hasOwnProperty('startFrame') ? gameConfig.bigWinSettings[inOrientation].startFrame : bigWinSettings.startFrame;
    newConfig.bigWinSettings.endFrame = gameConfig.bigWinSettings[inOrientation].hasOwnProperty('endFrame') ? gameConfig.bigWinSettings[inOrientation].endFrame : bigWinSettings.endFrame;
    newConfig.bigWinSettings.nonAnimatedImages = gameConfig.bigWinSettings[inOrientation].hasOwnProperty('nonAnimatedImages') ? gameConfig.bigWinSettings[inOrientation].nonAnimatedImages : bigWinSettings.nonAnimatedImages;
    newConfig.bigWinSettings.frameRate = gameConfig.bigWinSettings[inOrientation].hasOwnProperty('frameRate') ? gameConfig.bigWinSettings[inOrientation].frameRate : bigWinSettings.frameRate;
    
    // Replace the config values with the configurable parameters
    newConfig.frequency = customConfig.hasOwnProperty('frequency')  ? customConfig.frequency : coinShowerConfig.frequency;
    newConfig.maxSpeed = customConfig.hasOwnProperty('maxSpeed') ? customConfig.maxSpeed : coinShowerConfig.maxSpeed;
    newConfig.noRotation = customConfig.hasOwnProperty('noRotation')  ? customConfig.noRotation : coinShowerConfig.noRotation;
    newConfig.blendMode = customConfig.hasOwnProperty('blendMode')  ? customConfig.blendMode : coinShowerConfig.blendMode;
    newConfig.addAtBack = customConfig.hasOwnProperty('addAtBack') ? customConfig.addAtBack : coinShowerConfig.addAtBack;
    newConfig.spawnType = customConfig.hasOwnProperty('spawnType') ? customConfig.spawnType : coinShowerConfig.spawnType;
    newConfig.emitterLifetime = customConfig.hasOwnProperty('emitterLifetime') ? customConfig.emitterLifetime : coinShowerConfig.emitterLifetime;
    newConfig.maxParticles = customConfig.hasOwnProperty('maxParticles') ? customConfig.maxParticles : coinShowerConfig.maxParticles;

    newConfig.speed.start = (customConfig.hasOwnProperty('speed') && customConfig.speed.hasOwnProperty('start')) ? customConfig.speed.start : coinShowerConfig.speed.start;
    newConfig.speed.end = (customConfig.hasOwnProperty('speed') && customConfig.speed.hasOwnProperty('end')) ? customConfig.speed.end : coinShowerConfig.speed.end;
    newConfig.speed.minimumSpeedMultiplier = (customConfig.hasOwnProperty('speed') && customConfig.speed.hasOwnProperty('minimumSpeedMultiplier')) ? customConfig.speed.minimumSpeedMultiplier : coinShowerConfig.speed.minimumSpeedMultiplier;

    newConfig.scale.start = (customConfig.hasOwnProperty('scale') && customConfig.scale.hasOwnProperty('start')) ? customConfig.scale.start : coinShowerConfig.scale.start;
    newConfig.scale.end = (customConfig.hasOwnProperty('scale') && customConfig.scale.hasOwnProperty('end')) ? customConfig.scale.end : coinShowerConfig.scale.end;
    newConfig.scale.minimumScaleMultiplier = (customConfig.hasOwnProperty('scale') && customConfig.scale.hasOwnProperty('minimumScaleMultiplier')) ? customConfig.scale.minimumScaleMultiplier : coinShowerConfig.speed.minimumScaleMultiplier;

    newConfig.alpha.start = (customConfig.hasOwnProperty('alpha') && customConfig.alpha.hasOwnProperty('start')) ? customConfig.alpha.start : coinShowerConfig.alpha.start;
    newConfig.alpha.end = (customConfig.hasOwnProperty('alpha') && customConfig.alpha.hasOwnProperty('end')) ? customConfig.alpha.end : coinShowerConfig.alpha.end;

    newConfig.color.start = (customConfig.hasOwnProperty('color') && customConfig.color.hasOwnProperty('start')) ? customConfig.color.start : coinShowerConfig.color.start;
    newConfig.color.end = (customConfig.hasOwnProperty('color') && customConfig.color.hasOwnProperty('end')) ? customConfig.color.end : coinShowerConfig.color.end;

    newConfig.startRotation.min = (customConfig.hasOwnProperty('startRotation') && customConfig.startRotation.hasOwnProperty('min')) ? customConfig.startRotation.min : coinShowerConfig.startRotation.min;
    newConfig.startRotation.max = (customConfig.hasOwnProperty('startRotation') && customConfig.startRotation.hasOwnProperty('max')) ? customConfig.startRotation.max : coinShowerConfig.startRotation.max;

    newConfig.rotationSpeed.min = (customConfig.hasOwnProperty('rotationSpeed') && customConfig.rotationSpeed.hasOwnProperty('min')) ? customConfig.rotationSpeed.min : coinShowerConfig.rotationSpeed.min;
    newConfig.rotationSpeed.max = (customConfig.hasOwnProperty('rotationSpeed') && customConfig.rotationSpeed.hasOwnProperty('max')) ? customConfig.rotationSpeed.max : coinShowerConfig.rotationSpeed.max;

    newConfig.lifetime.min = (customConfig.hasOwnProperty('lifetime') && customConfig.lifetime.hasOwnProperty('min')) ? customConfig.lifetime.min : coinShowerConfig.lifetime.min;
    newConfig.lifetime.max = (customConfig.hasOwnProperty('lifetime') && customConfig.lifetime.hasOwnProperty('max')) ? customConfig.lifetime.max : coinShowerConfig.lifetime.max;

    newConfig.acceleration.x = (customConfig.hasOwnProperty('acceleration') && customConfig.acceleration.hasOwnProperty('x')) ? customConfig.acceleration.x : coinShowerConfig.acceleration.x;
    newConfig.acceleration.y = (customConfig.hasOwnProperty('acceleration') && customConfig.acceleration.hasOwnProperty('y')) ? customConfig.acceleration.y : coinShowerConfig.acceleration.y;

    newConfig.pos.x = (customConfig.hasOwnProperty('pos') && customConfig.pos.hasOwnProperty('x')) ? customConfig.pos.x : coinShowerConfig.pos.x;
    newConfig.pos.y = (customConfig.hasOwnProperty('pos') && customConfig.pos.hasOwnProperty('y')) ? customConfig.pos.y : coinShowerConfig.pos.y;

    // We need to also stipulate the orientation specific spawnRect
    newConfig.spawnRect = {};
    newConfig.spawnRect.x = (customConfig.hasOwnProperty('spawnRect') && customConfig.spawnRect.hasOwnProperty('x')) ? customConfig.spawnRect.x : defaultSpawnRect[inOrientation].x;
    newConfig.spawnRect.y = (customConfig.hasOwnProperty('spawnRect') && customConfig.spawnRect.hasOwnProperty('y')) ? customConfig.spawnRect.y : defaultSpawnRect[inOrientation].y;
    newConfig.spawnRect.w = (customConfig.hasOwnProperty('spawnRect') && customConfig.spawnRect.hasOwnProperty('w')) ? customConfig.spawnRect.w : defaultSpawnRect[inOrientation].w;
    newConfig.spawnRect.h = (customConfig.hasOwnProperty('spawnRect') && customConfig.spawnRect.hasOwnProperty('h')) ? customConfig.spawnRect.h : defaultSpawnRect[inOrientation].h;

    // Init emitters with the new config
    return newConfig;
  }

  function show(inVal){
    if (gameConfig.showResultScreen && meterData.totalWin > 0 && gameConfig.resultParticleMode !== 0){
      toggleCoinShower(inVal);
    }
  }

  function toggleCoinShower(inVal){
    if (!_containerPortrait || !_containerLandscape){return;}
    //run all emitters
    if (_containerPortrait.emitter && _containerLandscape.emitter){
      _containerPortrait.emitter.emit = inVal;
      _containerLandscape.emitter.emit = inVal;
    }    
  }

  function updatePositioning(){
    if (!_container){return;}
    _containerLandscape.visible = orientation.get() === 'landscape';
    _containerPortrait.visible = orientation.get() === 'portrait';
  }

  msgBus.subscribe('GameSize.OrientationChange', updatePositioning);

  return {
    init,
    show,
    setProps
  };
});
