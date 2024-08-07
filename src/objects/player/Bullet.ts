class Bullet extends Phaser.GameObjects.Sprite {
    private speed = 0

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 'bullet')
        this.setOrigin(0.5, 0.5)

        this.setAngle(Phaser.Math.RND.pick([100, 90, 80]))
        this.speed = Phaser.Math.GetSpeed(800, 1)
        // Events.on('bulletGrounding', () => {
        //     this.play('bulletSplash')
        // })
    }

    public fire(x: number, y: number): void {
        this.setPosition(x + 12, y + 70)

        this.setActive(true)
        this.setVisible(true)
    }

    public preUpdate(time: number, delta: number): void {
        const radians = Phaser.Math.DegToRad(this.angle)

        this.y += Math.sin(radians) * this.speed * delta
        this.x += Math.cos(radians) * this.speed * delta

        if (this.y >= Number(this.scene.game.config.height) / 1.35) {
            // if (this.active == true) {
            //     Events.emit('bulletGrounding')
            // }
            this.setActive(false)
            this.setVisible(false)
        }
    }
}

export default Bullet
