class Bullet extends Phaser.Physics.Arcade.Sprite {
    private speed = 0
    private bulletSplash: Phaser.Physics.Arcade.Sprite

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 'bullet')
        this.bulletSplash = new Phaser.Physics.Arcade.Sprite(scene, 0, 0, 'bulletSplash')

        this.setOrigin(0.5, 0.5)

        this.setAngle(Phaser.Math.RND.pick([100, 90, 80]))
        this.speed = Phaser.Math.GetSpeed(600, 1)
    }

    public fire(x: number, y: number): void {
        this.setPosition(x + 12, y + 70)

        this.setActive(true)
        this.setVisible(true)
    }

    preUpdate(time: number, delta: number): void {
        const radians = Phaser.Math.DegToRad(this.angle)

        this.y += Math.sin(radians) * this.speed * delta
        this.x += Math.cos(radians) * this.speed * delta

        if (this.y >= innerHeight - 32 * 4) {
            this.setActive(false)
            this.setVisible(false)
        }
    }
}

export default Bullet
