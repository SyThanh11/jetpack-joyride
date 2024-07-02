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

        const baseFontSize = gameHeight / 30
        const fontSize = Math.floor(baseFontSize)
        const smallFontSize = Math.floor(baseFontSize)
        const coinFontSize = Math.floor(baseFontSize)

        this.textScore = scene.add.text(16, gameHeight / 8, `0000 M`, {
            fontSize: `${fontSize}px`,
            color: '#FFFFFF',
            fontFamily: 'Arial',
            fontStyle: 'bold',
        })

        this.textBestScore = scene.add.text(
            16,
            gameHeight / 6,
            `BEST ${localStorage.getItem('bestScore') || 0}`,
            {
                fontSize: `${smallFontSize}px`,
                color: '#FFFFFF',
                fontFamily: 'Arial',
            }
        )

        this.textCoin = scene.add.text(50, gameHeight / 4.8, `0000`, {
            fontSize: `${coinFontSize}px`,
            color: 'yellow',
            fontFamily: 'Arial',
        })

        this.imageCoin = scene.add.image(30, gameHeight / 4.45, 'coin')

        this.button = new Button(
            scene,
            gameWidth / 1.02,
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
        ).setScale(0.8)

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
