import { Game as MainGame } from './scenes/Game'

import { Game, Types } from 'phaser'
import PreloadScene from './scenes/PreloadScene'
import BootGameScene from './scenes/BootScene'
import PauseScene from './scenes/PauseScene'

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: Number(innerWidth) * devicePixelRatio,
    height: Number((innerWidth * 9) / 16) * devicePixelRatio,
    // width: 0,
    // height: 0,
    parent: 'game-container',
    backgroundColor: '#FFFFFF',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        },
    },
    scene: [BootGameScene, PreloadScene, MainGame, PauseScene],
}

export default new Game(config)
