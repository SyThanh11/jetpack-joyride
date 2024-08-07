import Game from '../Game'
import State from './GamePlayState'
import PlayState from './PlayState'

class ContinueState implements State {
    constructor(private scene: Game) {}

    public enter(): void {
        console.log('Begin Continue State')
        this.scene.scene.resume('Game')
        this.scene.player.isStartMusic = true
        this.scene.stateMachine.changeState(new PlayState(this.scene))
    }

    public exit(): void {
        console.log('End Continue State')
    }

    public update(time: number, delta: number): void {}
}

export default ContinueState
