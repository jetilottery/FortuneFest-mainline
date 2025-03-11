define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  const _state = {
    winning: [],
    player: []
  };

  function reset() {
    _state.winning = [];
    _state.player = [];
  }

  msgBus.subscribe('Game.WinningPickPoint', number => _state.winning.push(number));
  msgBus.subscribe('Game.PlayerPickPoint', number => _state.player.push(number));

  return {
    get winning() {
      return _state.winning;
    },
    get player() {
      return _state.player;
    },
    reset
  };
});