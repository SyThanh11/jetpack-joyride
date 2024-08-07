import MusicManager from '../../../music/MusicManager'
import DieState from './DieState'
import FallState from './FallState'
import Player from './Player'
import PlayerState from './PlayerState'

class FlyState extends PlayerState {
    enter(player: Player): void {
        MusicManager.getInstance(player.scene).stopRunMetalMusic()
        player.playAnimation('flyBody', 'flyHead', 'flyJetpack')
        player.body.setVelocityY(-Number(player.scene.game.config.width) / 4)
        player.body.setGravityY(0)
    }

    handlePointerUp(player: Player): void {
        player.setCurrentState(new FallState())
    }

    handleCollision(player: Player): void {
        player.setCurrentState(new DieState())
    }

    update(player: Player): void {
        if (player.y <= Number(player.scene.game.config.height) / 5) {
            player.y = Number(player.scene.game.config.height) / 5
        }
    }
}

export default FlyState
