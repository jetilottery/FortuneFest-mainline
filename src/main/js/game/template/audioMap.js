define({
    // IMPLEMENT: Map SFX to channels

    /* 
     * If audio assets are named nicely you can do:
     * {
     *  fileName: channelNumber
     * }
     * 
     * Otherwise use a nice name for the keys and include the filename and channel as an array:
     * {
     *  soundName: ['Ugly_sound_file_V2-final', channelNumber]
     * }
     */

    music: ['BackgroundMusicLoop', 0],
    bonusMusic: ['BonusMusicLoop', 0],
    winTerminator: ['BackgroundMusicTerm_WIN', 1],
    loseTerminator: ['BackgroundMusicTerm_LOSE', 1],
    click: ['Click', 4],
    costDown: ['BetDown', 1],
    costUp: ['BetUp', 2],
    buy: ['BuyButton', 2],
    costMax: ['BetMax', 3],
    /*
     * Audio groups
     * A game can include multiple variations of each of these sounds. Ensure each variation starts
     * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
     * item in the group will be used.
     */

    transition : ['Transition', 11],
    bonusTriggered : ['BonusTriggered', 10],
    bonusTransition : ['BonusTransition', 9],
    bonusRevealEnd : ['BonusRevealEnd', 8],

    autoReveaLuckyNumber : ['LuckyNumberAutoReveal', 2],
    autoRevealYourNumberSelect : ['YourNumberSelect_RevealAll', 11],

    coinFlip: ['CoinFlip',3],
    goldCoinReveal: ['GoldCoinReveal',4],

    prizeWin: ['PrizeWin',10],
    InstantWin20x_1 : ['InstantWin20x',1],
    InstantWin20x_2 : ['InstantWin20x',5],
    InstantWin20x_3 : ['InstantWin20x',6],
    numberMatch_1 : ['NumberMatch',8],
    numberMatch_2 : ['NumberMatch',12],
    numberMatch_3 : ['NumberMatch',13],

    megamatchRevealAll: ['MegamatchRevealAll',9],
    megamatch3Multipliers: ['Megamatch3Multipliers',8],
    megamatchTileFlip : ['MegamatchTileFlip',1],

    spin:['Spin',5],
    spinButton:['SpinButton',6],
    spinStop:['SpinStop',7],
    spinStopCollect:['SpinStopCollect',12],

    totalBonusWin:['TotalBonusWin',13],

    yourNumberSelect_1 : ['YourNumberSelect_1',5],
    yourNumberSelect_2 : ['YourNumberSelect_2',6],
    yourNumberSelect_3 : ['YourNumberSelect_3',7],
    yourNumberSelect_4 : ['YourNumberSelect_4',8],
    yourNumberSelect_5 : ['YourNumberSelect_5',9],

    LuckyNumberSelect_1: ['LuckyNumberSelect_1',1],
    LuckyNumberSelect_2: ['LuckyNumberSelect_2',2],
    LuckyNumberSelect_3: ['LuckyNumberSelect_3',3],
    LuckyNumberSelect_4: ['LuckyNumberSelect_4',4],
    LuckyNumberSelect_5: ['LuckyNumberSelect_5',10],

    /*
     * Optional audio
     * The following audio is optional and will be ignored if not included
     */

    //  buy: ['BuyButton', 4],
    //  revealAll: ['RevealAllButton', 4],
});
