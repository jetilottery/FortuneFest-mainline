define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

  const _revealing = {
    winning: [],
    player: [],
    bonus: []
  };

  const _mouseover = {
    winning: [],
    player: [],
    bonus: []
  };

  function reset() {
    _revealing.winning = [];
    _mouseover.winning = [];
    _revealing.player = [];
    _mouseover.player = [];
    _revealing.bonus = [];
    _mouseover.bonus = [];
  }

  function remove(inArr, card) {
    for (var j = 0; j < inArr.length; j++){
      if (card == inArr[j]){
        inArr.splice(j,1);
      }
    }
  }

  msgBus.subscribe('Game.WinningAnimating', card => _revealing.winning.push(card));
  msgBus.subscribe('Game.PlayerAnimating', card => _revealing.player.push(card));
  msgBus.subscribe('Game.BonusAnimating', card => _revealing.bonus.push(card));
  msgBus.subscribe('Game.WinningAnimated', card => remove(_revealing.winning, card));
  msgBus.subscribe('Game.PlayerAnimated', card => remove(_revealing.player, card));
  msgBus.subscribe('Game.BonusAnimated', card => remove(_revealing.bonus, card));

  msgBus.subscribe('Game.WinningOver', card => _mouseover.winning.push(card));
  msgBus.subscribe('Game.PlayerOver', card => _mouseover.player.push(card));
  msgBus.subscribe('Game.BonusOver', card => _mouseover.bonus.push(card));
  msgBus.subscribe('Game.WinningOut', card => remove(_mouseover.winning, card));
  msgBus.subscribe('Game.PlayerOut', card => remove(_mouseover.player, card));
  msgBus.subscribe('Game.BonusOut', card => remove(_mouseover.bonus, card));

  return {
    get winning() {
      return _revealing.winning;
    },
    get player() {
      return _revealing.player;
    },
    get bonus() {
      return _revealing.bonus;
    },
    get winningOver() {
      return _mouseover.winning;
    },
    get playerOver() {
      return _mouseover.player;
    },
    get bonusOver() {
      return _mouseover.bonus;
    },
    reset
  };
});