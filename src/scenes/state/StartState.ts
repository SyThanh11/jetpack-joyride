import { Game } from '../Game'
import State from './GamePlayState'
import PlayState from './PlayState'

class StartState implements State {
    constructor(private scene: Game) {}

    enter(): void {
        console.log('Begin Start State')

        const gameWidth = Number(this.scene.game.config.width)
        const gameHeight = Number(this.scene.game.config.height)
        this.scene.gameStarted = false

        const titleWidth = gameWidth * 0.5
        const titleHeight = titleWidth * (9 / 16)

        this.scene.title = this.scene.add
            .image(gameWidth / 2, gameHeight / 2.5, 'mainMenu')
            .setDepth(1)
        this.scene.title.setDisplaySize(titleWidth, titleHeight)

        const textStyle = {
            fontFamily: 'Arial',
            fontSize: `${gameWidth * 0.02}px`,
            color: '#FFFFFF',
        }
        this.scene.blinkingText = this.scene.add
            .text(gameWidth / 2, gameHeight / 1.6, 'PRESS START TO PLAY', textStyle)
            .setOrigin(0.5)

        this.scene.tweens.add({
            targets: this.scene.blinkingText,
            alpha: 0,
            ease: 'Linear',
            duration: 500,
            repeat: -1,
            yoyo: true,
        })

        this.scene.input.on('pointerdown', () => {
            if (!this.scene.gameStarted) {
                this.scene.score.setScore(0)
                this.scene.score.setCoin(0)
                this.scene.stateMachine.changeState(new PlayState(this.scene))
            }
        })
    }

    exit(): void {
        console.log('End Start State')
        this.scene.gameStarted = true
        this.scene.title.destroy()
        this.scene.blinkingText.destroy()
    }

    public update(time: number, delta: number): void {}
}

export default StartState
