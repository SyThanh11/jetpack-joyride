import { Scene } from 'phaser'
import MissileState from '../objects/obstacles/missile/MissileState'
import ZapperManager from '../objects/obstacles/zapper/ZapperManager'
import Missile from '../objects/obstacles/missile/MissileContainer'
import Laser from '../objects/obstacles/laser/Laser'
import LaserManager from '../objects/obstacles/laser/LaserManager'
import Player from '../objects/player/state/Player'

export const Events = new Phaser.Events.EventEmitter()

export class Game extends Scene {
    private player: Player
    private zapperManager: ZapperManager
    private laserManager: LaserManager

    private missilePool: Phaser.GameObjects.Group
    private numberMissiles = 0

    constructor() {
        super('Game')
    }

    preload() {
        this.load.spritesheet('defaultBody', 'assets/Characters/Barry/defaultBody.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('defaultHead', 'assets/Characters/Barry/defaultHead.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('defaultJetpack', 'assets/Characters/Jetpacks/jetpackDefault.png', {
            frameWidth: 128 / 4,
            frameHeight: 176 / 4,
        })

        this.load.spritesheet('missile', 'assets/Obstacles/Missile/missile.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('missileAlert', 'assets/Obstacles/Missile/missileAlert.png', {
            frameWidth: 256 / 4,
            frameHeight: 128 / 2,
        })
        this.load.spritesheet('missileEffect', 'assets/Obstacles/Missile/missileEffects.png', {
            frameWidth: 256 / 4,
            frameHeight: 50,
        })
        this.load.spritesheet('missileExplosion', 'assets/Obstacles/Missile/missileExplosion.png', {
            frameWidth: 512 / 8,
            frameHeight: 64,
        })

        this.load.spritesheet('zapper', 'assets/Obstacles/Zapper/orbAnim.png', {
            frameWidth: 248 / 4,
            frameHeight: 42,
        })
        this.load.spritesheet('zapEffect', 'assets/Obstacles/Zapper/RegularZappers/zapEffect.png', {
            frameWidth: 1028,
            frameHeight: 117,
        })
        this.load.spritesheet('glow', 'assets/Obstacles/Zapper/RegularZappers/glow.png', {
            frameWidth: 512 / 4,
            frameHeight: 512 / 4,
        })

        this.load.spritesheet('laser', 'assets/Obstacles/Laser/laser.png', {
            frameWidth: 512 / 4,
            frameHeight: 512 / 4,
        })
        this.load.spritesheet('laserEnergy', 'assets/Obstacles/Laser/laserEnergy.png', {
            frameWidth: 1024 / 4,
            frameHeight: 512 / 2,
        })
        this.load.spritesheet('laserPower', 'assets/Obstacles/Laser/laserPower.png', {
            frameWidth: 256 / 4,
            frameHeight: 256 / 4,
        })
        this.load.spritesheet('laserWarning', 'assets/Obstacles/Laser/laserWarning.png', {
            frameWidth: 256 / 4,
            frameHeight: 32,
        })
    }

    create() {
        this.createAnimation('runBody', 'defaultBody', 0, 3, 10, -1)
        this.createAnimation('runHead', 'defaultHead', 0, 3, 10, -1)
        this.createAnimation('runJetpack', 'defaultJetpack', 0, 3, 10, -1)
        this.createAnimation('flyBody', 'defaultBody', 4, 7, 10, -1)
        this.createAnimation('flyHead', 'defaultHead', 4, 7, 10, -1)
        this.createAnimation('flyJetpack', 'defaultJetpack', 4, 7, 10, -1)
        this.createAnimation('fallBody', 'defaultBody', 8, 11, 10)
        this.createAnimation('fallHead', 'defaultHead', 8, 11, 10)
        this.createAnimation('fallJetpack', 'defaultJetpack', 8, 11, 10)
        this.createAnimation('takeOffBody', 'defaultBody', 12, 15, 10)
        this.createAnimation('takeOffHead', 'defaultHead', 12, 15, 10)
        this.createAnimation('takeOffJetpack', 'defaultJetpack', 12, 15, 10)
        this.createAnimation('dieBody', 'defaultBody', 24, 27, 10)
        this.createAnimation('dieHead', 'defaultHead', 24, 27, 10)
        this.createAnimation('dieBodyTwo', 'defaultBody', 28, 31, 10)
        this.createAnimation('dieHeadTwo', 'defaultHead', 28, 31, 10)

        this.createAnimation('missile', 'missile', 0, 3, 5)
        this.createAnimation('missileAlert', 'missileAlert', 0, 7, 5)
        this.createAnimation('missileEffect', 'missileEffect', 0, 3, 6, -1)
        this.createAnimation('missileExplosion', 'missileExplosion', 0, 7, 10)

        this.createAnimation('zapper', 'zapper', 0, 3, 5)
        this.createAnimation('glow', 'glow', 0, 15, 10, -1)

        this.createAnimation('laser', 'laser', 0, 11, 10)
        this.createAnimation('laserEnergy', 'laserEnergy', 0, 7, 10)
        this.createAnimation('laserWarning', 'laserWarning', 0, 3, 10, 1)
        this.createAnimation('laserGlow', 'laserPower', 0, 7, 10)
        this.createAnimation('laserPower', 'laserPower', 8, 15, 10)

        this.physics.world.setBounds(0, 0, innerWidth, innerHeight, false, false, true, true)
        this.player = new Player(this, 100, 700)
        this.zapperManager = new ZapperManager(this)
        this.zapperManager.checkCollisionWithPlayer(this.player)
        this.laserManager = new LaserManager(this)
        this.laserManager.checkCollisionWithPlayer(this.player)

        this.createMissilePool()

        Events.on('laserVisible', (laser: Laser) => {
            laser.startAnimations()
        })

        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.laserManager.spawnLaser(0, Phaser.Math.Between(50, 600))
            },
            callbackScope: this,
            loop: true,
        })

        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.zapperManager.spawnZapper(1800, Phaser.Math.Between(50, 600))
            },
            callbackScope: this,
            loop: true,
        })

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

        const missileAlert = this.physics.add.sprite(x - 160, y, 'missileAlert').setOrigin(0, 0)
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
            const x = 1800
            const y = Phaser.Math.Between(20, 700)
            this.spawnMissile(x, y)
        }
        this.numberMissiles++
    }

    createAnimation(
        key: string,
        keySprite: string,
        startFrame: number,
        endFrame: number,
        frameRate: number,
        repeat?: number
    ) {
        this.anims.create({
            key: key,
            frames: this.anims.generateFrameNumbers(keySprite, {
                start: startFrame,
                end: endFrame,
            }),
            frameRate: frameRate,
            repeat: repeat,
        })
    }
}
