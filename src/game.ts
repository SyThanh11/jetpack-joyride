import { Game as MainGame } from './scenes/Game'

import { Game, Types } from 'phaser'

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: innerWidth,
    height: innerHeight,
    parent: 'game-container',
    backgroundColor: '#028af8',
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
    scene: [MainGame],
}

export default new Game(config)
