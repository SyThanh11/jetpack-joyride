import { Game } from '../Game'
import State from './GamePlayState'

class RestartState implements State {
    constructor(private scene: Game) {}

    public enter(): void {
        console.log('Begin Restart State')

        if (this.scene.music) {
            this.scene.music.stop()
        }
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
