import CONST from '../const/const'
import Game from '../scenes/Game'

import Button from './Button'

class GameOverUI extends Phaser.GameObjects.Container {
    private textTitle: Phaser.GameObjects.Text
    private textScore: Phaser.GameObjects.Text
    private textBestScore: Phaser.GameObjects.Text
    private textCoin: Phaser.GameObjects.Text
    private button: Button

    constructor(scene: Game) {
        super(scene)

        const graphics = this.scene.add.graphics()
        graphics.fillStyle(0x000000, 0.5)
        graphics.fillRect(
            0,
            0,
            Number(this.scene.game.config.width),
            Number(this.scene.game.config.height)
        )

        const baseFontSize = CONST.GAME_WIDTH / 30
        const fontSize = Math.floor(baseFontSize)
        const coinFontSize = Math.floor(baseFontSize * 0.8)
        const scaleFactor = Math.min(CONST.GAME_WIDTH, CONST.GAME_HEIGHT) / 800

        this.textTitle = scene.add
            .text(CONST.GAME_WIDTH / 2, CONST.GAME_HEIGHT / 4, 'Game Over', {
                fontSize: `${CONST.GAME_WIDTH / 20}px`,
                color: '#FFFFFF',
                align: 'center',
                fontFamily: 'Arial',
                fontStyle: 'bold',
            })
            .setOrigin(0.5, 0.5)

        this.textScore = scene.add
            .text(CONST.GAME_WIDTH / 2, CONST.GAME_HEIGHT / 2.5, `SCORE 0000 M`, {
                fontSize: `${fontSize}px`,
                color: '#FFFFFF',
                fontFamily: 'Arial',
                fontStyle: 'bold',
            })
            .setOrigin(0.5, 0.5)

        this.textBestScore = scene.add
            .text(CONST.GAME_WIDTH / 2, CONST.GAME_HEIGHT / 2, `BEST 0000 M`, {
                fontSize: `${fontSize}px`,
                color: '#FFFFFF',
                fontFamily: 'Arial',
                fontStyle: 'bold',
            })
            .setOrigin(0.5, 0.5)

        this.textCoin = scene.add
            .text(CONST.GAME_WIDTH / 2, CONST.GAME_HEIGHT / 1.6, `COIN 0000`, {
                fontSize: `${coinFontSize}px`,
                color: 'yellow',
                fontFamily: 'Arial',
            })
            .setOrigin(0.5, 0.5)

        this.button = new Button(
            scene,
            CONST.GAME_WIDTH / 2,
            CONST.GAME_HEIGHT / 1.4,
            'controlButtonPause',
            50,
            50,
            () => {
                scene.scene.stop('Game')
                scene.scene.start('Game')
            },
            'HOME',
            {
                fontSize: '20px',
                color: '#FFFFFF',
                fontFamily: 'Arial',
            }
        ).setScale(scaleFactor)
    }

    public setTextScore(score: number): void {
        const formattedScore = score.toString().padStart(4, '0')
        this.textScore.setText(`SCORE ${formattedScore} M`)
    }

    public setTextBestScore(score: number): void {
        const formattedScore = score.toString().padStart(4, '0')
        this.textBestScore.setText(`BEST ${formattedScore}`)
    }

    public setTextCoin(coin: number): void {
        const formattedCoin = coin.toString().padStart(4, '0')
        this.textCoin.setText(`COIN ${formattedCoin}`)
    }
}

export default GameOverUI
