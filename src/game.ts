import { Game as MainGame } from './scenes/Game'

import { Game, Types } from 'phaser'
import PreloadScene from './scenes/PreloadScene'
import BootGameScene from './scenes/BootScene'

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: innerWidth,
    height: innerHeight,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    scene: [BootGameScene, PreloadScene, MainGame],
}

export default new Game(config)
