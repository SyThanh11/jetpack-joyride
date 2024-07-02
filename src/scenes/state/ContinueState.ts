import { Game } from '../Game'
import State from './GamePlayState'
import PlayState from './PlayState'

class ContinueState implements State {
    constructor(private scene: Game) {}

    enter(): void {
        console.log('Begin Restart State')
        this.scene.scene.resume('Game')
        this.scene.stateMachine.changeState(new PlayState(this.scene))
    }

    exit(): void {
        console.log('End Restart State')
    }

    update(time: number, delta: number): void {}
}

export default ContinueState
