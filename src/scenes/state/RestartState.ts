import { Game } from '../Game'
import State from './GamePlayState'
import StartState from './StartState'

class RestartState implements State {
    constructor(private scene: Game) {}

    enter(): void {
        console.log('Begin Restart State')
        this.scene.scene.stop('Game')
        this.scene.scene.start('Game')
        this.scene.stateMachine.changeState(new StartState(this.scene))
    }

    exit(): void {
        console.log('End Restart State')
    }

    update(time: number, delta: number): void {}
}

export default RestartState
