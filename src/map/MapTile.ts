import Phaser from 'phaser'
import Player from '../objects/player/state/Player'
import { Events } from '../scenes/Game'
import ZapperManager from '../objects/obstacles/zapper/ZapperManager'
import Zapper from '../objects/obstacles/zapper/Zapper'
import MissileManager from '../objects/obstacles/missile/MissileManager'
import LaserManager from '../objects/obstacles/laser/LaserManager'
import CONST from '../const/const'

class MapTile extends Phaser.GameObjects.Container {
    protected map: Phaser.Tilemaps.Tilemap
    protected backgroundLayer: Phaser.Tilemaps.TilemapLayer | null = null
    protected backgroundLayerTwo: Phaser.Tilemaps.TilemapLayer | null = null
    protected backgroundLayerThree: Phaser.Tilemaps.TilemapLayer | null = null
    protected backgroundLayerFour: Phaser.Tilemaps.TilemapLayer | null = null

    protected alarmContainer: Phaser.GameObjects.Container
    protected coinContainer: Phaser.GameObjects.Container
    protected zapperContainer: Phaser.GameObjects.Container
    protected missileContainer: Phaser.GameObjects.Container
    protected laserContainer: Phaser.GameObjects.Container

    protected zapperManager: ZapperManager
    protected missileManager: MissileManager
    protected laserManager: LaserManager

    protected moving = false
    protected havingCoinTile = false
    protected havingMissileTile = false
    protected havingZaggerTile = false
    protected havingLaserTile = false
    protected havingAlarmTile = false

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
        this.setupBackgroundLayers()

        const scaleFactor = Math.min(CONST.GAME_WIDTH, CONST.GAME_HEIGHT) / 1000

        if (this.havingCoinTile) {
            const coinsObjects = this.map.createFromObjects('Coin Object Layer', {
                name: 'coin',
                key: 'coin',
                classType: Phaser.Physics.Arcade.Sprite,
            })

            coinsObjects.forEach((coinObject) => {
                const coin = coinObject as Phaser.Physics.Arcade.Sprite
                this.scene.physics.add.existing(coin)
                coin.setPosition(coin.x, coin.y * scaleFactor)
                coin.setActive(true)

                const tintColors = [0x00c0ff, 0xffffff]
                const randomColor = Phaser.Math.RND.pick(tintColors)
                coin.setTint(randomColor)

                coin.play('coinEffect')
                this.coinContainer.add(coin)
            })
        }

        if (this.havingMissileTile) {
            const missileTriggerObjects = this.map.createFromObjects('Trigger Missile', {
                name: 'missile',
                classType: Phaser.Physics.Arcade.Sprite,
            })

            missileTriggerObjects.forEach((missileTriggerObject) => {
                const missileTrigger = missileTriggerObject as Phaser.Physics.Arcade.Sprite

                this.scene.physics.add.existing(missileTrigger)
                missileTrigger.setActive(false)
                missileTrigger.setVisible(false)
                this.missileContainer.add(missileTrigger)
            })
        }

        if (this.havingZaggerTile) {
            const zaggerObjects = this.map.createFromObjects('Zagger Object Layer', {
                name: 'zagger',
                classType: Phaser.Physics.Arcade.Sprite,
            })

            zaggerObjects.forEach((zaggerObject) => {
                const zagger = zaggerObject as Phaser.Physics.Arcade.Sprite
                zagger.setVisible(false)
                if (zagger) {
                    const spawnedZagger = this.zapperManager.spawnZapper(
                        zagger.x,
                        zagger.y * scaleFactor
                    )
                    if (spawnedZagger) {
                        this.scene.physics.add.existing(spawnedZagger)
                        this.zapperContainer.add(spawnedZagger)
                    }
                }
            })
        }

        if (this.havingLaserTile) {
            const laserTriggerObjects = this.map.createFromObjects('Trigger Laser', {
                name: 'laser',
                classType: Phaser.Physics.Arcade.Sprite,
            })

            laserTriggerObjects.forEach((laserTriggerObject) => {
                const laserTrigger = laserTriggerObject as Phaser.Physics.Arcade.Sprite

                this.scene.physics.add.existing(laserTrigger)
                laserTrigger.setActive(false)
                laserTrigger.setVisible(false)
                this.laserContainer.add(laserTrigger)
            })
        }

        if (this.havingAlarmTile) {
            const alarmObjects = this.map.createFromObjects('Alarm Light Layer', {
                name: 'alarm',
                key: 'alarmLightGlow_TVOS',
                classType: Phaser.Physics.Arcade.Sprite,
            })

            alarmObjects.forEach((alarmObject) => {
                const alarm = alarmObject as Phaser.Physics.Arcade.Sprite
                alarm.setPosition(alarm.x, alarm.y * scaleFactor)
                alarm.setScale(scaleFactor)
                alarm.play('alarmLightGlow_TVOS')
                this.scene.physics.add.existing(alarm)
                this.alarmContainer.add(alarm)
            })
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

    public getBackgroundLayer(): Phaser.Tilemaps.TilemapLayer | undefined {
        if (this.backgroundLayer) {
            return this.backgroundLayer
        }
    }

    private setupBackgroundLayers(): void {
        const layers = [
            this.backgroundLayerFour,
            this.backgroundLayerThree,
            this.backgroundLayer,
            this.backgroundLayerTwo,
        ]
        layers.forEach((layer) => {
            if (layer) {
                this.add(layer)
                layer.displayHeight = Number(this.scene.game.config.height)
                layer.displayWidth = layer.width
                layer.x = this.x
                layer.y = this.y
            }
        })
    }

    private updateBackgroundLayers(): void {
        const layers = [
            this.backgroundLayerFour,
            this.backgroundLayerThree,
            this.backgroundLayer,
            this.backgroundLayerTwo,
        ]
        layers.forEach((layer) => {
            if (layer) {
                layer.x = this.x
            }
        })
    }

    private setupContainers(): void {
        [
            this.alarmContainer,
            this.coinContainer,
            this.zapperContainer,
            this.missileContainer,
            this.laserContainer,
        ].forEach((container) => (container.x = this.x))
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

    public preUpdate(time: number, deltaTime: number): void {
        this.updateBackgroundLayers()
        this.setupContainers()

        if (this.moving) {
            this.x -= ((Number(this.scene.game.config.width) / 3) * deltaTime) / 1000

            if (this.backgroundLayer && this.x <= -this.backgroundLayer.width) {
                this.resetObjects()
            }
        }
    }

    public collisionWithCoin(player: Player): void {
        this.coinContainer.list.forEach((coinObject) => {
            const coin = coinObject as Phaser.Physics.Arcade.Sprite
            this.scene.physics.add.overlap(player, coin, () => {
                coin.play('collectCoin')
                coin.on(CONST.ANIMATION_COMPLETE_KEY + 'collectCoin', () => {
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

    public reset(): void {
        this.resetObjects()
        this.moving = false
        if (this.backgroundLayer) {
            this.backgroundLayer.x = this.x
        }
    }
}

export default MapTile
