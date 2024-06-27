import MapTile from './MapTile'

class HallwayMap extends MapTile {
    public init() {
        this.map = this.scene.make.tilemap({ key: 'startHallway' })
        const tileset1 = this.map.addTilesetImage('titleFG_1_TVOS', 'hallway')
        const tileset2 = this.map.addTilesetImage('titleFG_2_TVOS', 'hallway2')

        if (tileset1 && tileset2) {
            this.backgroundLayer =
                this.map.createLayer('Tile Layer 1', [tileset1, tileset2], 0, 0) || null
            this.colliderLayer =
                this.map.createLayer('Collider', [tileset1, tileset2], 0, 0) || null
            this.colliderLayer?.setCollisionByExclusion([-1], true)
        }
        if (this.backgroundLayer) {
            this.add(this.backgroundLayer)
            this.backgroundLayer.x = this.x
            this.backgroundLayer.y = this.y
        }

        this.setDepth(-1)
        this.colliderLayer?.setDepth(-2)
        this.scene.add.existing(this)
    }
}

export default HallwayMap
