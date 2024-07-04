import GameOverUI from '../../ui/GameOverUI'
import { Game } from '../Game'
import State from './GamePlayState'

class GameOverState implements State {
    constructor(private scene: Game) {}

    public enter(): void {
        console.log('Begin Game Over State')
        const gameOverUI = new GameOverUI(this.scene)
        gameOverUI.setTextScore(this.scene.score.getScore())
        gameOverUI.setTextBestScore(this.scene.score.getBestScore())
        gameOverUI.setTextCoin(this.scene.score.getCoin())

        this.scene.mapManager.stop()
    }

    public exit(): void {
        console.log('End Game Over State')
    }

    public update(time: number, delta: number): void {}
}

export default GameOverState
