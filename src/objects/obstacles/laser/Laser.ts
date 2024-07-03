import { Events } from '../../../scenes/Game'
import Player from '../../player/state/Player'

class Laser extends Phaser.GameObjects.Container {
    declare body: Phaser.Physics.Arcade.Body
    private laserLeft: Phaser.Physics.Arcade.Sprite
    private laserRight: Phaser.Physics.Arcade.Sprite
    private laserEnergyLeft: Phaser.Physics.Arcade.Sprite
    private laserEnergyRight: Phaser.Physics.Arcade.Sprite
    private laserGLowLeft: Phaser.Physics.Arcade.Sprite
    private laserGLowRight: Phaser.Physics.Arcade.Sprite
    private laserPower: Phaser.Physics.Arcade.Sprite
    private laserWarning: Phaser.Physics.Arcade.Sprite

    private animationsStarted: boolean

    private gameWidth: number

    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        children?: Phaser.GameObjects.GameObject[]
    ) {
        super(scene, x, y, children)
        this.animationsStarted = false
        this.init()
    }

    public init() {
        this.gameWidth = Number(this.scene.game.config.width)
        this.laserLeft = this.createSprite(0, 0, 'laser')
        this.laserRight = this.createSprite(0, 0, 'laser')
        this.laserEnergyLeft = this.createSprite(0, 0, 'laserEnergy')
        this.laserEnergyRight = this.createSprite(0, 0, 'laserEnergy')
        this.laserPower = this.createSprite(0, 0, 'laserPower', 8)
        this.laserWarning = this.createSprite(0, 0, 'laserWarning')
        this.laserGLowLeft = this.createSprite(0, 0, 'laserPower', 0)
        this.laserGLowRight = this.createSprite(0, 0, 'laserPower', 0)

        this.add(this.laserWarning)
        this.add(this.laserEnergyLeft)
        this.add(this.laserEnergyRight)
        this.add(this.laserPower)
        this.add(this.laserGLowLeft)
        this.add(this.laserGLowRight)
        this.add(this.laserLeft)
        this.add(this.laserRight)

        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(0.7)
        this.body.setSize(this.gameWidth / 0.7, 0)

        this.setupSprites()
        this.positionLaserWarning()
    }

    private createSprite(
        x: number,
        y: number,
        texture: string,
        frame?: number
    ): Phaser.Physics.Arcade.Sprite {
        return new Phaser.Physics.Arcade.Sprite(this.scene, x, y, texture, frame).setOrigin(
            0.5,
            0.5
        )
    }

    private setupSprites() {
        this.laserLeft.x = -this.laserLeft.width
        this.laserLeft.x = 0

        this.laserRight.x = this.gameWidth / 0.7 + this.laserLeft.width
        this.laserRight.flipX = true
        this.laserEnergyLeft.x = this.laserLeft.width
        this.laserEnergyRight.x = this.gameWidth / 0.7 - this.laserLeft.width
        this.laserEnergyRight.flipX = true
        this.laserGLowLeft.x = this.laserLeft.width - this.laserGLowLeft.width / 2
        this.laserGLowRight.x =
            this.gameWidth / 0.7 - this.laserLeft.width + this.laserGLowRight.width / 2
        this.laserGLowRight.flipX = true
        this.laserGLowLeft.setScale(4)
        this.laserGLowRight.setScale(4)
        this.laserPower.x = this.gameWidth / 0.7 / 2
        this.laserPower.setScale(4)
        this.laserPower.displayWidth =
            this.gameWidth / 0.7 - this.laserLeft.width - this.laserRight.width

        this.laserPower.setVisible(false)
        this.laserGLowLeft.setVisible(false)
        this.laserGLowRight.setVisible(false)
        this.laserWarning.setVisible(false)
        this.laserEnergyLeft.setVisible(false)
        this.laserEnergyRight.setVisible(false)
    }

    private positionLaserWarning() {
        const centerX = (this.laserLeft.x + this.laserRight.x) / 2
        const centerY = (this.laserLeft.y + this.laserRight.y) / 2
        const distance = Phaser.Math.Distance.Between(
            this.laserLeft.x,
            this.laserLeft.y,
            this.laserRight.x,
            this.laserRight.y
        )

        this.laserWarning.setPosition(centerX, centerY)
        this.laserWarning.displayWidth = distance
        this.laserWarning.displayHeight = this.laserWarning.displayHeight / 2
    }

    public startAnimations() {
        if (this.animationsStarted) return
        this.animationsStarted = true

        this.scene.tweens.add({
            targets: this.laserLeft,
            x: this.laserRight.width,
            duration: 2000,
            ease: 'Power2',
        })

        this.scene.tweens.add({
            targets: this.laserRight,
            x: this.gameWidth / 0.7 - this.laserRight.width,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                this.laserEnergyLeft.setVisible(true)
                this.laserEnergyRight.setVisible(true)
                this.laserWarning.setVisible(true)
                this.playInitialAnimations()
                this.addTweenAnimations()
            },
        })

        this.laserLeft.on('animationcomplete-laser', () => this.onInitialAnimationComplete())
        this.laserPower.on('animationcomplete-laserPower', () => this.onPowerAnimationComplete())
    }

    private playInitialAnimations() {
        this.laserEnergyLeft.play('laserEnergy')
        this.laserEnergyRight.play('laserEnergy')
        this.laserLeft.play('laser')
        this.laserRight.play('laser')
        this.laserWarning.play('laserWarning')
    }

    private addTweenAnimations() {
        const originalWidthLeft = this.laserEnergyLeft.displayWidth
        const originalHeightLeft = this.laserEnergyLeft.displayHeight

        const originalWidthRight = this.laserEnergyRight.displayWidth
        const originalHeightRight = this.laserEnergyRight.displayHeight

        this.scene.tweens.add({
            targets: this.laserEnergyLeft,
            displayWidth: this.laserLeft.displayWidth,
            displayHeight: this.laserLeft.displayHeight,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                this.laserEnergyLeft.displayWidth = originalWidthLeft
                this.laserEnergyLeft.displayHeight = originalHeightLeft
            },
        })

        this.scene.tweens.add({
            targets: this.laserEnergyRight,
            displayWidth: this.laserRight.displayWidth,
            displayHeight: this.laserRight.displayHeight,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                this.laserEnergyRight.displayWidth = originalWidthRight
                this.laserEnergyRight.displayHeight = originalHeightRight
            },
        })
    }

    private onInitialAnimationComplete() {
        this.laserEnergyLeft.setVisible(false)
        this.laserEnergyRight.setVisible(false)
        this.laserWarning.setVisible(false)

        this.laserPower.setVisible(true)
        this.laserGLowLeft.setVisible(true)
        this.laserGLowRight.setVisible(true)
        this.laserPower.play('laserPower')
        this.laserGLowLeft.play('laserGlow')
        this.laserGLowRight.play('laserGlow')

        this.scene.physics.world.enable(this.laserPower)
        this.laserPower.body?.setSize(this.laserPower.width, 24)
        this.laserPower.setImmovable(true)
    }

    private onPowerAnimationComplete() {
        this.scene.tweens.add({
            targets: this.laserLeft,
            x: -this.laserRight.width,
            duration: 1000,
        })

        this.scene.tweens.add({
            targets: this.laserRight,
            x: this.gameWidth / 0.7 + this.laserRight.width,
            duration: 1000,
        })

        this.laserPower.setVisible(false)
        this.laserGLowLeft.setVisible(false)
        this.laserGLowRight.setVisible(false)
        this.scene.physics.world.disable(this.laserPower)

        this.setActive(false)
        this.animationsStarted = false
    }

    preUpdate() {
        if (this.isWithinCameraView() && !this.animationsStarted) {
            Events.emit('laserVisible', this)
        }
    }

    private isWithinCameraView(): boolean {
        const camera = this.scene.cameras.main
        const bounds = this.getBounds()
        return (
            bounds.right >= camera.worldView.left &&
            bounds.left <= camera.worldView.right &&
            bounds.bottom >= camera.worldView.top &&
            bounds.top <= camera.worldView.bottom
        )
    }

    public checkCollisionWithPlayer(player: Player): void {
        this.scene.physics.world.addCollider(player, this.laserPower)
    }
}

export default Laser
