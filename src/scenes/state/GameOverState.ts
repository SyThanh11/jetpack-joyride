import GameOverUI from '../../ui/GameOverUI'
import { Game } from '../Game'
import State from './GamePlayState'

class GameOverState implements State {
    constructor(private scene: Game) {}

    enter(): void {
        console.log('Begin Game Over State')
        const gameOverUI = new GameOverUI(this.scene)
        gameOverUI.setTextScore(this.scene.score.getScore())
        gameOverUI.setTextBestScore(this.scene.score.getBestScore())
        gameOverUI.setTextCoin(this.scene.score.getCoin())

        this.scene.mapManager.stop()
    }

    exit(): void {
        console.log('End Game Over State')
    }

    update(time: number, delta: number): void {}
}

export default GameOverState
