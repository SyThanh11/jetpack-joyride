import { Game } from '../Game'
import PauseScene from '../PauseScene'
import State from './GamePlayState'

class PauseState implements State {
    private pauseScene: PauseScene

    constructor(private scene: Game) {}

    enter(): void {
        console.log('Begin Pause State')
        this.scene.scene.launch('PauseScene', { sceneGame: this.scene })
        this.scene.scene.pause()
    }

    exit(): void {
        console.log('End Pause State')
        this.scene.scene.stop('PauseScene')
    }

    update(time: number, delta: number): void {}
}

export default PauseState
