class Cartouche extends Phaser.Physics.Arcade.Sprite {
    private speed = 0

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 'cartouche')

        this.setOrigin(0.5, 0.5)
        this.setScale(0.5)
        this.setAngle(Phaser.Math.RND.pick([70, 80, 65]))
        this.speed = Phaser.Math.GetSpeed(1000, 1)
    }

    public fire(x: number, y: number): void {
        this.setPosition(x + 12, y + 70)

        this.setActive(true)
        this.setVisible(true)
    }

    preUpdate(time: number, delta: number): void {
        const radians = Phaser.Math.DegToRad(this.angle)

        this.y += Math.cos(radians) * this.speed * delta
        this.x -= Math.sin(radians) * this.speed * delta

        if (this.x + this.width <= 0 || this.y >= Number(this.scene.game.config.height) / 1.35) {
            this.setActive(false)
            this.setVisible(false)
        }
    }
}

export default Cartouche
