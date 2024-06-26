import Player from '../../player/state/Player'
import Laser from './Laser'

class LaserManager {
    private laserPool: Phaser.GameObjects.Group

    constructor(scene: Phaser.Scene) {
        this.laserPool = new Phaser.GameObjects.Group(scene, {
            classType: Laser,
            maxSize: 5,
            runChildUpdate: true,
            createCallback: (obj: Phaser.GameObjects.GameObject) => {
                const laser = obj as Laser
                laser.setActive(false)
                laser.setVisible(false)
            },
        })

        this.laserPool.addMultiple([
            new Laser(scene, -100, -100),
            new Laser(scene, -100, -100),
            new Laser(scene, -100, -100),
            new Laser(scene, -100, -100),
            new Laser(scene, -100, -100),
        ])
    }

    public spawnLaser(x = 0, y = 500): Laser | null {
        const laser: Laser = this.laserPool.get(x, y) as Laser
        if (!laser) {
            alert('Out of stock')
            return null
        }
        laser.setActive(true)
        laser.setVisible(true)
        return laser
    }

    public checkCollisionWithPlayer(player: Player): void {
        this.laserPool.getChildren().forEach((laser) => {
            (laser as Laser).checkCollisionWithPlayer(player)
        })
    }
}

export default LaserManager
