import Player from '../../player/state/Player'
import Missile from './Missile'
import MissileState from './MissileState'

class MissileManager {
    private missilePool: Phaser.GameObjects.Group
    private numberMissiles = 1

    constructor(scene: Phaser.Scene) {
        this.missilePool = new Phaser.GameObjects.Group(scene, {
            classType: Missile,
            maxSize: 10,
            runChildUpdate: true,
            createCallback: (obj: Phaser.GameObjects.GameObject) => {
                const missile = obj as Missile
                missile.setActive(false)
                missile.setVisible(false)
            },
        })

        for (let i = 0; i < 10; i++) {
            const missile = new Missile(scene, -100, -100)
            this.missilePool.add(missile)
        }
    }

    public spawnMissile(x: number, y: number, scene: Phaser.Scene): Missile {
        const missile: Missile = this.missilePool.get(x, y)

        missile.alpha = 1
        missile.scale = 3
        missile.setVisible(true)
        missile.setActive(true)
        missile.state = MissileState.ALERT

        const missileAlert = scene.physics.add
            .sprite(x - 64, y, 'missileAlert')
            .setOrigin(0, 0)
            .setScale(2)
        missileAlert.play('missileAlert')
        missile.missileAlert = missileAlert

        missileAlert.on('animationcomplete', () => {
            missile.missileAlert?.destroy()
            missile.missileAlert = null
            scene.physics.add.existing(missile)
            missile.state = MissileState.ACTIVE
            missile.playAnimation('missile', 'missileEffect')
        })
        return missile
    }

    public collisionWithPlayer(player: Player, scene: Phaser.Scene) {
        this.missilePool.getChildren().forEach((missileEle) => {
            const missile = missileEle as Missile
            scene.physics.add.collider(player, missile, missile.triggerMissileEffect)
        })
    }

    public spawnMissiles(scene: Phaser.Scene) {
        if (this.numberMissiles >= 3) {
            this.numberMissiles = Phaser.Math.Between(1, 4)
        }

        for (let i = 0; i < this.numberMissiles; i++) {
            const x = Number(scene.game.config.width)
            const y = Phaser.Math.Between(200, 600)
            this.spawnMissile(x, y, scene)
        }
        this.numberMissiles++
    }
}

export default MissileManager
