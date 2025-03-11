"use strict";

define({
    _BASE_APP: {
        children: ['background', 'baseGame', 'bonusGame', 'wheelGame', 'extraUI', 'transition']
    },
    baseGame: {
        children: ['ticketMultiplierContainer', 'totalCostContainer', 'logo', 'winUpTo', 'numberContainer', 'infoContainer', 'ticketMultiplierPositionStandard', 'ticketMultiplierPositionSingle']
    },

    /*
     * BACKGROUND
     */
    background: {
        type: 'container',
        children: ['animatedBackground', 'backgroundFilterOverlay', 'backgroundOverlay']
    },
    backgroundOverlay: {
        type: 'container'
    },
    backgroundFilterOverlay: {
        type: 'rectangle',
        fill: '0x000000',
        fillAlpha: 0.5,
        landscape: {
            width: 1440,
            height: 810
        },
        portrait: {
            width: 810,
            height: 1440
        }
    },

    /*
     * GAME SETUP ELEMENTS
     */
    overlay: {
        type: 'sprite',
        landscape: {
            texture: 'baseLightLandscape'
        },
        portrait: {
            texture: 'baseLightPortrait'
        }
    },
    animatedBackground: {
        type: 'container',
        x: 800,
        landscape: {
            y: 470
        },
        portrait: {
            y: 630
        }
    },
    logo: {
        type: 'sprite',
        children: ['logoLightContainer', 'logoText'],
        anchor: 0.5,
        landscape: {
            x: 1110,
            y: 165,
            scale: 1,
            texture: 'landscape_gameLogoBase'
        },
        portrait: {
            x: 245,
            y: 148,
            scale: 0.85,
            texture: 'landscape_gameLogoBase'
        }
    },
    logoText: {
        type: 'sprite',
        anchor: 0.5,
        y: -9,
        texture: 'landscape_gameLogo'
    },
    logoLightContainer: {
        type: 'container'
    },

    /*
     * WIN UP TO
     */
    winUpTo: {
        type: 'container',
        children: ['winUpToContainer'],
        landscape: {
            x: 1100,
            y: 312,
            scale: 1
        },
        portrait: {
            x: 605,
            y: 160,
            scale: 1.4
        }
    },
    winUpToContainer: {
        type: 'container',
        children: ['winUpToIn', 'winUpToOut']
    },
    winUpToIn: {
        type: 'sprite',
        anchor: 0.5,
        children: ['winUpToInTextShadow', 'winUpToInValueShadow', 'winUpToInText', 'winUpToInValue']
    },
    winUpToInText: {
        type: 'text',
        style: 'winUpToText',
        string: 'winUpToText',
        anchor: 0.5,
        scale: 1,
        maxWidth: 230
    },
    winUpToInTextShadow: {
        type: 'text',
        style: 'winUpToTextShadow',
        string: 'winUpToText',
        anchor: 0.5,
        scale: 1,
        y: 5,
        maxWidth: 230
    },
    winUpToInValue: {
        type: 'text',
        style: 'winUpToValue',
        anchor: 0.5,
        scale: 1,
        maxWidth: 500
    },
    winUpToInValueShadow: {
        type: 'text',
        style: 'winUpToValueShadow',
        anchor: 0.5,
        scale: 1,
        y: 5,
        maxWidth: 500
    },
    winUpToOut: {
        type: 'sprite',
        anchor: 0.5,
        children: ['winUpToOutTextShadow', 'winUpToOutValueShadow', 'winUpToOutText', 'winUpToOutValue']
    },
    winUpToOutText: {
        type: 'text',
        style: 'winUpToText',
        string: 'winUpToText',
        anchor: 0.5,
        maxWidth: 230,
        scale: 1
    },
    winUpToOutTextShadow: {
        type: 'text',
        style: 'winUpToTextShadow',
        string: 'winUpToText',
        anchor: 0.5,
        maxWidth: 230,
        y: 5,
        scale: 1
    },
    winUpToOutValueShadow: {
        type: 'text',
        style: 'winUpToValue',
        anchor: 0.5,
        scale: 1,
        y: 5,
        maxWidth: 500
    },
    winUpToOutValue: {
        type: 'text',
        style: 'winUpToValueShadow',
        anchor: 0.5,
        scale: 1,
        maxWidth: 500
    },

    /*
     * BASEGAME UI ELEMENTS
     */
    ticketMultiplierPositionStandard: {
        type: 'point',
        landscape: {
            x: 1104,
            y: 410
        },
        portrait: {
            x: 206,
            y: 1087
        }
    },
    ticketMultiplierPositionSingle: {
        type: 'point',
        landscape: {
            x: 1104,
            y: 450
        },
        portrait: {
            x: 405,
            y: 1087
        }
    },
    ticketMultiplierContainer: {
        type: 'container',
        children: ['ticketMultiplierBackground', 'ticketMultiplierHeader', 'ticketMultiplierValue', 'ticketMultiplierDownButton', 'ticketMultiplierUpButton', 'ticketMultiplierIndicatorContainer']
    },
    ticketMultiplierHeader: {
        type: 'text',
        style: 'ticketSelectCostHeader',
        string: "tickets",
        anchor: 0.5,
        landscape: {
            y: -38,
            maxWidth: 260
        },
        portrait: {
            y: -38,
            maxWidth: 160
        }
    },
    ticketMultiplierValue: {
        type: 'text',
        style: 'ticketSelectCostValue',
        anchor: 0.5,
        landscape: {
            y: 0
        },
        portrait: {
            y: -3
        },
        maxWidth: 160
    },
    ticketMultiplierDownButton: {
        type: 'button',
        portrait: {
            x: -132,
            scale: 1
        },
        landscape: {
            x: -192,
            scale: 0.8
        },
        textures: {
            enabled: 'minusButtonEnabled',
            disabled: 'minusButtonDisabled',
            over: 'minusButtonOver',
            pressed: 'minusButtonPressed'
        }
    },
    ticketMultiplierUpButton: {
        type: 'button',
        portrait: {
            x: 138,
            scale: 1
        },
        landscape: {
            x: 190,
            scale: 0.8
        },
        textures: {
            enabled: 'plusButtonEnabled',
            disabled: 'plusButtonDisabled',
            over: 'plusButtonOver',
            pressed: 'plusButtonPressed'
        }
    },
    ticketMultiplierBackground: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'totalCostBaseLandscape'
        },
        portrait: {
            texture: 'ticketsTicketCostBasePortrait'
        }
    },
    ticketMultiplierIndicatorContainer: {
        type: 'container',
        landscape: {
            y: 20
        },
        portrait: {
            y: 20
        }
    },
    totalCostContainer: {
        type: 'container',
        landscape: {
            x: 1104,
            y: 610
        },
        portrait: {
            x: 405,
            y: 1196
        },
        children: ['totalCostBackground', 'totalCostHeader', 'totalCostValue']
    },
    totalCostHeader: {
        type: 'text',
        style: 'ticketSelectCostHeader',
        string: "totalCost",
        anchor: 0.5,
        landscape: {
            y: -36
        },
        portrait: {
            y: -38
        },
        maxWidth: 260
    },
    totalCostValue: {
        type: 'text',
        style: 'ticketSelectCostValue',
        portrait: {
            y: 0
        },
        landscape: {
            y: 2
        },
        anchor: 0.5,
        maxWidth: 300
    },
    totalCostBackground: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'totalCostBaseLandscape'
        },
        portrait: {
            texture: 'totalCostBasePortrait'
        }
    },
    infoContainer: {
        type: 'container',
        children: ['infoBackground', 'infoText', 'infoSprite'],
        landscape: {
            x: 240,
            y: 680
        },
        portrait: {
            x: 240,
            y: 945
        }
    },
    infoBackground: {
        type: 'sprite',
        anchor: 0.5,
        x: 200,
        y: 27,
        texture: 'bonusGameTriggerBasePortrait',
        scale: {
            x: 0.8,
            y: 1
        }
    },
    infoText: {
        type: 'text',
        string: "baseGameInfo",
        style: "infoText",
        x: -60,
        y: 1
    },
    infoSprite: {
        type: 'sprite',
        texture: 'bonusTriggermysteryBox',
        anchor: 0.5,
        x: -130,
        y: 23
    },

    /*
     * BASEGAME GAMEPLAY ELEMENTS
     */
    numberContainer: {
        type: 'container',
        children: ['luckyNumbersHeader', 'luckyNumberEffects', 'yourNumberEffects', 'luckyNumbers', 'yourNumbers'],
        landscape: {
            scale: 1,
            x: 0,
            y: 0
        },
        portrait: {
            scale: 1.2,
            x: -85,
            y: -60
        }
    },
    luckyNumbersHeader: {
        type: 'container',
        children: ['luckyNumbersHeaderBackground', 'luckyNumbersHeaderTitle', 'yourNumbersHeaderTitle'],
        landscape: {
            x: 460,
            y: 230
        },
        portrait: {
            x: 405,
            y: 390
        },
        scale: 0.8
    },
    luckyNumbersHeaderBackground: {
        type: 'sprite',
        texture: 'luckyBasePortrait',
        anchor: 0.5,
        y: -90
    },
    luckyNumbersHeaderTitle: {
        type: 'text',
        string: 'luckyNumbers',
        style: "ticketSelectCostHeader",
        anchor: 0.5,
        y: -172,
        scale: 1.2,
        maxWidth: 500
    },
    yourNumbersHeaderTitle: {
        type: 'text',
        string: 'yourNumbers',
        style: "ticketSelectCostHeader",
        anchor: 0.5,
        y: -20,
        scale: 1.2,
        maxWidth: 500
    },
    luckyNumbers: {
        type: 'container',
        children: ['luckyNumber_1', 'luckyNumber_2', 'luckyNumber_3', 'luckyNumber_4', 'luckyNumber_5'],
        landscape: {
            x: -15,
            y: -55
        },
        portrait: {
            x: -70,
            y: 100
        },
        scale: 1.05
    },
    luckyNumber_1: {
        type: 'container',
        x: 220,
        y: 200,
        scale: 0.9
    },
    luckyNumber_2: {
        type: 'container',
        x: 335,
        y: 200,
        scale: 0.9
    },
    luckyNumber_3: {
        type: 'container',
        x: 450,
        y: 200,
        scale: 0.9
    },
    luckyNumber_4: {
        type: 'container',
        x: 565,
        y: 200,
        scale: 0.9
    },
    luckyNumber_5: {
        type: 'container',
        x: 680,
        y: 200,
        scale: 0.9
    },
    yourNumbers: {
        type: 'container',
        children: ['yourNumber_1', 'yourNumber_2', 'yourNumber_3', 'yourNumber_4', 'yourNumber_5', 'yourNumber_6', 'yourNumber_7', 'yourNumber_8', 'yourNumber_9', 'yourNumber_10', 'yourNumber_11', 'yourNumber_12', 'yourNumber_13', 'yourNumber_14', 'yourNumber_15', 'yourNumber_16', 'yourNumber_17', 'yourNumber_18', 'yourNumber_19', 'yourNumber_20'],
        landscape: {
            x: -35,
            y: -65
        },
        portrait: {
            x: -90,
            y: 100
        },
        scale: 1.1
    },
    yourNumber_1: {
        type: 'container',
        x: 220,
        y: 325
    },
    yourNumber_2: {
        type: 'container',
        x: 335,
        y: 325
    },
    yourNumber_3: {
        type: 'container',
        x: 450,
        y: 325
    },
    yourNumber_4: {
        type: 'container',
        x: 565,
        y: 325
    },
    yourNumber_5: {
        type: 'container',
        x: 680,
        y: 325
    },
    yourNumber_6: {
        type: 'container',
        x: 220,
        y: 415
    },
    yourNumber_7: {
        type: 'container',
        x: 335,
        y: 415
    },
    yourNumber_8: {
        type: 'container',
        x: 450,
        y: 415
    },
    yourNumber_9: {
        type: 'container',
        x: 565,
        y: 415
    },
    yourNumber_10: {
        type: 'container',
        x: 680,
        y: 415
    },
    yourNumber_11: {
        type: 'container',
        x: 220,
        y: 505
    },
    yourNumber_12: {
        type: 'container',
        x: 335,
        y: 505
    },
    yourNumber_13: {
        type: 'container',
        x: 450,
        y: 505
    },
    yourNumber_14: {
        type: 'container',
        x: 565,
        y: 505
    },
    yourNumber_15: {
        type: 'container',
        x: 680,
        y: 505
    },
    yourNumber_16: {
        type: 'container',
        x: 220,
        y: 595
    },
    yourNumber_17: {
        type: 'container',
        x: 335,
        y: 595
    },
    yourNumber_18: {
        type: 'container',
        x: 450,
        y: 595
    },
    yourNumber_19: {
        type: 'container',
        x: 565,
        y: 595
    },
    yourNumber_20: {
        type: 'container',
        x: 680,
        y: 595
    },
    luckyNumberEffects: {
        type: 'container',
        children: ['luckyNumberEffect_1', 'luckyNumberEffect_2', 'luckyNumberEffect_3', 'luckyNumberEffect_4', 'luckyNumberEffect_5'],
        landscape: {
            x: -52,
            y: -65
        },
        portrait: {
            x: -110,
            y: 95
        },
        scale: 1.1
    },
    luckyNumberEffect_1: {
        type: 'container',
        x: 210,
        y: 200
    },
    luckyNumberEffect_2: {
        type: 'container',
        x: 340,
        y: 200
    },
    luckyNumberEffect_3: {
        type: 'container',
        x: 470,
        y: 200
    },
    luckyNumberEffect_4: {
        type: 'container',
        x: 600,
        y: 200
    },
    luckyNumberEffect_5: {
        type: 'container',
        x: 730,
        y: 200
    },
    yourNumberEffects: {
        type: 'container',
        children: ['yourNumberEffect_1', 'yourNumberEffect_2', 'yourNumberEffect_3', 'yourNumberEffect_4', 'yourNumberEffect_5', 'yourNumberEffect_6', 'yourNumberEffect_7', 'yourNumberEffect_8', 'yourNumberEffect_9', 'yourNumberEffect_10', 'yourNumberEffect_11', 'yourNumberEffect_12', 'yourNumberEffect_13', 'yourNumberEffect_14', 'yourNumberEffect_15', 'yourNumberEffect_16', 'yourNumberEffect_17', 'yourNumberEffect_18', 'yourNumberEffect_19', 'yourNumberEffect_20'],
        landscape: {
            x: -52,
            y: -60
        },
        portrait: {
            x: -105,
            y: 105
        },
        scale: 1.1
    },
    yourNumberEffect_1: {
        type: 'container',
        x: 210,
        y: 325
    },
    yourNumberEffect_2: {
        type: 'container',
        x: 340,
        y: 325
    },
    yourNumberEffect_3: {
        type: 'container',
        x: 470,
        y: 325
    },
    yourNumberEffect_4: {
        type: 'container',
        x: 600,
        y: 325
    },
    yourNumberEffect_5: {
        type: 'container',
        x: 730,
        y: 325
    },
    yourNumberEffect_6: {
        type: 'container',
        x: 210,
        y: 415
    },
    yourNumberEffect_7: {
        type: 'container',
        x: 340,
        y: 415
    },
    yourNumberEffect_8: {
        type: 'container',
        x: 470,
        y: 415
    },
    yourNumberEffect_9: {
        type: 'container',
        x: 600,
        y: 415
    },
    yourNumberEffect_10: {
        type: 'container',
        x: 730,
        y: 415
    },
    yourNumberEffect_11: {
        type: 'container',
        x: 210,
        y: 505
    },
    yourNumberEffect_12: {
        type: 'container',
        x: 340,
        y: 505
    },
    yourNumberEffect_13: {
        type: 'container',
        x: 470,
        y: 505
    },
    yourNumberEffect_14: {
        type: 'container',
        x: 600,
        y: 505
    },
    yourNumberEffect_15: {
        type: 'container',
        x: 730,
        y: 505
    },
    yourNumberEffect_16: {
        type: 'container',
        x: 210,
        y: 595
    },
    yourNumberEffect_17: {
        type: 'container',
        x: 340,
        y: 595
    },
    yourNumberEffect_18: {
        type: 'container',
        x: 470,
        y: 595
    },
    yourNumberEffect_19: {
        type: 'container',
        x: 600,
        y: 595
    },
    yourNumberEffect_20: {
        type: 'container',
        x: 730,
        y: 595
    },

    /*
     *  BONUS ELEMENTS
     */
    bonusGame: {
        type: 'container',
        children: ['bonusBackgroundOverlay', 'bonusGameUIElements', 'bonusGameGameplayElements']
    },
    bonusBackgroundOverlay: {
        type: 'rectangle',
        fill: '0x001c4a',
        fillAlpha: 0.4,
        landscape: {
            width: 1440,
            height: 810
        },
        portrait: {
            width: 810,
            height: 1440
        }
    },
    bonusGameUIElements: {
        type: 'container',
        children: ['bonusGameHeader', 'bonusGameTicketCostMeter', 'bonusGameMultiplierMeter', 'bonusGameTotalBonusWinMeter', 'bonusAutoPlayButton']
    },
    bonusGameGameplayElements: {
        type: 'container',
        children: ['bonusGameRowContainer', 'bonusGameNumberContainer'],
        landscape: {
            x: 30,
            y: 0,
            scale: 1
        },
        portrait: {
            x: -230,
            y: 360,
            scale: 0.9
        }
    },

    /*
     * BONUS UI ELEMENTS
     */
    bonusGameTicketCostMeter: {
        type: 'container',
        children: ['bonusGameTicketCostMeterBackground', 'bonusGameTicketCostMeterLabel', 'bonusGameTicketCostMeterValue'],
        landscape: {
            x: 250,
            y: 140
        },
        portrait: {
            x: 170,
            y: 390
        }
    },
    bonusGameTicketCostMeterBackground: {
        type: 'sprite',
        landscape: {
            texture: 'bonusGameTriggerBasePortraitSmall',
            x: 0
        },
        portrait: {
            texture: 'bonusGameTriggerBasePortrait',
            x: 230
        },
        anchor: 0.5
    },
    bonusGameTicketCostMeterLabel: {
        type: 'text',
        string: 'ticketSelect_ticketCost',
        style: "ticketSelectCostHeader",
        anchor: 0.5,
        landscape: {
            x: -60,
            y: -40
        },
        portrait: {
            x: 0,
            y: -45
        },
        maxWidth: 200
    },
    bonusGameTicketCostMeterValue: {
        type: 'text',
        style: "ticketSelectCostValue",
        anchor: 0.5,
        portrait: {
            x: 0
        },
        landscape: {
            x: -60
        },
        maxWidth: 120
    },
    bonusGameMultiplierMeter: {
        type: 'container',
        children: ['bonusGameMultiplierMeterBackground', 'bonusGameMultiplierMeterLabel', 'bonusGameMultiplierMeterValue', 'bonusGameMultiplierMeterValueEcho'],
        landscape: {
            x: 230,
            y: 140
        },
        portrait: {
            x: 405,
            y: 390
        }
    },
    bonusGameMultiplierMeterBackground: {
        type: 'sprite',
        anchor: 0.5
    },
    bonusGameMultiplierMeterLabel: {
        type: 'text',
        style: "ticketSelectCostHeader",
        string: 'multiplier',
        anchor: 0.5,
        landscape: {
            x: 90,
            y: -40
        },
        portrait: {
            x: 0,
            y: -45
        },
        maxWidth: 200
    },
    bonusGameMultiplierMeterValue: {
        type: 'text',
        style: "ticketSelectCostValue",
        anchor: 0.5,
        landscape: {
            x: 90
        },
        portrait: {
            x: 0
        },
        maxWidth: 250
    },
    bonusGameMultiplierMeterValueEcho: {
        type: 'text',
        style: "ticketSelectCostValue",
        anchor: 0.5,
        landscape: {
            x: 90
        },
        portrait: {
            x: 0
        },
        maxWidth: 250
    },
    bonusGameTotalBonusWinMeter: {
        type: 'container',
        children: ['bonusGameTotalBonusWinMeterBackground', 'bonusGameTotalBonusWinMeterLabel', 'bonusGameTotalBonusWinMeterValue', 'bonusGameTotalBonusWinMeterValueEcho'],
        landscape: {
            x: 1200,
            y: 140
        },
        portrait: {
            x: 650,
            y: 390
        }
    },
    bonusGameTotalBonusWinMeterBackground: {
        type: 'sprite',
        landscape: {
            texture: 'bonusGameTriggerBasePortraitSmall',
            alpha: 1
        },
        portrait: {
            alpha: 0
        },
        anchor: 0.5
    },
    bonusGameTotalBonusWinMeterLabel: {
        type: 'text',
        style: "ticketSelectCostHeader",
        string: 'bonusWin',
        anchor: 0.5,
        landscape: {
            y: -40
        },
        portrait: {
            y: -45
        },
        maxWidth: 200
    },
    bonusGameTotalBonusWinMeterValue: {
        type: 'text',
        style: "ticketSelectCostValue",
        anchor: 0.5,
        maxWidth: 250
    },
    bonusGameTotalBonusWinMeterValueEcho: {
        type: 'text',
        style: "ticketSelectCostValue",
        anchor: 0.5,
        maxWidth: 250
    },
    bonusGameHeader: {
        type: 'container',
        children: ['bonusGameTitle', 'bonusGameInfo'],
        landscape: {
            x: 720,
            y: 140
        },
        portrait: {
            x: 405,
            y: 210
        }
    },
    bonusGameTitle: {
        type: 'text',
        string: 'page2Title',
        style: 'HowToPlayTitle2',
        anchor: 0.5,
        y: -30,
        portrait: {
            maxWidth: 700
        },
        landscape: {
            maxWidth: 500
        }
    },
    bonusGameInfo: {
        type: 'text',
        string: 'bonusGameInfo',
        style: 'ticketSelectCostValue',
        anchor: 0.5,
        y: 20,
        portrait: {
            maxWidth: 700
        },
        landscape: {
            maxWidth: 500
        }
    },
    bonusAutoPlayButton: {
        portrait: {
            x: 405,
            y: 1297
        },
        landscape: {
            x: 720,
            y: 710
        },
        type: 'button',
        string: 'button_autoPlay',
        style: 'mainButtonEnabled',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },

    /*
     * BONUS GAMEPLAY ELEMENTS
     */
    bonusGameRowContainer: {
        type: 'container',
        children: ['bonusGameRow1LabelContainer', 'bonusGameRow2LabelContainer', 'bonusGameRow3LabelContainer', 'bonusGameRow4LabelContainer', 'bonusGameRow5LabelContainer'],
        x: 290,
        y: 260
    },
    bonusGameRow1LabelContainer: {
        type: 'container',
        children: ['rowAnimationContainer_1', 'bonusGameRow1Label'],
        landscape: {
            scale: 1
        },
        portrait: {
            scale: 1.3
        }
    },
    bonusGameRow2LabelContainer: {
        type: 'container',
        children: ['rowAnimationContainer_2', 'bonusGameRow2Label'],
        landscape: {
            scale: 1,
            y: 85
        },
        portrait: {
            scale: 1.3,
            y: 95
        }
    },
    bonusGameRow3LabelContainer: {
        type: 'container',
        children: ['rowAnimationContainer_3', 'bonusGameRow3Label'],
        landscape: {
            scale: 1,
            y: 170
        },
        portrait: {
            scale: 1.3,
            y: 190
        }
    },
    bonusGameRow4LabelContainer: {
        type: 'container',
        children: ['rowAnimationContainer_4', 'bonusGameRow4Label'],
        landscape: {
            scale: 1,
            y: 255
        },
        portrait: {
            scale: 1.3,
            y: 285
        }
    },
    bonusGameRow5LabelContainer: {
        type: 'container',
        children: ['rowAnimationContainer_5', 'bonusGameRow5Label'],
        landscape: {
            scale: 1,
            y: 340
        },
        portrait: {
            scale: 1.3,
            y: 380
        }
    },
    bonusGameRow1Label: {
        type: 'text',
        style: 'bonusRowHeader',
        anchor: 0.5,
        x: -8
    },
    bonusGameRow2Label: {
        type: 'text',
        style: 'bonusRowHeader',
        anchor: 0.5,
        x: -8
    },
    bonusGameRow3Label: {
        type: 'text',
        style: 'bonusRowHeader',
        anchor: 0.5,
        x: -8
    },
    bonusGameRow4Label: {
        type: 'text',
        style: 'bonusRowHeader',
        anchor: 0.5,
        x: -8
    },
    bonusGameRow5Label: {
        type: 'text',
        style: 'bonusRowHeader',
        anchor: 0.5,
        x: -8
    },
    rowAnimationContainer_1: {
        type: 'container',
        landscape: {
            y: 160,
            x: 405
        },
        portrait: {
            x: 300,
            y: 100
        }
    },
    rowAnimationContainer_2: {
        type: 'container',
        landscape: {
            y: 75,
            x: 405
        },
        portrait: {
            x: 300,
            y: 5
        }
    },
    rowAnimationContainer_3: {
        type: 'container',
        landscape: {
            y: -20,
            x: 405
        },
        portrait: {
            x: 300,
            y: -100
        }
    },
    rowAnimationContainer_4: {
        type: 'container',
        landscape: {
            y: -100,
            x: 405
        },
        portrait: {
            x: 300,
            y: -210
        }
    },
    rowAnimationContainer_5: {
        type: 'container',
        landscape: {
            y: -185,
            x: 405
        },
        portrait: {
            x: 300,
            y: -310
        }
    },
    bonusGameNumberContainer: {
        type: 'container',
        children: ['bonusGameRow1Container1', 'bonusGameRow1Container2', 'bonusGameRow1Container3', 'bonusGameRow1Container4', 'bonusGameRow1Container5', 'bonusGameRow2Container1', 'bonusGameRow2Container2', 'bonusGameRow2Container3', 'bonusGameRow2Container4', 'bonusGameRow2Container5', 'bonusGameRow3Container1', 'bonusGameRow3Container2', 'bonusGameRow3Container3', 'bonusGameRow3Container4', 'bonusGameRow3Container5', 'bonusGameRow4Container1', 'bonusGameRow4Container2', 'bonusGameRow4Container3', 'bonusGameRow4Container4', 'bonusGameRow4Container5', 'bonusGameRow5Container1', 'bonusGameRow5Container2', 'bonusGameRow5Container3', 'bonusGameRow5Container4', 'bonusGameRow5Container5'],
        x: 400,
        y: 260
    },
    bonusGameRow1Container1: {
        type: 'container'
    },
    bonusGameRow1Container2: {
        type: 'container',
        landscape: {
            x: 145
        },
        portrait: {
            x: 165
        }
    },
    bonusGameRow1Container3: {
        type: 'container',
        landscape: {
            x: 290
        },
        portrait: {
            x: 330
        }
    },
    bonusGameRow1Container4: {
        type: 'container',
        landscape: {
            x: 435
        },
        portrait: {
            x: 490
        }
    },
    bonusGameRow1Container5: {
        type: 'container',
        landscape: {
            x: 580
        },
        portrait: {
            x: 650
        }
    },
    bonusGameRow2Container1: {
        type: 'container',
        landscape: {
            y: 85
        },
        portrait: {
            y: 95
        }
    },
    bonusGameRow2Container2: {
        type: 'container',
        landscape: {
            x: 145,
            y: 85
        },
        portrait: {
            x: 165,
            y: 95
        }
    },
    bonusGameRow2Container3: {
        type: 'container',
        landscape: {
            x: 290,
            y: 85
        },
        portrait: {
            x: 330,
            y: 95
        }
    },
    bonusGameRow2Container4: {
        type: 'container',
        landscape: {
            x: 435,
            y: 85
        },
        portrait: {
            x: 490,
            y: 95
        }
    },
    bonusGameRow2Container5: {
        type: 'container',
        landscape: {
            x: 580,
            y: 85
        },
        portrait: {
            x: 650,
            y: 95
        }
    },
    bonusGameRow3Container1: {
        type: 'container',
        landscape: {
            y: 167
        },
        portrait: {
            y: 190
        }
    },
    bonusGameRow3Container2: {
        type: 'container',
        landscape: {
            x: 145,
            y: 170
        },
        portrait: {
            x: 165,
            y: 190
        }
    },
    bonusGameRow3Container3: {
        type: 'container',
        landscape: {
            x: 290,
            y: 170
        },
        portrait: {
            x: 330,
            y: 190
        }
    },
    bonusGameRow3Container4: {
        type: 'container',
        landscape: {
            x: 435,
            y: 170
        },
        portrait: {
            x: 490,
            y: 190
        }
    },
    bonusGameRow3Container5: {
        type: 'container',
        landscape: {
            x: 580,
            y: 170
        },
        portrait: {
            x: 650,
            y: 190
        }
    },
    bonusGameRow4Container1: {
        type: 'container',
        landscape: {
            y: 255
        },
        portrait: {
            y: 285
        }
    },
    bonusGameRow4Container2: {
        type: 'container',
        landscape: {
            x: 145,
            y: 255
        },
        portrait: {
            x: 165,
            y: 285
        }
    },
    bonusGameRow4Container3: {
        type: 'container',
        landscape: {
            x: 290,
            y: 255
        },
        portrait: {
            x: 330,
            y: 285
        }
    },
    bonusGameRow4Container4: {
        type: 'container',
        landscape: {
            x: 435,
            y: 255
        },
        portrait: {
            x: 490,
            y: 285
        }
    },
    bonusGameRow4Container5: {
        type: 'container',
        landscape: {
            x: 580,
            y: 255
        },
        portrait: {
            x: 650,
            y: 285
        }
    },
    bonusGameRow5Container1: {
        type: 'container',
        landscape: {
            y: 340
        },
        portrait: {
            y: 380
        }
    },
    bonusGameRow5Container2: {
        type: 'container',
        landscape: {
            x: 145,
            y: 340
        },
        portrait: {
            x: 165,
            y: 380
        }
    },
    bonusGameRow5Container3: {
        type: 'container',
        landscape: {
            x: 290,
            y: 340
        },
        portrait: {
            x: 330,
            y: 380
        }
    },
    bonusGameRow5Container4: {
        type: 'container',
        landscape: {
            x: 435,
            y: 340
        },
        portrait: {
            x: 490,
            y: 380
        }
    },
    bonusGameRow5Container5: {
        type: 'container',
        landscape: {
            x: 580,
            y: 340
        },
        portrait: {
            x: 650,
            y: 380
        }
    },

    /*
        WHEELGAME
    */
    wheelGame: {
        type: 'container',
        children: ['wheelGameGameplayElements', 'wheelGameUIElements']
    },
    wheelGameGameplayElements: {
        type: 'container',
        children: ['wheel', 'wheel_button'],
        landscape: {
            x: 720,
            y: 770,
            scale: 0.85
        },
        portrait: {
            x: 405,
            y: 1170,
            scale: 0.9
        }
    },
    wheelGameUIElements: {
        type: 'container',
        children: ['wheelGameHeader', 'wheelGameTicketCostMeter', 'wheelGameMultiplierMeter', 'wheelGameTotalBonusWinMeter'],
        portrait: {
            y: 80
        },
        landscape: {
            y: 110
        }
    },

    /*
        WHEELGAME UI ELEMENTS
    */
    wheelGameTicketCostMeter: {
        type: 'container',
        children: ['wheelGameTicketCostMeterBackground', 'wheelGameTicketCostMeterLabel', 'wheelGameTicketCostMeterValue'],
        landscape: {
            x: 250,
            y: 140
        },
        portrait: {
            x: 170,
            y: 390
        }
    },
    wheelGameTicketCostMeterBackground: {
        type: 'sprite',
        landscape: {
            texture: 'bonusGameTriggerBasePortraitSmall',
            x: 0
        },
        portrait: {
            texture: 'bonusGameTriggerBasePortrait',
            x: 230
        },
        anchor: 0.5
    },
    wheelGameTicketCostMeterLabel: {
        type: 'text',
        string: 'ticketSelect_ticketCost',
        style: "ticketSelectCostHeader",
        anchor: 0.5,
        landscape: {
            x: -60,
            y: -40,
            maxWidth: 150
        },
        portrait: {
            y: -45,
            x: 0,
            maxWidth: 200
        }
    },
    wheelGameTicketCostMeterValue: {
        type: 'text',
        style: "ticketSelectCostValue",
        anchor: 0.5,
        landscape: {
            x: -60
        },
        portrait: {
            x: 0
        },
        maxWidth: 120
    },
    wheelGameMultiplierMeter: {
        type: 'container',
        children: ['wheelGameMultiplierMeterBackground', 'wheelGameMultiplierMeterLabel', 'wheelGameMultiplierMeterValue', 'wheelGameMultiplierMeterValueEcho'],
        landscape: {
            x: 230,
            y: 140
        },
        portrait: {
            x: 405,
            y: 390
        }
    },
    wheelGameMultiplierMeterBackground: {
        type: 'sprite',
        anchor: 0.5
    },
    wheelGameMultiplierMeterLabel: {
        type: 'text',
        style: "ticketSelectCostHeader",
        string: 'multiplier',
        anchor: 0.5,
        landscape: {
            x: 90,
            y: -40
        },
        portrait: {
            y: -45,
            x: 0
        },
        maxWidth: 200
    },
    wheelGameMultiplierMeterValue: {
        type: 'text',
        style: "ticketSelectCostValue",
        anchor: 0.5,
        landscape: {
            x: 85
        },
        portrait: {
            x: 0
        },
        maxWidth: 130
    },
    wheelGameMultiplierMeterValueEcho: {
        type: 'text',
        style: "ticketSelectCostValue",
        anchor: 0.5,
        landscape: {
            x: 85
        },
        portrait: {
            x: 0
        },
        maxWidth: 130
    },
    wheelGameTotalBonusWinMeter: {
        type: 'container',
        children: ['wheelGameTotalBonusWinMeterBackground', 'wheelGameTotalBonusWinMeterLabel', 'wheelGameTotalBonusWinMeterValue', 'wheelGameTotalBonusWinMeterValueEcho'],
        landscape: {
            x: 1200,
            y: 140
        },
        portrait: {
            x: 650,
            y: 390
        }
    },
    wheelGameTotalBonusWinMeterBackground: {
        type: 'sprite',
        landscape: {
            texture: 'bonusGameTriggerBasePortraitSmall',
            alpha: 1
        },
        portrait: {
            alpha: 0
        },
        anchor: 0.5
    },
    wheelGameTotalBonusWinMeterLabel: {
        type: 'text',
        style: "ticketSelectCostHeader",
        string: 'bonusWin',
        anchor: 0.5,
        landscape: {
            y: -40
        },
        portrait: {
            y: -45
        },
        maxWidth: 200
    },
    wheelGameTotalBonusWinMeterValue: {
        type: 'text',
        style: "ticketSelectCostValue",
        anchor: 0.5,
        maxWidth: 250
    },
    wheelGameTotalBonusWinMeterValueEcho: {
        type: 'text',
        style: "ticketSelectCostValue",
        anchor: 0.5,
        maxWidth: 250
    },
    wheelGameHeader: {
        type: 'container',
        children: ['wheelGameTitle', 'wheelGameInfo'],
        landscape: {
            x: 720,
            y: 30
        },
        portrait: {
            x: 405,
            y: 250
        }
    },
    wheelGameTitle: {
        type: 'text',
        string: 'page3Title',
        style: 'HowToPlayTitle2',
        anchor: 0.5,
        y: -30,
        portrait: {
            maxWidth: 700
        },
        landscape: {
            maxWidth: 500
        }
    },
    wheelGameInfo: {
        type: 'text',
        string: 'wheelGameInfo',
        style: 'ticketSelectCostValue',
        anchor: 0.5,
        y: 20,
        portrait: {
            maxWidth: 700
        },
        landscape: {
            maxWidth: 500
        }
    },

    /*
        WHEELGAME GAMEPLAY ELEMENTS
    */
    wheel: {
        type: 'container',
        children: ['wheelGlow', 'wheelRings', 'wheelFade', 'wheelInner_1', 'wheelInner_2', 'wheelInner_3', 'wheelInner_4', 'wheelOuter', 'wheelLightContainer', 'wheelLand', 'wheelCelebration']
    },
    wheelGlow: {
        type: 'sprite',
        anchor: 0.5,
        portrait: {
            scale: 1.1,
            y: -400
        },
        landscape: {
            y: 0,
            scale: 1.5
        }
    },
    wheelLand: {
        type: 'sprite',
        texture: 'bonusWheelCover',
        anchor: 0.5,
        y: -278
    },
    wheelRings: {
        type: 'sprite',
        texture: 'rings',
        anchor: 0.5
    },
    wheelFade: {
        type: 'sprite',
        texture: 'wheelFade',
        anchor: 0.5
    },
    wheelLightContainer: {
        type: 'container'
    },
    wheelOuter: {
        type: 'sprite',
        texture: 'baseRim',
        anchor: 0.5
    },
    wheelInner_1: {
        type: 'sprite',
        texture: 'segments01',
        anchor: 0.5
    },
    wheelInner_2: {
        type: 'sprite',
        texture: 'segments02',
        anchor: 0.5
    },
    wheelInner_3: {
        type: 'sprite',
        texture: 'segments03',
        anchor: 0.5
    },
    wheelInner_4: {
        type: 'sprite',
        texture: 'segments04',
        anchor: 0.5
    },
    wheel_button: {
        type: 'container',
        landscape: {
            scale: 1
        },
        portrait: {
            scale: 0.9
        }
    },
    wheelCelebration: {
        type: 'container',
        y: -444
    },

    /*
        TRANSITION
    */
    transition: {
        type: 'container',
        children: ['transitionBackground', 'transitionEffect', 'transitionSpine', 'transitionTitleContainer'],
        landscape: {
            x: 720,
            y: 405
        },
        portrait: {
            x: 405,
            y: 720
        }
    },
    transitionSpine: {
        type: 'container'
    },
    transitionEffect: {
        type: 'container'
    },
    transitionBackground: {
        type: 'rectangle',
        fill: '0x001c4a',
        fillAlpha: 0.8,
        landscape: {
            width: 1440,
            height: 810,
            x: -720,
            y: -405
        },
        portrait: {
            width: 810,
            height: 1440,
            x: -405,
            y: -720
        }
    },
    transitionTitleContainer: {
        type: 'container',
        children: ['transitionTitle']
    },
    transitionTitle: {
        type: 'text',
        style: 'transitionTitle',
        anchor: 0.5,
        landscape: {
            x: 0,
            y: -300
        },
        portrait: {
            x: 0,
            y: -430
        },
        maxWidth: 700
    },
    extraUI: {
        type: 'container',
        children: ['bonusHelpButton']
    },
    bonusHelpButton: {
        type: 'button',
        landscape: {
            x: 1380,
            y: 720,
            scale: 0.8
        },
        portrait: {
            x: 755,
            y: 1299,
            scale: 1
        },
        textures: {
            enabled: 'tutorialButtonEnabled',
            disabled: 'tutorialButtonDisabled',
            over: 'tutorialButtonOver',
            pressed: 'tutorialButtonPressed'
        }
    },

    /*
     * Container for bonus particles to fly to the prize table
     */
    bonusParticles: {
        type: 'container'
    },

    /*
     * HOW TO PLAY
     */
    howToPlayOverlay: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_tutorialOverlay'
        },
        portrait: {
            texture: 'portrait_tutorialOverlay'
        }
    },
    howToPlayPages: {
        type: 'container',
        children: ['howToPlayPage1Container', 'howToPlayPage2Container', 'howToPlayPage3Container']
    },
    howToPlayPage1Container: {
        type: 'container',
        children: ['howToPlayPage1Part1', 'howToPlayPage1Part2', 'howToPlayPage1Part3', 'howToPlayPage1Part4', 'howToPlayPage1Part5', 'howToPlayPage1Title']
    },
    howToPlayPage1Part1: {
        type: 'text',
        string: 'page1Part1',
        style: 'howToPlayInfoText',
        fontSize: 30,
        wordWrap: true,
        align: 'center',
        landscape: {
            x: 720,
            y: 240,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 420,
            wordWrapWidth: 560
        },
        anchor: 0.5
    },
    howToPlayPage1Part2: {
        type: 'text',
        string: 'page1Part2',
        style: 'howToPlayInfoText',
        fontSize: 30,
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 720,
            y: 310,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 520,
            wordWrapWidth: 560
        }
    },
    howToPlayPage1Part3: {
        type: 'container',
        children: ['howToPlayPage1Part3Text']
    },
    howToPlayPage1Part3Sprite: {
        type: 'sprite',
        texture: '20xMultiplier',
        anchor: 0.5,
        scale: 0.8,
        landscape: {
            x: 320,
            y: 380
        },
        portrait: {
            x: 405,
            y: 720
        }
    },
    howToPlayPage1Part3Text: {
        type: 'text',
        string: 'page1Part3',
        style: 'howToPlayInfoText',
        fontSize: 30,
        wordWrap: true,
        align: 'center',
        landscape: {
            x: 720,
            y: 380,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 620,
            wordWrapWidth: 560
        },
        anchor: 0.5
    },
    howToPlayPage1Part4: {
        type: 'container',
        children: ['howToPlayPage1Part4Text']
    },
    howToPlayPage1Part4Text: {
        type: 'text',
        string: 'page1Part4',
        style: 'howToPlayInfoText',
        fontSize: 30,
        wordWrap: true,
        align: 'center',
        landscape: {
            x: 720,
            y: 450,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 810,
            wordWrapWidth: 560
        },
        anchor: 0.5
    },
    howToPlayPage1Part4Sprite: {
        type: 'sprite',
        texture: 'smallCoin',
        anchor: 0.5,
        scale: 0.8,
        landscape: {
            x: 320,
            y: 450
        },
        portrait: {
            x: 405,
            y: 910
        }
    },
    howToPlayPage1Part5: {
        type: 'text',
        string: 'page1Part5',
        style: 'howToPlayInfoText',
        fontSize: 30,
        wordWrap: true,
        align: 'center',
        landscape: {
            x: 720,
            y: 520,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 1010,
            wordWrapWidth: 560
        },
        anchor: 0.5
    },
    howToPlayPage1Title: {
        type: 'text',
        style: 'howToPlayInfoText',
        string: 'page1Title',
        anchor: 0.5,
        maxWidth: 320,
        landscape: {
            x: 720,
            y: 220
        },
        portrait: {
            x: 405,
            y: 390
        }
    },
    howToPlayPage2Part1: {
        type: 'text',
        string: 'page2Part1',
        style: 'howToPlayInfoText',
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 720,
            y: 300,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 610,
            wordWrapWidth: 560
        }
    },
    howToPlayPage2Part2: {
        type: 'text',
        string: 'page2Part2',
        style: 'howToPlayInfoText',
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 720,
            y: 370,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 724,
            wordWrapWidth: 560
        }
    },
    howToPlayPage2Part3: {
        type: 'text',
        string: 'page2Part3',
        style: 'howToPlayInfoText',
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 720,
            y: 450,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 830,
            wordWrapWidth: 560
        }
    },
    howToPlayPage2Part4: {
        type: 'text',
        string: 'page2Part4',
        style: 'howToPlayInfoText',
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 720,
            y: 530,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 954,
            wordWrapWidth: 560
        }
    },
    howToPlayPage2Title: {
        type: 'text',
        string: 'page2Title',
        style: 'HowToPlayTitle2',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 220
        },
        portrait: {
            x: 405,
            y: 390,
            scale: 0.9
        },
        maxWidth: 700
    },
    howToPlayPage2Container: {
        type: 'container',
        children: ['howToPlayPage2Part1', 'howToPlayPage2Part2', 'howToPlayPage2Part3', 'howToPlayPage2Part4', 'howToPlayPage2Title']
    },
    howToPlayPage3Part1: {
        type: 'text',
        string: 'page3Part1',
        style: 'howToPlayInfoText',
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 720,
            y: 300,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 510,
            wordWrapWidth: 560
        }
    },
    howToPlayPage3Part2: {
        type: 'text',
        string: 'page3Part2',
        style: 'howToPlayInfoText',
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 720,
            y: 370,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 624,
            wordWrapWidth: 560
        }
    },
    howToPlayPage3Part3: {
        type: 'text',
        string: 'page3Part3',
        style: 'howToPlayInfoText',
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 720,
            y: 450,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 730,
            wordWrapWidth: 560
        }
    },
    howToPlayPage3Part4: {
        type: 'text',
        string: 'page3Part4',
        style: 'howToPlayInfoText',
        wordWrap: true,
        anchor: 0.5,
        align: 'center',
        landscape: {
            x: 720,
            y: 530,
            wordWrapWidth: 1100
        },
        portrait: {
            x: 405,
            y: 854,
            wordWrapWidth: 560
        }
    },
    howToPlayPage3Title: {
        type: 'text',
        string: 'page3Title',
        style: 'HowToPlayTitle2',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 220
        },
        portrait: {
            x: 405,
            y: 390
        },
        maxWidth: 700
    },
    howToPlayPage3Container: {
        type: 'container',
        landscape: {
            x: 50,
            y: -20,
            scale: 0.95
        },
        portrait: {
            x: 0,
            y: 0,
            scale: 1
        },
        children: ['howToPlayPage3Part1', 'howToPlayPage3Part2', 'howToPlayPage3Part3', 'howToPlayPage3Part4', 'howToPlayPage3Title']
    },
    howToPlayTitle: {
        type: 'text',
        string: 'howToPlay',
        style: 'howToPlayTitle',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 130
        },
        portrait: {
            x: 405,
            y: 310
        }
    },

    /*
     * UI ELEMENTS
     */
    buttonBar: {
        type: 'container',
        landscape: {
            x: 0,
            y: 662
        },
        portrait: {
            x: 0,
            y: 1248
        },
        children: ['helpButtonStatic', 'helpButton', 'homeButtonStatic', 'homeButton', 'exitButton', 'playAgainButton', 'tryAgainButton', 'buyButton', 'buyButtonAnim', 'tryButton', 'tryButtonAnim', 'moveToMoneyButton', 'retryButton']
    },
    buyButtonAnim: {
        type: 'sprite',
        anchor: 0.5
    },
    tryButtonAnim: {
        type: 'sprite',
        anchor: 0.5
    },
    footerContainer: {
        type: 'container',
        children: ['footerBG', 'balanceMeter', 'ticketCostMeter', 'winMeter', 'divider_1_3', 'divider_2_3', 'divider_1_2'],
        landscape: {
            y: 761
        },
        portrait: {
            y: 1349
        }
    },
    footerBG: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_footerBar',
            y: 5
        },
        portrait: {
            texture: 'portrait_footerBar',
            y: 5
        }
    },
    autoPlayButton_default: {
        type: 'point',
        landscape: {
            x: 1108,
            y: 712
        },
        portrait: {
            x: 405,
            y: 1297
        }
    },
    autoPlayButton_multi: {
        type: 'point',
        landscape: {
            x: 1108,
            y: 712
        },
        portrait: {
            x: 405,
            y: 1297
        }
    },
    buy_default: {
        type: 'point',
        landscape: {
            x: 1108,
            y: 50
        },
        portrait: {
            x: 405,
            y: 50
        }
    },
    try_default: {
        type: 'point',
        landscape: {
            x: 1105,
            y: 50
        },
        portrait: {
            x: 555,
            y: 50
        }
    },
    playForMoney_default: {
        type: 'point',
        landscape: {
            x: 1260,
            y: 50
        },
        portrait: {
            x: 264,
            y: 50
        }
    },
    buy_multi: {
        type: 'point',
        landscape: {
            x: 1108,
            y: 50
        },
        portrait: {
            x: 405,
            y: 50
        }
    },
    try_multi: {
        type: 'point',
        landscape: {
            x: 960,
            y: 50
        },
        portrait: {
            x: 555,
            y: 50
        }
    },
    try_fixed: {
        type: 'point',
        landscape: {
            x: 960,
            y: 50
        },
        portrait: {
            x: 555,
            y: 50
        }
    },
    playForMoney_multi: {
        type: 'point',
        landscape: {
            x: 1260,
            y: 50
        },
        portrait: {
            x: 264,
            y: 50
        }
    },
    exitButton: {
        type: 'button',
        landscape: {
            x: 1108,
            y: 50
        },
        portrait: {
            x: 405,
            y: 50
        },
        string: 'button_exit',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },
    howToPlayBackground: {
        type: 'sprite',
        anchor: {
            x: 0.5
        },
        landscape: {
            x: 720,
            y: 35,
            texture: 'landscape_tutorialBackground',
            scale: 1
        },
        portrait: {
            x: 405,
            y: 212,
            texture: 'portrait_tutorialBackground',
            scale: 0.9
        }
    },
    versionText: {
        type: 'text',
        style: 'versionHelpText',
        landscape: {
            y: 136,
            x: 150
        },
        portrait: {
            y: 290,
            x: 135
        },
        alpha: 0.5
    },
    howToPlayClose: {
        type: 'button',
        string: 'button_ok',
        landscape: {
            x: 720,
            y: 658
        },
        portrait: {
            x: 405,
            y: 1181
        },
        textures: {
            enabled: 'tutorialOKButtonEnabled',
            over: 'tutorialOKButtonOver',
            pressed: 'tutorialOKButtonPressed'
        },
        style: {
            enabled: 'tutorialOKButtonEnabled',
            over: 'tutorialOKButtonOver',
            pressed: 'tutorialOKButtonPressed'
        }
    },
    howToPlayPrevious: {
        type: 'button',
        landscape: {
            x: 102,
            y: 358
        },
        portrait: {
            x: 69,
            y: 682
        },
        textures: {
            enabled: 'tutorialLeftButtonEnabled',
            disabled: 'tutorialLeftButtonDisabled',
            over: 'tutorialLeftButtonOver',
            pressed: 'tutorialLeftButtonPressed'
        }
    },
    howToPlayNext: {
        type: 'button',
        landscape: {
            x: 1343,
            y: 358
        },
        portrait: {
            x: 746,
            y: 682
        },
        textures: {
            enabled: 'tutorialRightButtonEnabled',
            disabled: 'tutorialRightButtonDisabled',
            over: 'tutorialRightButtonOver',
            pressed: 'tutorialRightButtonPressed'
        }
    },
    howToPlayIndicators: {
        type: 'container',
        children: ['howToPlayIndicatorActive', 'howToPlayIndicatorInactive'],
        landscape: {
            x: 720,
            y: 580
        },
        portrait: {
            x: 405,
            y: 1099
        }
    },
    howToPlayIndicatorActive: {
        type: 'sprite',
        texture: 'tutorialPageIndicatorActive'
    },
    howToPlayIndicatorInactive: {
        type: 'sprite',
        texture: 'tutorialPageIndicatorInactive'
    },
    audioButtonContainer: {
        type: 'container',
        landscape: {
            x: 159,
            y: 575
        },
        portrait: {
            x: 155,
            y: 1101
        }
    },
    resultPlaquesContainer: {
        type: 'container',
        children: ['resultPlaqueOverlay', 'winPlaqueBG', 'winPlaqueEffects', 'winPlaqueMessage', 'winPlaqueValue', 'winPlaqueCloseButton', 'losePlaqueBG', 'losePlaqueCloseButton', 'losePlaqueMessage'],
        landscape: {
            x: 720,
            y: 377
        },
        portrait: {
            x: 405,
            y: 678
        }
    },
    winPlaqueMessage: {
        type: 'text',
        string: 'message_win',
        style: 'winPlaqueBody',
        portrait: {
            y: -80,
            x: 0
        },
        landscape: {
            y: 0,
            x: -250
        },
        anchor: {
            x: 0.5,
            y: 1
        },
        maxWidth: 746
    },
    winPlaqueValue: {
        type: 'text',
        style: 'winPlaqueValue',
        portrait: {
            y: -15,
            x: 0
        },
        landscape: {
            y: 62,
            x: -250
        },
        anchor: 0.5,
        maxWidth: 746
    },
    winPlaqueCloseButton: {
        type: 'button',
        alpha: 0,
        landscape: {
            textures: {
                enabled: 'landscape_endOfGameMessageWinBackground',
                over: 'landscape_endOfGameMessageWinBackground',
                pressed: 'landscape_endOfGameMessageWinBackground'
            }
        },
        portrait: {
            textures: {
                enabled: 'portrait_endOfGameMessageWinBackground',
                over: 'portrait_endOfGameMessageWinBackground',
                pressed: 'portrait_endOfGameMessageWinBackground'
            }
        }
    },
    losePlaqueMessage: {
        type: 'text',
        string: 'message_nonWin',
        style: 'losePlaqueBody',
        portrait: {
            y: -95,
            x: 0
        },
        landscape: {
            x: -250,
            y: 0
        },
        anchor: 0.5,
        maxWidth: 746
    },
    losePlaqueCloseButton: {
        type: 'button',
        alpha: 0,
        landscape: {
            textures: {
                enabled: 'landscape_endOfGameMessageNoWinBackground',
                over: 'landscape_endOfGameMessageNoWinBackground',
                pressed: 'landscape_endOfGameMessageNoWinBackground'
            }
        },
        portrait: {
            textures: {
                enabled: 'portrait_endOfGameMessageNoWinBackground',
                over: 'portrait_endOfGameMessageNoWinBackground',
                pressed: 'portrait_endOfGameMessageNoWinBackground'
            }
        }
    },
    winPlaqueEffects: {
        type: 'container',
        portrait: {
            x: -405,
            y: -760
        },
        landscape: {
            x: -975,
            y: -380
        }
    },
    winPlaqueBG: {
        type: 'container',
        anchor: 0.5
    },
    losePlaqueBG: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'landscape_endOfGameMessageNoWinBackground',
            x: -250,
            y: 0
        },
        portrait: {
            texture: 'portrait_endOfGameMessageNoWinBackground',
            x: 0,
            y: -80
        }
    },
    buyButton: {
        type: 'button',
        string: 'button_buy',
        textures: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        },
        style: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        }
    },
    tryButton: {
        type: 'button',
        string: 'button_try',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },
    retryButton: {
        type: 'button',
        string: 'button_retry',
        textures: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        },
        style: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        }
    },
    moveToMoneyButton: {
        type: 'button',
        string: 'button_moveToMoney',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },
    ticketSelectBarSmall: {
        type: 'container',
        landscape: {
            x: 1105,
            y: 510
        },
        portrait: {
            x: 607,
            y: 1087
        },
        children: ['ticketSelectBarBG', 'ticketSelectCostValue', 'ticketCostDownButtonStatic', 'ticketCostUpButtonStatic', 'ticketCostDownButton', 'ticketCostUpButton', 'ticketCostIndicators', 'ticketCostHeader']
    },
    ticketCostIndicators: {
        type: 'container',
        children: ['ticketCostIndicatorActive', 'ticketCostIndicatorInactive'],
        portrait: {
            y: 20
        },
        landscape: {
            y: 20
        }
    },
    ticketSelectBarBG: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'totalCostBaseLandscape'
        },
        portrait: {
            texture: 'ticketsTicketCostBasePortrait'
        }
    },
    ticketCostHeader: {
        type: 'text',
        style: 'ticketSelectCostHeader',
        string: 'ticketSelect_ticketCost',
        anchor: 0.5,
        landscape: {
            y: -38,
            maxWidth: 260
        },
        portrait: {
            y: -38,
            maxWidth: 160
        }
    },
    ticketSelectCostValue: {
        type: 'text',
        portrait: {
            y: -3
        },
        landscape: {
            y: -2
        },
        anchor: 0.5,
        maxWidth: 160,
        style: 'ticketSelectCostValue'
    },
    ticketCostDownButton: {
        type: 'button',
        portrait: {
            x: -133,
            scale: 1
        },
        landscape: {
            x: -192,
            scale: 0.8
        },
        textures: {
            enabled: 'minusButtonEnabled',
            disabled: 'minusButtonDisabled',
            over: 'minusButtonOver',
            pressed: 'minusButtonPressed'
        }
    },
    ticketCostUpButton: {
        type: 'button',
        portrait: {
            x: 138,
            scale: 1
        },
        landscape: {
            x: 190,
            scale: 0.8
        },
        textures: {
            enabled: 'plusButtonEnabled',
            disabled: 'plusButtonDisabled',
            over: 'plusButtonOver',
            pressed: 'plusButtonPressed'
        }
    },
    ticketCostDownButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        portrait: {
            x: -133,
            scale: 1
        },
        landscape: {
            x: -192,
            scale: 0.8
        },
        texture: 'minusButtonDisabled'
    },
    ticketCostUpButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        portrait: {
            x: 138,
            scale: 1
        },
        landscape: {
            x: 190,
            scale: 0.8
        },
        texture: 'plusButtonDisabled'
    },
    helpButton: {
        type: 'button',
        landscape: {
            x: 1293,
            y: -350,
            scale: 0.8
        },
        portrait: {
            x: 744,
            y: 50,
            scale: 1
        },
        textures: {
            enabled: 'tutorialButtonEnabled',
            disabled: 'tutorialButtonDisabled',
            over: 'tutorialButtonOver',
            pressed: 'tutorialButtonPressed'
        }
    },
    homeButton: {
        type: 'button',
        landscape: {
            x: 912,
            y: -350,
            scale: 0.8
        },
        portrait: {
            x: 75,
            y: 50,
            scale: 1
        },
        textures: {
            enabled: 'homeButtonEnabled',
            over: 'homeButtonOver',
            pressed: 'homeButtonPressed',
            disabled: 'homeButtonDisabled'
        }
    },
    helpButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            x: 1293,
            y: -350,
            scale: 0.8
        },
        portrait: {
            x: 744,
            y: 50,
            scale: 1
        },
        texture: 'tutorialButtonDisabled'
    },
    homeButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            x: 912,
            y: -350,
            scale: 0.8
        },
        portrait: {
            x: 75,
            y: 50,
            scale: 1
        },
        texture: 'homeButtonDisabled'
    },
    errorBackground: {
        type: 'sprite',
        anchor: {
            x: 0.5
        },
        landscape: {
            x: 720,
            y: 150,
            texture: 'landscape_timeOutMessageBackground'
        },
        portrait: {
            x: 405,
            y: 370,
            texture: 'portrait_timeOutMessageBackground'
        }
    },
    timeoutExit: {
        type: 'button',
        landscape: {
            x: 570,
            y: 560
        },
        portrait: {
            x: 245,
            y: 775
        },
        style: {
            enabled: 'errorButtonEnabled',
            over: 'errorButtonOver',
            pressed: 'errorButtonPressed'
        },
        textures: {
            enabled: 'timeOutButtonEnabled',
            over: 'timeOutButtonOver',
            pressed: 'timeOutButtonPressed'
        }
    },
    timeoutContinue: {
        type: 'button',
        landscape: {
            x: 870,
            y: 560
        },
        portrait: {
            x: 540,
            y: 775
        },
        style: {
            enabled: 'errorButtonEnabled',
            over: 'errorButtonOver',
            pressed: 'errorButtonPressed'
        },
        textures: {
            enabled: 'timeOutButtonEnabled',
            over: 'timeOutButtonOver',
            pressed: 'timeOutButtonPressed'
        }
    },
    errorMessage: {
        type: 'text',
        style: 'errorMessage',
        anchor: 0.5,
        wordWrap: true,
        landscape: {
            x: 720,
            y: 340,
            wordWrapWidth: 500
        },
        portrait: {
            x: 405,
            y: 560,
            wordWrapWidth: 500
        }
    }
});