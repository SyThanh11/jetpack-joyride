import { Scene } from 'phaser'
import MissileState from '../objects/obstacles/missile/MissileState'
import ZapperManager from '../objects/obstacles/zapper/ZapperManager'
import Missile from '../objects/obstacles/missile/MissileContainer'
import LaserManager from '../objects/obstacles/laser/LaserManager'
import Player from '../objects/player/state/Player'
import MapManager from '../map/MapManager'

export const Events = new Phaser.Events.EventEmitter()

export class Game extends Scene {
    private player: Player
    private zapperManager: ZapperManager
    private laserManager: LaserManager

    private missilePool: Phaser.GameObjects.Group
    private numberMissiles = 0

    private mapManager: MapManager

    constructor() {
        super('Game')
    }

    create() {
        const gameWith = Number(this.game.config.width)
        const gameHeight = Number(this.game.config.height)

        this.physics.world.setBounds(0, 0, gameWith, gameHeight, false, false, true, true)

        this.player = new Player(this, gameWith / 3, gameHeight / 1.45).setDepth(2)

        this.mapManager = new MapManager(this)

        // const coinMap = new CoinMap(this, 900, 400)
        // coinMap.collisionWithPlayer(this.player)
        // this.zapperManager = new ZapperManager(this)
        // this.zapperManager.checkCollisionWithPlayer(this.player)

        // this.laserManager = new LaserManager(this)
        // this.laserManager.checkCollisionWithPlayer(this.player)

        this.createMissilePool()

        // Events.on('laserVisible', (laser: Laser) => {
        //     laser.startAnimations()
        // })

        // this.time.addEvent({
        //     delay: 3000,
        //     callback: () => {
        //         this.laserManager.spawnLaser(0, Phaser.Math.Between(200, 600))
        //     },
        //     callbackScope: this,
        //     loop: true,
        // })

        // this.time.addEvent({
        //     delay: 3000,
        //     callback: () => {
        //         this.zapperManager.spawnZapper(
        //             Number(this.game.config.width) + 100,
        //             Phaser.Math.Between(200, 600)
        //         )
        //     },
        //     callbackScope: this,
        //     loop: true,
        // })

        this.time.addEvent({
            delay: 4000,
            callback: this.spawnMissiles,
            callbackScope: this,
            loop: true,
        })
    }

    private createMissilePool() {
        this.missilePool = this.add.group({
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
            const missile = new Missile(this, -100, -100)
            this.missilePool.add(missile)
        }
    }

    private spawnMissile(x: number, y: number): Missile {
        const missile: Missile = this.missilePool.get(x, y)

        missile.alpha = 1
        missile.scale = 1.5
        missile.setVisible(true)
        missile.setActive(true)
        missile.state = MissileState.ALERT

        const missileAlert = this.physics.add.sprite(x - 64, y, 'missileAlert').setOrigin(0, 0)
        missileAlert.play('missileAlert')
        missile.missileAlert = missileAlert

        missileAlert.on('animationcomplete', () => {
            missile.missileAlert?.destroy()
            missile.missileAlert = null
            this.physics.add.existing(missile)
            missile.state = MissileState.ACTIVE
            missile.playAnimation('missile', 'missileEffect')
        })

        this.physics.add.collider(this.player, missile, missile.triggerMissileEffect)

        return missile
    }

    private spawnMissiles() {
        if (this.numberMissiles >= 3) {
            this.numberMissiles = Phaser.Math.Between(3, 5)
        }

        for (let i = 0; i < this.numberMissiles; i++) {
            const x = Number(this.game.config.width)
            const y = Phaser.Math.Between(200, 600)
            this.spawnMissile(x, y)
        }
        this.numberMissiles++
    }

    update(time: number, delta: number): void {
        this.mapManager.update()
    }
}
