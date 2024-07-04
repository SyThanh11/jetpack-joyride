import { Game } from '../Game'
import State from './GamePlayState'

class PlayState implements State {
    constructor(private scene: Game) {}

    public enter(): void {
        console.log('Begin Play State')

        this.scene.music = this.scene.sound.add('musicLevel')
        this.scene.music.play({ loop: true })

        this.scene.player.start()
        this.scene.mapManager.start()
    }

    public exit(): void {
        console.log('End Play State')
    }

    public update(time: number, deltaTime: number): void {
        this.scene.mapManager.update()
        if (this.scene.gameStarted) {
            this.scene.timeInterval -= deltaTime / 1000
            if (this.scene.timeInterval <= 0) {
                this.scene.score.addScore(1)
                this.scene.gameUI.setTextScore(this.scene.score.getScore())
                this.scene.timeInterval = 0.1
            }
        }
    }
}

export default PlayState
