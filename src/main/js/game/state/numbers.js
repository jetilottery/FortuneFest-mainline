define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  const _state = {
    winning: [],
    player: [],
    bonus: 0
  };

  function reset() {
    _state.winning = [];
    _state.player = [];
    _state.bonus = 0;
  }

  msgBus.subscribe('Game.WinningNumber', number => _state.winning.push(number));
  msgBus.subscribe('Game.PlayerNumber', number => _state.player.push(number));
  msgBus.subscribe('Game.TotalBonus', numBonus => _state.bonus=numBonus);

  return {
    get winning() {
      return _state.winning;
    },
    get player() {
      return _state.player;
    },
    get bonus() {
      return _state.bonus;
    },
    reset
  };
});