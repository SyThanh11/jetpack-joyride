import Phaser from 'phaser'
import Button from '../ui/Button'
import Game from './Game'
import ContinueState from './state/ContinueState'
import MusicManager from '../music/MusicManager'

class PauseScene extends Phaser.Scene {
    private buttonHome: Button
    private buttonContinue: Button
    private text: Phaser.GameObjects.Text
    private sceneGame: Game

    constructor() {
        super('PauseScene')
    }

    public init(data: { sceneGame: Game }) {
        this.sceneGame = data.sceneGame
    }

    public create() {
        const graphics = this.add.graphics()
        graphics.fillStyle(0x000000, 0.5)
        graphics.fillRect(0, 0, Number(this.game.config.width), Number(this.game.config.height))

        this.text = this.add
            .text(
                Number(this.game.config.width) / 2,
                Number(this.game.config.height) / 2.5,
                'PAUSED',
                {
                    font: '60px Arial',
                    color: '#FFFFFF',
                    fontStyle: 'bold',
                }
            )
            .setOrigin(0.5, 0.5)

        this.buttonHome = new Button(
            this,
            Number(this.game.config.width) / 2.5,
            Number(this.game.config.height) / 1.7,
            'controlButtonPause',
            100,
            100,
            () => {
                MusicManager.getInstance(this.sceneGame).stopAllMusics()
                this.scene.stop('PauseScene')
                this.scene.stop('Game')
                this.scene.start('Game')
                MusicManager.getInstance(this.sceneGame).playMusicLevel()
            },
            'HOME',
            {
                fontSize: '20px',
                color: '#FFFFFF',
                fontFamily: 'Arial',
            }
        ).setScale(1.2)

        this.buttonContinue = new Button(
            this,
            Number(this.game.config.width) - Number(this.game.config.width) / 2.5,
            Number(this.game.config.height) / 1.7,
            'controlButtonPause',
            100,
            100,
            () => {
                this.sceneGame.stateMachine.changeState(new ContinueState(this.sceneGame))
            },
            'CONTINUE',
            {
                fontSize: '20px',
                color: '#FFFFFF',
                fontFamily: 'Arial',
            }
        ).setScale(1.2)
    }
}

export default PauseScene
