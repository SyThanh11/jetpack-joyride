import MissileState from './MissileState'

class Missile extends Phaser.GameObjects.Container {
    declare body: Phaser.Physics.Arcade.Body
    private missile: Phaser.Physics.Arcade.Sprite
    private missileEffect: Phaser.Physics.Arcade.Sprite

    public currentState: MissileState
    public missileAlert: Phaser.Physics.Arcade.Sprite | null

    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        children?: Phaser.GameObjects.GameObject[]
    ) {
        super(scene, x, y, children)

        this.init()
    }

    init() {
        this.missile = new Phaser.Physics.Arcade.Sprite(this.scene, 0, -2, 'missile', 0).setOrigin(
            0,
            0
        )
        this.missileEffect = new Phaser.Physics.Arcade.Sprite(
            this.scene,
            18,
            -17,
            'missileEffect',
            0
        ).setOrigin(0, 0)
        this.missileAlert = null
        this.currentState = MissileState.ALERT

        this.add(this.missile)
        this.add(this.missileEffect)

        this.scene.physics.world.enable(this)
        this.body.setSize(70, 26)
        this.setScale(1.5)
        this.setVisible(true)
        this.setActive(true)
        this.body.onCollide = true
        this.scene.add.existing(this)
    }

    public playAnimation(key: string, keyEffect: string): void {
        this.missile.play(key)
        this.missileEffect.play(keyEffect)
    }

    preUpdate(time: number, deltaTime: number) {
        if (this.state === MissileState.ACTIVE) {
            this.x -= (1500 * deltaTime) / 1000
            if (this.x + this.missile.width < 0) {
                this.state = MissileState.DESTROYED
                this.triggerMissileEffect()
            }
        }
    }

    triggerMissileEffect = () => {
        const explosion = this.scene.add.sprite(this.x, this.y, 'missileExplosion')
        explosion.play('missileExplosion')
        explosion.once('animationcomplete', () => {
            explosion.destroy()
        })

        this.setVisible(false)
        this.setActive(false)
    }

    moveWithPlayer(playerY: number) {
        if (this.missileAlert) {
            this.missileAlert.y = playerY
            this.y = this.missileAlert.y
        }
    }
}

export default Missile
