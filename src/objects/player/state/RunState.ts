import MusicManager from '../../../music/MusicManager'
import DieState from './DieState'
import FlyState from './FlyState'
import Player from './Player'
import PlayerState from './PlayerState'

class RunState extends PlayerState {
    enter(player: Player): void {
        MusicManager.getInstance(player.scene).playRunMetalMusic()
        player.playAnimation('runBody', 'runHead', 'runJetpack')
    }

    handlePointerDown(player: Player): void {
        player.setCurrentState(new FlyState())
    }

    handleCollision(player: Player): void {
        player.setCurrentState(new DieState())
    }
}

export default RunState
