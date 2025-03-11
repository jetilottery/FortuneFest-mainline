define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  const _state = {
    player: []
  };

  function reset() {
    _state.player = [];
  }

  msgBus.subscribe('Game.PlayerSymbol', sym => _state.player.push(sym));

  return {
    get player() {
      return _state.player;
    },
    reset
  };
});