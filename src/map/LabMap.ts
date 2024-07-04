import MapTile from './MapTile'

class LabMap extends MapTile {
    public init() {
        this.map = this.scene.make.tilemap({ key: 'lab' })
        const tileset1 = this.map.addTilesetImage('lab1FG_1_TVOS', 'lab1FG_1_TVOS')
        const tileset2 = this.map.addTilesetImage('lab1FG_2_TVOS', 'lab1FG_2_TVOS')

        if (tileset1 && tileset2) {
            this.backgroundLayer =
                this.map.createLayer('Tile Layer 1', [tileset1, tileset2]) || null
        }

        this.havingCoinTile = true
        this.havingMissileTile = true
    }
}

export default LabMap
