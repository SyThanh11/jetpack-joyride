class Worker extends Phaser.GameObjects.Container {
    declare body: Phaser.Physics.Arcade.Body
    private defaultHead: Phaser.Physics.Arcade.Sprite
    private defaultBody: Phaser.Physics.Arcade.Sprite

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
            0,
            0,
            'worker1Head'
        ).setOrigin(0, 0)
        this.defaultBody = new Phaser.Physics.Arcade.Sprite(
            this.scene,
            0,
            14,
            'worker1Body'
        ).setOrigin(0, 0)
        this.add(this.defaultHead)
        this.add(this.defaultBody)

        this.scene.physics.world.enable(this)
        this.body.setSize(28, 45)
        this.scene.add.existing(this)

        this.playAnimation('workerBodyRun', 'workerHeadRun')
    }

    public playAnimation(keyBody: string, keyHead: string): void {
        this.defaultBody.play(keyBody)
        this.defaultHead.play(keyHead)
    }

    public update(): void {}
}

export default Worker
