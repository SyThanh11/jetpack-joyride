import Bullet from '../Bullet'
import Cartouche from '../Cartouche'
import PlayerState from './PlayerState'
import RunState from './RunState'

class Player extends Phaser.GameObjects.Container {
    declare body: Phaser.Physics.Arcade.Body
    private defaultHead: Phaser.Physics.Arcade.Sprite
    private defaultBody: Phaser.Physics.Arcade.Sprite
    private defaultJetpack: Phaser.Physics.Arcade.Sprite
    private shadow: Phaser.Physics.Arcade.Image
    private bulletPool: Phaser.GameObjects.Group
    private cartouchePool: Phaser.GameObjects.Group
    private bulletEffect: Phaser.Physics.Arcade.Sprite

    private currentState: PlayerState
    private isFired = false
    public score = 0

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
        // this.shadow = new Phaser.Physics.Arcade.Image(this.scene, 15, 38, 'shadow')
        // this.shadow.scaleX = 0.8
        this.bulletPool = this.scene.add.group({
            classType: Bullet,
            maxSize: 40,
            runChildUpdate: true,
        })
        this.bulletEffect = new Phaser.Physics.Arcade.Sprite(this.scene, 9, 54, 'bulletFlash')
        this.cartouchePool = this.scene.add.group({
            classType: Cartouche,
            maxSize: 30,
            runChildUpdate: true,
        })

        this.add(this.defaultBody)
        this.add(this.defaultJetpack)
        this.add(this.defaultHead)
        // this.add(this.shadow)
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

    public getDefaultBody(): Phaser.Physics.Arcade.Sprite {
        return this.defaultBody
    }

    public handlePointerDown(): void {
        this.currentState.handlePointerDown(this)
        this.isFired = true
        this.bulletEffect.play('bulletFlash')
        this.bulletEffect.setVisible(true)
    }

    public handlePointerUp(): void {
        this.currentState.handlePointerUp(this)
        this.isFired = false
        this.bulletEffect.anims.stop()
        this.bulletEffect.setVisible(false)
    }

    public handleCollision = (): void => {
        this.currentState.handleCollision(this)
    }

    public playAnimation(keyBody: string, keyHead: string, keyJetpack?: string): void {
        this.defaultBody.play(keyBody)
        this.defaultHead.play(keyHead)
        if (keyJetpack) {
            this.defaultJetpack.play(keyJetpack)
        }
    }

    public preUpdate(): void {
        if (this.x >= Number(this.scene.game.config.width) / 3) {
            this.body.setVelocityX(0)
        }

        // const scaleFactor = this.y / 1000 + 0.3

        // this.shadow.scaleX = scaleFactor
        // this.shadow.scaleY = scaleFactor

        // this.shadow.y = -this.y + 40

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

    public getJetpack(): Phaser.Physics.Arcade.Sprite {
        return this.defaultJetpack
    }

    public getCurrentState(): PlayerState {
        return this.currentState
    }

    public getAllBullets(): Bullet[] {
        return this.bulletPool.getChildren() as Bullet[]
    }
}

export default Player
