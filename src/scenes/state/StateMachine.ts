import State from './GamePlayState'

class StateMachine {
    private currentState?: State

    constructor(private scene: Phaser.Scene) {}

    public changeState(newState: State): void {
        if (this.currentState) {
            this.currentState.exit()
        }

        this.currentState = newState
        this.currentState.enter()
    }

    public update(time: number, delta: number): void {
        if (this.currentState) {
            this.currentState.update(time, delta)
        }
    }
}

export default StateMachine
