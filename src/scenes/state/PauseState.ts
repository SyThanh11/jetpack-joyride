import Game from '../Game'
import PauseScene from '../PauseScene'
import State from './GamePlayState'

class PauseState implements State {
    private pauseScene: PauseScene

    constructor(private scene: Game) {}

    public enter(): void {
        console.log('Begin Pause State')
        this.scene.player.isStartMusic = false
        this.scene.scene.launch('PauseScene', { sceneGame: this.scene })
        this.scene.scene.pause()
    }

    public exit(): void {
        console.log('End Pause State')
        this.scene.scene.stop('PauseScene')
    }

    public update(time: number, delta: number): void {}
}

export default PauseState
