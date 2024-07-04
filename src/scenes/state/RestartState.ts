import { Game } from '../Game'
import State from './GamePlayState'
import StartState from './StartState'

class RestartState implements State {
    constructor(private scene: Game) {}

    public enter(): void {
        console.log('Begin Restart State')

        this.scene.scene.stop('Game')
        this.scene.scene.start('Game')
        this.scene.stateMachine.changeState(new StartState(this.scene))
    }

    public exit(): void {
        console.log('End Restart State')
    }

    public update(time: number, delta: number): void {}
}

export default RestartState
