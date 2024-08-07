import MusicManager from '../../music/MusicManager'
import Game from '../Game'
import State from './GamePlayState'

class RestartState implements State {
    constructor(private scene: Game) {}

    public enter(): void {
        console.log('Begin Restart State')
        MusicManager.getInstance(this.scene).stopAllMusics()
        this.scene.scene.stop('Game')
        this.scene.scene.start('Game')
        this.scene.player.isStartMusic = false
    }

    public exit(): void {
        console.log('End Restart State')
    }

    public update(time: number, delta: number): void {}
}

export default RestartState
