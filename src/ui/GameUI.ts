import { Game } from '../scenes/Game'
import PauseState from '../scenes/state/PauseState'
import Button from './Button'

class GameUI extends Phaser.GameObjects.Container {
    private textScore: Phaser.GameObjects.Text
    private textBestScore: Phaser.GameObjects.Text
    private textCoin: Phaser.GameObjects.Text
    private imageCoin: Phaser.GameObjects.Image
    private button: Button

    constructor(scene: Game) {
        super(scene)
        const gameWidth = Number(scene.game.config.width)
        const gameHeight = Number(scene.game.config.height)

        const baseFontSize = gameWidth / 50
        const fontSize = Math.floor(baseFontSize)
        const smallFontSize = Math.floor(baseFontSize * 0.8)
        const coinFontSize = Math.floor(baseFontSize * 0.8)

        this.textScore = scene.add.text(gameWidth / 50, gameHeight / 8, `0000 M`, {
            fontSize: `${fontSize}px`,
            color: '#FFFFFF',
            fontFamily: 'Arial',
            fontStyle: 'bold',
        })

        this.textBestScore = scene.add.text(
            gameWidth / 50,
            gameHeight / 6,
            `BEST ${localStorage.getItem('bestScore') || '0000'}`,
            {
                fontSize: `${smallFontSize}px`,
                color: '#FFFFFF',
                fontFamily: 'Arial',
            }
        )

        this.textCoin = scene.add.text(gameWidth / 25, gameHeight / 4.9, `0000`, {
            fontSize: `${coinFontSize}px`,
            color: 'yellow',
            fontFamily: 'Arial',
        })

        this.imageCoin = scene.add.image(gameWidth / 38, gameHeight / 4.6, 'coin')

        const scaleFactor = Math.min(gameWidth, gameHeight) / 1000
        this.imageCoin.setScale(scaleFactor)

        this.button = new Button(
            scene,
            gameWidth - gameWidth / 50,
            gameHeight / 6.5,
            'buttonPause',
            50,
            50,
            () => {
                scene.stateMachine.changeState(new PauseState(scene))
            },
            '',
            {
                fontSize: '20px',
                color: '#000000',
                fontFamily: 'Arial',
            }
        ).setScale(scaleFactor)

        this.add(this.textScore)
        this.add(this.textBestScore)
        this.add(this.textCoin)
        this.add(this.imageCoin)
        this.add(this.button)

        scene.add.existing(this)
    }

    public setTextScore(score: number): void {
        const formattedScore = score.toString().padStart(4, '0')
        this.textScore.setText(`${formattedScore} M`)
    }

    public setTextBestScore(score: number): void {
        const formattedScore = score.toString().padStart(4, '0')
        this.textBestScore.setText(`BEST ${formattedScore}`)
    }

    public setTextCoin(coin: number): void {
        const formattedCoin = coin.toString().padStart(4, '0')
        this.textCoin.setText(`${formattedCoin}`)
    }
}

export default GameUI
