define(['skbJet/component/resourceLoader/resourceLib', 'skbJet/componentManchester/standardIW/splash/splashLoadController'], function(
  resLib,
  splashLoadController
) {
  var loaderContainer = document.querySelector('.loader');
  var progress = document.querySelector('.progress');
  var copyright = document.querySelector('.copyright');
  var container = document.querySelector('.container');

  var softId = window.location.search.match(/&?softwareid=(\d+.\d+.\d+)?/);
  var isSKB = softId && (softId[1].split('-')[2].charAt(0) !== '0');

  var bgSrc = '';

  function onMessage(msg) {
    if (msg.data && msg.data.loaded) {
      progress.textContent = msg.data.loaded + '%';
    }
  }

  function onResize() {
    var bgImg =
      window.innerWidth > window.innerHeight
        ? resLib.splash.landscape_loaderBackground
        : resLib.splash.portrait_loaderBackground;
    
    if (bgImg.src !== bgSrc) {
      bgSrc = bgImg.src;
      document.body.style.backgroundImage = 'url(' + bgSrc + ')';
    }

    var scale = 1;
    var wR = window.innerWidth / window.innerHeight;
    var splashR = bgImg.width / bgImg.height;

    if (wR > splashR) {
      scale = window.innerHeight / bgImg.height;
    } else {
      scale = window.innerWidth / bgImg.width;
    }
    
    container.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
  }

  function onLoadSplashDone() {
    var assetPack = window.location.search.match(/&?assetPack=(\w+)&?/)[1];

    if (assetPack === 'mobile'){
      copyright.style.fontSize = '1.5em'; 
    }
    
    copyright.textContent = isSKB ? resLib.i18n.splash.splashScreen.footer.shortVersion : '';

    loaderContainer.appendChild(resLib.splash.loaderImage);
    resLib.splash.loaderImage.className = 'loaderImage';

    onResize();
    
    document.body.classList.add('loaded');
    window.addEventListener('resize', onResize);
    progress.textContent = '0%';
    splashLoadController.loadGame();
  }

  function init() {
    window.addEventListener('message', onMessage, false);
    splashLoadController.loadSplash(onLoadSplashDone);
  }

  init();
  return {};
});
