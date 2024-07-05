import MapTile from './MapTile'

class CaveMap extends MapTile {
    public init() {
        this.map = this.scene.make.tilemap({ key: 'cave' })
        const tileset1 = this.map.addTilesetImage('cave_assets', 'cave_assets')
        if (tileset1) {
            this.backgroundLayer = this.map.createLayer('Tile Layer 1', [tileset1], 0, 0) || null
            this.backgroundLayerTwo =
                this.map.createLayer('Tile Layer 2', [tileset1], 0, 0)?.setDepth(-3) || null
            // this.backgroundLayerThree =
            //     this.map.createLayer('Tile Layer 3', [tileset1], 0, 0) || null
        }

        this.havingCoinTile = true
        this.havingZaggerTile = true
        this.havingMissileTile = true
        this.havingLaserTile = true
    }
}

export default CaveMap
