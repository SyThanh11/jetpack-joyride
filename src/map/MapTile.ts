import Bullet from '../objects/player/Bullet'
import FallState from '../objects/player/state/FallState'
import Player from '../objects/player/state/Player'
import TakeOffState from '../objects/player/state/TakeOffState'

class MapTile extends Phaser.GameObjects.Container {
    public backgroundLayer: Phaser.Tilemaps.TilemapLayer | null
    public colliderLayer: Phaser.Tilemaps.TilemapLayer | null
    public map: Phaser.Tilemaps.Tilemap

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.init()
    }

    public init() {}

    preUpdate(time: number, deltaTime: number): void {
        this.x -= (400 * deltaTime) / 1000
        if (this.backgroundLayer) {
            this.backgroundLayer.x = this.x
            this.backgroundLayer.y = this.y
        }
    }

    public getBoundsRight(): number {
        return this.backgroundLayer?.getBounds().right || 0
    }

    public getPositionRight(): number {
        return this.x + this.getBoundsRight()
    }

    public collisionWithPlayer(player: Player) {
        if (this.colliderLayer) {
            this.scene.physics.add.collider(player, this.colliderLayer, () => {
                if (player.getCurrentState() instanceof FallState) {
                    player.setCurrentState(new TakeOffState())
                }
            })
        }
    }

    public collisionWithBullet(bullet: Bullet) {
        if (this.colliderLayer) {
            this.scene.physics.add.collider(bullet, this.colliderLayer, () => {
                console.log('Hi')
            })
        }
    }
}

export default MapTile
