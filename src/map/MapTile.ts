class MapTile extends Phaser.GameObjects.Container {
    public backgroundLayer: Phaser.Tilemaps.TilemapLayer | null
    public map: Phaser.Tilemaps.Tilemap

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.init()

        if (this.backgroundLayer) {
            this.add(this.backgroundLayer)
            this.backgroundLayer.x = this.x
            this.backgroundLayer.y = this.y

            this.backgroundLayer.displayHeight = Number(this.scene.game.config.height)
            this.backgroundLayer.displayWidth = Number(this.scene.game.config.width)
        }

        this.setDepth(-1)
        this.scene.add.existing(this)
    }

    public init() {}

    preUpdate(time: number, deltaTime: number): void {
        this.x -= ((Number(this.scene.game.config.width) / 3) * deltaTime) / 1000

        if (this.backgroundLayer) {
            this.backgroundLayer.x = this.x
        }
    }

    public getBoundsRight(): number {
        return this.backgroundLayer?.getBounds().right || 0
    }

    public getPositionRight(): number {
        return this.x + this.getBoundsRight()
    }
}

export default MapTile
