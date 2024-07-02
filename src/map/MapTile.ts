import Phaser from 'phaser'
import Player from '../objects/player/state/Player'
import { Events } from '../scenes/Game'
import ZapperManager from '../objects/obstacles/zapper/ZapperManager'
import Zapper from '../objects/obstacles/zapper/Zapper'
import MissileManager from '../objects/obstacles/missile/MissileManager'

class MapTile extends Phaser.GameObjects.Container {
    public map: Phaser.Tilemaps.Tilemap
    public backgroundLayer: Phaser.Tilemaps.TilemapLayer | null = null

    protected coinContainer: Phaser.GameObjects.Container
    protected zapperContainer: Phaser.GameObjects.Container
    protected missileContainer: Phaser.GameObjects.Container

    protected zapperManager: ZapperManager
    protected missileManager: MissileManager

    private moving = false

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.coinContainer = new Phaser.GameObjects.Container(scene)
        this.zapperContainer = new Phaser.GameObjects.Container(scene)
        this.missileContainer = new Phaser.GameObjects.Container(scene)

        this.zapperManager = new ZapperManager(scene)
        this.missileManager = new MissileManager(scene)

        this.init()

        if (this.backgroundLayer) {
            this.add(this.backgroundLayer)

            this.backgroundLayer.displayHeight = Number(this.scene.game.config.height)
            this.backgroundLayer.displayWidth = this.backgroundLayer.width

            this.backgroundLayer.x = this.x
        }

        this.setDepth(-1)
        this.scene.add.existing(this.coinContainer)
        this.scene.add.existing(this.zapperContainer)
        this.scene.add.existing(this.missileContainer)
        this.scene.add.existing(this)
    }

    public init() {}

    public preUpdate(time: number, deltaTime: number): void {
        if (this.backgroundLayer) {
            this.backgroundLayer.x = this.x
        }
        this.coinContainer.x = this.x
        this.zapperContainer.x = this.x
        this.missileContainer.x = this.x

        if (this.moving) {
            this.x -= ((Number(this.scene.game.config.width) / 3) * deltaTime) / 1000

            if (this.backgroundLayer) {
                if (this.x <= -this.backgroundLayer?.width) {
                    this.coinContainer.list.forEach((coinObject) => {
                        const coin = coinObject as Phaser.Physics.Arcade.Sprite
                        coin.play('coinEffect')
                        coin.setActive(true)
                        coin.setVisible(true)
                    })
                    this.missileContainer.list.forEach((missileObject) => {
                        missileObject.setActive(false)
                    })
                }
            }
        }
    }

    public collisionWithCoin(player: Player): void {
        this.coinContainer.list.forEach((coinObject) => {
            const coin = coinObject as Phaser.Physics.Arcade.Sprite
            this.scene.physics.add.overlap(player, coin, () => {
                coin.play('collectCoin')
                coin.on('animationcomplete-collectCoin', () => {
                    if (coin.active == true) {
                        Events.emit('addCoin', this)
                        coin.setVisible(false)
                        coin.setActive(false)
                    }
                })
            })
        })
    }

    public zapperCollisionWithPlayer(player: Player): void {
        this.zapperContainer.list.forEach((zaggerObject) => {
            const zapper = zaggerObject as Zapper
            zapper.collisionWithPlayer(player)
        })
    }

    public triggerMissiles(player: Player): void {
        this.missileContainer.list.forEach((missileObject) => {
            this.scene.physics.add.overlap(player, missileObject, () => {
                if (!missileObject.active) {
                    this.missileManager.spawnMissiles(this.scene)
                    missileObject.setActive(true)
                }
            })
        })
    }

    public missileCollisionWithPlayer(player: Player) {
        this.missileManager.collisionWithPlayer(player, this.scene)
    }

    public start(): void {
        this.moving = true
    }
}

export default MapTile
