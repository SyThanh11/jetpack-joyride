import PlayerState from './PlayerState'
import RunState from './RunState'
import FlyState from './FlyState'
import DieState from './DieState'
import Player from './Player'
import CONST from '../../../const/const'

class TakeOffState extends PlayerState {
    enter(player: Player): void {
        player.fallBounce?.play()
        player.playAnimation('takeOffBody', 'takeOffHead', 'takeOffJetpack')
        player.body.setGravityY(0)
        player.body.setVelocityY(0)

        player.getDefaultBody().on(CONST.ANIMATION_COMPLETE_KEY + 'takeOffBody', () => {
            this.handleAnimationComplete(player)
        })
    }

    handleAnimationComplete(player: Player): void {
        player.setCurrentState(new RunState())
    }

    handlePointerDown(player: Player): void {
        player.setCurrentState(new FlyState())
    }

    handleCollision(player: Player): void {
        player.setCurrentState(new DieState())
    }
}

export default TakeOffState
