import MusicManager from '../../../music/MusicManager'
import Bullet from '../Bullet'
import Cartouche from '../Cartouche'
import PlayerState from './PlayerState'
import RunState from './RunState'

class Player extends Phaser.GameObjects.Container {
    declare body: Phaser.Physics.Arcade.Body
    private defaultHead: Phaser.GameObjects.Sprite
    private defaultBody: Phaser.GameObjects.Sprite
    private defaultJetpack: Phaser.GameObjects.Sprite
    private bulletPool: Phaser.GameObjects.Group
    private cartouchePool: Phaser.GameObjects.Group
    private bulletEffect: Phaser.GameObjects.Sprite

    private moving = false
    private currentState: PlayerState
    private isFired = false
    public isStartMusic = false

    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        children?: Array<Phaser.GameObjects.GameObject>
    ) {
        super(scene, x, y, children)

        this.init()
    }

    init() {
        this.defaultHead = new Phaser.Physics.Arcade.Sprite(
            this.scene,
            2,
            -8,
            'defaultHead'
        ).setOrigin(0, 0)
        this.defaultBody = new Phaser.Physics.Arcade.Sprite(
            this.scene,
            4,
            6,
            'defaultBody'
        ).setOrigin(0, 0)
        this.defaultJetpack = new Phaser.Physics.Arcade.Sprite(
            this.scene,
            -8,
            0,
            'defaultJetpack'
        ).setOrigin(0, 0)

        this.bulletPool = this.scene.add.group({
            classType: Bullet,
            maxSize: 40,
            runChildUpdate: true,
            createCallback: (obj: Phaser.GameObjects.GameObject) => {
                const bullet = obj as Bullet
                bullet.setActive(false)
                bullet.setVisible(false)
            },
        })
        this.bulletEffect = new Phaser.Physics.Arcade.Sprite(this.scene, 9, 54, 'bulletFlash')

        this.cartouchePool = this.scene.add.group({
            classType: Cartouche,
            maxSize: 30,
            runChildUpdate: true,
            createCallback: (obj: Phaser.GameObjects.GameObject) => {
                const cartouche = obj as Cartouche
                cartouche.setActive(false)
                cartouche.setVisible(false)
            },
        })

        this.add(this.defaultBody)
        this.add(this.defaultJetpack)
        this.add(this.defaultHead)
        this.add(this.bulletEffect)

        this.bulletEffect.setScale(0.6)
        this.bulletEffect.setVisible(false)
        this.scene.physics.world.enable(this)
        this.body.setSize(30, 35)
        this.setScale(Number(this.scene.game.config.width) / 800)
        this.scene.add.existing(this)
        this.body.onCollide = true
        this.body.setCollideWorldBounds(true)

        this.scene.input.on('pointerdown', this.handlePointerDown, this)
        this.scene.input.on('pointerup', this.handlePointerUp, this)
        this.scene.physics.world.on('collide', this.handleCollision)

        this.currentState = new RunState()
        this.currentState.enter(this)
    }

    public setCurrentState(newState: PlayerState) {
        this.currentState = newState
        this.currentState.enter(this)
    }

    public getDefaultBody(): Phaser.GameObjects.Sprite {
        return this.defaultBody
    }

    public getbulletEffect(): Phaser.GameObjects.Sprite {
        return this.bulletEffect
    }

    public handlePointerDown(): void {
        this.currentState.handlePointerDown(this)

        this.isFired = true
        if (this.isStartMusic) {
            MusicManager.getInstance(this.scene).playJetpackFire()
            MusicManager.getInstance(this.scene).stopJetpackStop()
        }
        this.bulletEffect.play('bulletFlash')
        this.bulletEffect.setVisible(true)
    }

    public handlePointerUp(): void {
        this.currentState.handlePointerUp(this)

        this.isFired = false
        if (this.isStartMusic) {
            MusicManager.getInstance(this.scene).playJetpackStop()
            MusicManager.getInstance(this.scene).stopJetpackFire()
        }
        this.bulletEffect.anims.stop()
        this.bulletEffect.setVisible(false)
    }

    public handleCollision = (): void => {
        MusicManager.getInstance(this.scene).playPlayerBones()
        this.currentState.handleCollision(this)
    }

    public playAnimation(keyBody: string, keyHead: string, keyJetpack?: string): void {
        this.defaultBody.play(keyBody)
        this.defaultHead.play(keyHead)
        if (keyJetpack) {
            this.defaultJetpack.play(keyJetpack)
        }
    }

    public start(): void {
        this.moving = true
    }

    public preUpdate(): void {
        if (!this.moving) {
            return
        }

        if (this.x >= Number(this.scene.game.config.width) / 3) {
            this.body.setVelocityX(0)
        }

        this.currentState.update(this)

        if (this.isFired == true) {
            const bullet = this.bulletPool.get()
            const cartouche = this.cartouchePool.get()
            if (bullet) {
                bullet.fire(this.x, this.y)
            }
            if (cartouche) {
                cartouche.fire(this.x, this.y)
            }
        }
    }

    public getJetpack(): Phaser.GameObjects.Sprite {
        return this.defaultJetpack
    }

    public getCurrentState(): PlayerState {
        return this.currentState
    }

    public getAllBullets(): Bullet[] {
        return this.bulletPool.getChildren() as Bullet[]
    }

    public reset(): void {
        this.moving = false
        this.body.setVelocityX(0)
        this.defaultBody.anims.stop()
        this.defaultHead.anims.stop()
        this.bulletEffect.anims.stop()
        this.bulletEffect.setVisible(false)
        this.isFired = false
        this.bulletPool.clear(true, true)
        this.cartouchePool.clear(true, true)
    }
}

export default Player
