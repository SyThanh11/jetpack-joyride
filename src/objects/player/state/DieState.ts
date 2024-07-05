import { Game } from '../../../scenes/Game'
import GameOverState from '../../../scenes/state/GameOverState'
import Player from './Player'
import PlayerState from './PlayerState'

class DieState extends PlayerState {
    private heightOrigin: number

    enter(player: Player): void {
        player.playerHurt?.play()
        player.setAlpha(0.5)
        player.playAnimation('dieBody', 'dieHead')
        player.remove(player.getJetpack(), true)

        this.heightOrigin = player.body.height

        player.body.setGravityY(0)
        player.body.setSize(0, 0)

        const initialBounceForce = -200
        player.body.setVelocityY(initialBounceForce)

        const bounceDuration = 100
        const bounceDistanceX = 100
        const bounceEase = Phaser.Math.Easing.Quadratic.Out

        player.scene.tweens.add({
            targets: player.body,
            y: player.y - 40,
            x: player.x + bounceDistanceX,
            duration: bounceDuration,
            ease: bounceEase,
            onComplete: () => {
                player.body.setImmovable(false)
                player.playAnimation('dieBodyTwo', 'dieHeadTwo')
                player.setAngle(90)
                player.body.setGravityY(1000)
            },
        })

        const gameScene = player.scene as Game
        gameScene.score.saveScore()
        gameScene.score.saveCoin()
        gameScene.stateMachine.changeState(new GameOverState(gameScene))
    }

    update(player: Player): void {
        player.getbulletEffect().setVisible(false)
        if (player.y - this.heightOrigin / 2 >= Number(player.scene.game.config.height) / 1.45) {
            player.body.setGravityY(0)
            player.body.setVelocity(0)
        }
    }
}

export default DieState
