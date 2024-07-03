import Phaser from 'phaser'
import Player from '../objects/player/state/Player'
import { Events } from '../scenes/Game'
import ZapperManager from '../objects/obstacles/zapper/ZapperManager'
import Zapper from '../objects/obstacles/zapper/Zapper'
import MissileManager from '../objects/obstacles/missile/MissileManager'
import LaserManager from '../objects/obstacles/laser/LaserManager'

class MapTile extends Phaser.GameObjects.Container {
    public map: Phaser.Tilemaps.Tilemap
    public backgroundLayer: Phaser.Tilemaps.TilemapLayer | null = null
    public backgroundLayerTwo: Phaser.Tilemaps.TilemapLayer | null = null

    protected alarmContainer: Phaser.GameObjects.Container

    protected coinContainer: Phaser.GameObjects.Container
    protected zapperContainer: Phaser.GameObjects.Container
    protected missileContainer: Phaser.GameObjects.Container
    protected laserContainer: Phaser.GameObjects.Container

    protected zapperManager: ZapperManager
    protected missileManager: MissileManager
    protected laserManager: LaserManager

    private moving = false

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.alarmContainer = new Phaser.GameObjects.Container(scene)
        this.coinContainer = new Phaser.GameObjects.Container(scene)
        this.zapperContainer = new Phaser.GameObjects.Container(scene)
        this.missileContainer = new Phaser.GameObjects.Container(scene)
        this.laserContainer = new Phaser.GameObjects.Container(scene)

        this.zapperManager = new ZapperManager(scene)
        this.missileManager = new MissileManager(scene)
        this.laserManager = new LaserManager(scene)

        this.init()

        if (this.backgroundLayer) {
            this.add(this.backgroundLayer)

            this.backgroundLayer.displayHeight = Number(this.scene.game.config.height)
            this.backgroundLayer.displayWidth = this.backgroundLayer.width

            this.backgroundLayer.x = this.x
            this.backgroundLayer.y = this.y
        }

        if (this.backgroundLayerTwo) {
            this.add(this.backgroundLayerTwo)

            this.backgroundLayerTwo.displayHeight = Number(this.scene.game.config.height)
            this.backgroundLayerTwo.displayWidth = this.backgroundLayerTwo.width

            this.backgroundLayerTwo.x = this.x
            this.backgroundLayerTwo.y = this.y
        }

        this.setDepth(-1)
        this.scene.add.existing(this.alarmContainer)
        this.scene.add.existing(this.coinContainer)
        this.scene.add.existing(this.zapperContainer)
        this.scene.add.existing(this.missileContainer)
        this.scene.add.existing(this.laserContainer)
        this.scene.add.existing(this)
    }

    public init() {}

    public preUpdate(time: number, deltaTime: number): void {
        if (this.backgroundLayer) {
            this.backgroundLayer.x = this.x
        }
        if (this.backgroundLayerTwo) {
            this.backgroundLayerTwo.x = this.x
        }
        this.alarmContainer.x = this.x
        this.coinContainer.x = this.x
        this.zapperContainer.x = this.x
        this.missileContainer.x = this.x
        this.laserContainer.x = this.x

        if (this.moving) {
            this.x -= ((Number(this.scene.game.config.width) / 3) * deltaTime) / 1000

            if (this.backgroundLayer && this.x <= -this.backgroundLayer.width) {
                this.resetObjects()
            }
        }
    }

    private resetObjects(): void {
        this.coinContainer.list.forEach((coinObject) => {
            const coin = coinObject as Phaser.Physics.Arcade.Sprite
            coin.play('coinEffect')
            coin.setActive(true)
            coin.setVisible(true)
        })
        this.missileContainer.list.forEach((missileObject) => {
            missileObject.setActive(false)
        })
        this.laserContainer.list.forEach((laserObject) => {
            laserObject.setActive(false)
        })
    }

    public collisionWithCoin(player: Player): void {
        this.coinContainer.list.forEach((coinObject) => {
            const coin = coinObject as Phaser.Physics.Arcade.Sprite
            this.scene.physics.add.overlap(player, coin, () => {
                coin.play('collectCoin')
                coin.on('animationcomplete-collectCoin', () => {
                    if (coin.active) {
                        Events.emit('addCoin', this)
                        coin.setVisible(false)
                        coin.setActive(false)
                    }
                })
            })
        })
    }

    public zapperCollisionWithPlayer(player: Player): void {
        this.zapperContainer.list.forEach((zapperObject) => {
            const zapper = zapperObject as Zapper
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

    public triggerLasers(player: Player): void {
        this.laserContainer.list.forEach((laserObject) => {
            this.scene.physics.add.overlap(player, laserObject, () => {
                if (!laserObject.active) {
                    this.laserManager.spawnLasers(this.scene)
                    laserObject.setActive(true)
                }
            })
        })
    }

    public missileCollisionWithPlayer(player: Player): void {
        this.missileManager.collisionWithPlayer(player, this.scene)
    }

    public laserCollisionWithPlayer(player: Player): void {
        this.laserManager.collisionWithPlayer(player)
    }

    public start(): void {
        this.moving = true
    }

    public stop(): void {
        this.moving = false
    }
}

export default MapTile
