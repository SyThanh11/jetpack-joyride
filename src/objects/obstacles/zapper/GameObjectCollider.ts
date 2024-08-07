class GameObjectCollider extends Phaser.Physics.Arcade.Sprite {
    declare body: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, '')

        this.init()
    }

    public init() {
        this.setVisible(false)
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.body.allowGravity = false
        this.setImmovable(true)
        this.setOrigin(0.5, 0.5)
    }

    public setSizeCollider(width: number, height: number) {
        this.body.setSize(width, height)
        this.refreshBody()
    }
}

export default GameObjectCollider
