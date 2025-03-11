define(function module() {

  /*
    Okay, so that the game is reproducible, we cannot simply run this off a randomiser

    Therefore... maths.

    Calculation:
  
    1. Add all the winning numbers together
    2. Perform this value mod 7 to return a value between 0 and 6

    If this is a losing play, do the following:

    0 = L,W,L,L
    1 = L,L,W,L
    2 = W,L,W,L,L
    3 = L,W,W,L,L
    4 = L,W,L,W,L
    5 = W,L,L,W,L
    6 = L,L,W,W,L
  */
  function getScenario(data){
    var outArr = [];
    //if this is a losing play - ticketInfo = 0
    if (data.ticketInfo.bonusString === "0"){
      outArr = generateLoser(data.total);
    }else if (data.ticketInfo.bonusString === "4"){
      outArr = generateIW4(data.total);
    }else if (data.ticketInfo.bonusString === "3"){
      outArr = generateIW3(data.total);
    }else if (data.ticketInfo.bonusString === "2"){
      outArr = generateIW2(data.total);
    }else if (data.ticketInfo.bonusString === "1"){
      outArr = generateIW1(data.total);
    }else{
      //cannot happen, or if it does, something has gone horribly wrong
    }
    return outArr;
  }

  //IW1 is the only one we can have variable length scenarios
  //if the player reaches IW1 the bonus game simply ends
  //so we can have a few where the player reveals one loser (3)
  //a few where the player reveals two losers (6)
  //and a couple where the player reveals 6 wins straight (1)
  function generateIW1(winningTotal){
    var valueMod = winningTotal % 10; //this returns a value between 0 and 9
    var outVal;
    //losing play
    switch (valueMod){
      case 0:
        outVal = ['1','1','0','1','1','1','1'];
        break;
      case 1:
        outVal = ['1','1','0','1','1','1','1'];
        break;
      case 2:
        outVal = ['1','1','1','1','0','1','1'];
        break;
      case 3:
        outVal = ['1','0','1','0','1','1','1','1'];
        break;
      case 4:
        outVal = ['0','1','1','0','1','1','1','1'];
        break;
      case 5:
        outVal = ['1','1','1','1','1','0','0','1'];
        break;
      case 6:
        outVal = ['0','1','1','1','1','0','1','1'];
        break;
      case 7:
        outVal = ['1','0','0','1','1','1','1','1'];
        break;
      case 8:
        outVal = ['1','1','1','0','1','0','1','1'];
        break;
      case 9:
        outVal = ['1','1','1','1','1','1'];
        break;
    }

    return outVal;
  }

  function generateIW2(winningTotal){
    var valueMod = winningTotal % 10; //this returns a value between 0 and 9
    var outVal;
    //losing play
    switch (valueMod){
      case 0:
        outVal = ['1','1','1','1','0','0','1','0'];
        break;
      case 1:
        outVal = ['0','1','1','0','1','1','1','0'];
        break;
      case 2:
        outVal = ['1','1','1','0','0','1','1','0'];
        break;
      case 3:
        outVal = ['1','1','1','1','0','1','0','0'];
        break;
      case 4:
        outVal = ['1','0','1','1','1','1','0','0'];
        break;
      case 5:
        outVal = ['1','1','0','1','1','1','0','0'];
        break;
      case 6:
        outVal = ['0','1','1','1','0','1','1','0'];
        break;
      case 7:
        outVal = ['1','1','0','0','1','1','1','0'];
        break;
      case 8:
        outVal = ['0','0','1','1','1','1','1','0'];
        break;
      case 9:
        outVal = ['1','1','1','0','1','1','0','0'];
        break;
    }

    return outVal;
  }

  function generateIW3(winningTotal){
    var valueMod = winningTotal % 10; //this returns a value between 0 and 13
    var outVal;
    //losing play
    switch (valueMod){
      case 0:
        outVal = ['1','0','0','1','1','1','0'];
        break;
      case 1:
        outVal = ['0','1','1','1','0','1','0'];
        break;
      case 2:
        outVal = ['1','1','1','0','0','1','0'];
        break;
      case 3:
        outVal = ['1','0','1','1','0','1','0'];
        break;
      case 4:
        outVal = ['1','1','1','0','1','0','0'];
        break;
      case 5:
        outVal = ['1','1','0','0','1','1','0'];
        break;
      case 6:
        outVal = ['1','0','1','0','1','1','0'];
        break;
      case 7:
        outVal = ['1','1','0','1','1','0','0'];
        break;
      case 8:
        outVal = ['1','1','0','1','0','1','0'];
        break;
      case 9:
        outVal = ['0','0','1','1','1','1','0'];
        break;
    }

    return outVal;
  }

  function generateIW4(winningTotal){
    var valueMod = winningTotal % 10; //this returns a value between 0 and 9
    var outVal;
    //losing play
    switch (valueMod){
      case 0:
        outVal = ['1','0','1','0','1','0'];
        break;
      case 1:
        outVal = ['0','1','0','1','1','0'];
        break;
      case 2:
        outVal = ['0','1','1','1','0','0'];
        break;
      case 3:
        outVal = ['0','1','1','0','1','0'];
        break;
      case 4:
        outVal = ['1','1','1','0','0','0'];
        break;
      case 5:
        outVal = ['1','0','0','1','1','0'];
        break;
      case 6:
        outVal = ['0','0','1','1','1','0'];
        break;
      case 7:
        outVal = ['1','1','0','1','0','0'];
        break;
      case 8:
        outVal = ['1','1','0','0','1','0'];
        break;
      case 9:
        outVal = ['1','0','1','1','0','0'];
        break;
    }

    return outVal;
  }

  function generateLoser(winningTotal){
    var valueMod = winningTotal % 7; //this returns a value between 0 and 6
    var outVal;
    //losing play
    switch (valueMod){
      case 0:
        outVal = ['0','1','0','0'];
        break;
      case 1:
        outVal = ['0','0','1','0'];
        break;
      case 2:
        outVal = ['1','0','1','0','0'];
        break;
      case 3:
        outVal = ['0','1','1','0','0'];
        break;
      case 4:
        outVal = ['0','1','0','1','0'];
        break;
      case 5:
        outVal = ['1','0','0','1','0'];
        break;
      case 6:
        outVal = ['0','0','1','1','0'];
        break;
    }

    return outVal;
  }

  function generateRevealAllOrder(inSeed, inRevealed){
    var valueMod = inSeed % 10; //value between 0 and 9
    var outVal;
    switch (valueMod){
      case 0:
        outVal = [12,4,8,2,9,10,11,5,3,6,7,1];
        break;
      case 1:
        outVal = [11,4,7,12,3,6,2,5,9,10,8,1];
        break;
      case 2:
        outVal = [5,10,11,4,9,12,6,3,1,2,7,8];
        break;
      case 3:
        outVal = [9,4,5,7,11,12,2,1,8,6,10,3];
        break;
      case 4:
        outVal = [7,3,5,12,11,8,9,4,10,2,6,1];
        break;
      case 5:
        outVal = [10,6,12,1,9,11,5,2,8,7,4,3];
        break;
      case 6:
        outVal = [2,3,9,5,8,11,7,10,12,1,6,4];
        break;
      case 7:
        outVal = [5,11,9,8,3,2,7,12,1,4,6,10];
        break;
      case 8:
        outVal = [1,5,10,7,3,8,4,12,6,11,2,9];
        break;
      case 9:
        outVal = [6,10,4,7,5,9,1,2,3,12,8,11];
        break;
    }

    //now then, step through and remove ones that have already been revealed
    //this is so that if the player hits Reveal All while in this stage, we can continue as normal
    var removedArr = [];
    var i;
    for (i = 0; i < outVal.length; i++){
      if (inRevealed.indexOf(outVal[i]) < 0){
        removedArr.push(outVal[i]);
      }
    }

    return removedArr;
  }

  return {
    generateLoser:generateLoser,
    generateIW4:generateIW4,
    generateIW3:generateIW3,
    generateIW2:generateIW2,
    generateIW1:generateIW1,
    generateRevealAllOrder:generateRevealAllOrder,
    getScenario:getScenario
  };
});
