import { Game } from '../Game'
import State from './GamePlayState'
import PlayState from './PlayState'

class ContinueState implements State {
    constructor(private scene: Game) {}

    enter(): void {
        console.log('Begin Continue State')
        this.scene.scene.resume('Game')
        this.scene.stateMachine.changeState(new PlayState(this.scene))
    }

    exit(): void {
        console.log('End Continue State')
    }

    update(time: number, delta: number): void {}
}

export default ContinueState
