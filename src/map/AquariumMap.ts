import MapTile from './MapTile'

class AquariumMap extends MapTile {
    public init() {
        this.map = this.scene.make.tilemap({ key: 'aquarium' })
        const tileset1 = this.map.addTilesetImage('aquarium_assets', 'aquarium_assets')
        if (tileset1) {
            this.backgroundLayer = this.map.createLayer('Tile Layer 1', [tileset1], 0, 0) || null
            this.backgroundLayerTwo =
                this.map.createLayer('Tile Layer 2', [tileset1], 0, 0)?.setDepth(-3) || null
            // this.backgroundLayerThree =
            //     this.map.createLayer('Tile Layer 3', [tileset1], 0, 0) || null
            // this.backgroundLayerFour =
            //     this.map.createLayer('Tile Layer 4', [tileset1], 0, 0) || null
        }

        this.havingCoinTile = true
        this.havingMissileTile = true
        this.havingZaggerTile = true
    }
}

export default AquariumMap
