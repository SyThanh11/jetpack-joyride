import { Game } from '../Game'
import State from './GamePlayState'

class PlayState implements State {
    constructor(private scene: Game) {}

    enter(): void {
        console.log('Begin Play State')

        this.scene.player.start()
        this.scene.mapManager.start()
    }

    exit(): void {
        console.log('End Play State')
    }

    update(time: number, deltaTime: number): void {
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
