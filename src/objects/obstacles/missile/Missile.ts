import CONST from '../../../const/const'
import MusicManager from '../../../music/MusicManager'
import MissileState from './MissileState'

class Missile extends Phaser.GameObjects.Container {
    declare body: Phaser.Physics.Arcade.Body
    private missile: Phaser.GameObjects.Sprite
    private missileEffect: Phaser.GameObjects.Sprite
    private currentState: MissileState
    private missileAlert: Phaser.Physics.Arcade.Sprite | null

    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        children?: Phaser.GameObjects.GameObject[]
    ) {
        super(scene, x, y, children)

        this.init()
        this.setupAnimationEvents()
    }

    private setupAnimationEvents() {
        this.missile.on(CONST.ANIMATION_START, () => {
            MusicManager.getInstance(this.scene).playMissileLaunchMusic()
        })

        this.missile.on(CONST.ANIMATION_COMPLETE, () => {
            MusicManager.getInstance(this.scene).stopMissileLaunchMusic()
        })
    }

    public init() {
        this.missile = new Phaser.Physics.Arcade.Sprite(this.scene, 0, -2, 'missile').setOrigin(
            0,
            0
        )
        this.missileEffect = new Phaser.Physics.Arcade.Sprite(
            this.scene,
            18,
            -17,
            'missileEffect'
        ).setOrigin(0, 0)
        this.missileAlert = null
        this.currentState = MissileState.ALERT

        this.add(this.missile)
        this.add(this.missileEffect)

        this.scene.physics.world.enable(this)
        this.body.setSize(70, 26)
        this.setVisible(true)
        this.setActive(true)
        this.body.onCollide = true
        this.scene.add.existing(this)
    }

    public getMissileAlert(): Phaser.Physics.Arcade.Sprite | null {
        return this.missileAlert
    }

    public setMissileAlert(missileAlert: Phaser.Physics.Arcade.Sprite | null) {
        this.missileAlert = missileAlert
    }

    public playAnimation(key: string, keyEffect: string): void {
        this.missile.play(key)
        this.missileEffect.play(keyEffect)
    }

    public preUpdate(time: number, deltaTime: number) {
        if (this.state === MissileState.ACTIVE) {
            this.x -= (1500 * deltaTime) / 1000
            if (this.x + this.missile.width < 0) {
                this.state = MissileState.DESTROYED
                this.triggerMissileEffect()
            }
        }
    }

    public triggerMissileEffect = () => {
        const explosion = this.scene.add.sprite(this.x, this.y, 'missileExplosion')
        explosion.once(CONST.ANIMATION_START, () => {
            MusicManager.getInstance(this.scene).playRocketExplodeMusic()
        })
        explosion.once(CONST.ANIMATION_COMPLETE, () => {
            MusicManager.getInstance(this.scene).stopRocketExplodeMusic()
            explosion.destroy()
        })
        explosion.play('missileExplosion')
        this.setVisible(false)
        this.setActive(false)
    }

    public moveWithPlayer(playerY: number) {
        if (this.missileAlert) {
            this.missileAlert.y = playerY
            this.y = this.missileAlert.y
        }
    }
}

export default Missile
