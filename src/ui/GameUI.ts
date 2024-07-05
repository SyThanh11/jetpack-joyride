import CONST from '../const/Const'
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

        const baseFontSize = CONST.GAME_WIDTH / 50
        const fontSize = Math.floor(baseFontSize)
        const smallFontSize = Math.floor(baseFontSize * 0.8)
        const coinFontSize = Math.floor(baseFontSize * 0.8)

        this.textScore = scene.add.text(CONST.GAME_WIDTH / 50, CONST.GAME_HEIGHT / 8, `0000 M`, {
            fontSize: `${fontSize}px`,
            color: '#FFFFFF',
            fontFamily: 'Arial',
            fontStyle: 'bold',
        })

        this.textBestScore = scene.add.text(
            CONST.GAME_WIDTH / 50,
            CONST.GAME_HEIGHT / 6,
            `BEST ${localStorage.getItem('bestScore') || '0000'}`,
            {
                fontSize: `${smallFontSize}px`,
                color: '#FFFFFF',
                fontFamily: 'Arial',
            }
        )

        this.textCoin = scene.add.text(CONST.GAME_WIDTH / 25, CONST.GAME_HEIGHT / 4.9, `0000`, {
            fontSize: `${coinFontSize}px`,
            color: 'yellow',
            fontFamily: 'Arial',
        })

        this.imageCoin = scene.add.image(CONST.GAME_WIDTH / 38, CONST.GAME_HEIGHT / 4.6, 'coin')

        const scaleFactor = Math.min(CONST.GAME_WIDTH, CONST.GAME_HEIGHT) / 1000
        this.imageCoin.setScale(scaleFactor)

        this.button = new Button(
            scene,
            CONST.GAME_WIDTH - CONST.GAME_WIDTH / 50,
            CONST.GAME_HEIGHT / 6.5,
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
