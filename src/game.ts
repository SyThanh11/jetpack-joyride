import PreloadScene from './scenes/PreloadScene'
import BootGameScene from './scenes/BootScene'
import PauseScene from './scenes/PauseScene'
import { Types } from 'phaser'
import Game from './scenes/Game'

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: Number(innerWidth) * devicePixelRatio,
    height: Number((innerWidth * 9) / 16) * devicePixelRatio,
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
    scene: [BootGameScene, PreloadScene, Game, PauseScene],
}

export default new Phaser.Game(config)
