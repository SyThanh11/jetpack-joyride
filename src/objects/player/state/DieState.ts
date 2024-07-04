import { Game } from '../../../scenes/Game'
import GameOverState from '../../../scenes/state/GameOverState'
import Player from './Player'
import PlayerState from './PlayerState'

class DieState extends PlayerState {
    enter(player: Player): void {
        player.playerHurt?.play()
        player.playAnimation('dieBody', 'dieHead')
        player.remove(player.getJetpack(), true)

        player.body.setGravityY(1000)
        player.body.setBounce(0.5)
        player.body.setCollideWorldBounds(true)
        player.body.onCollide = false

        player.getDefaultBody().on('animationcomplete-dieBody', () => {
            player.playAnimation('dieBodyTwo', 'dieHeadTwo')
            player.rotation = Phaser.Math.DegToRad(-90)

            player.scene.physics.world.on('worldbounds', () => {
                this.onHitGround(player)
            })
        })

        player.body.setImmovable(false)

        const gameScene = player.scene as Game
        gameScene.score.saveScore()
        gameScene.score.saveCoin()
        gameScene.stateMachine.changeState(new GameOverState(gameScene))
    }

    private onHitGround(player: Player): void {
        if (player.body.onFloor()) {
            player.body.setBounce(0.2)
            player.body.setVelocityX(0)
        }
    }
}

export default DieState
