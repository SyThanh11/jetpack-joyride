import MapTile from './MapTile'

class RoomMap extends MapTile {
    public init() {
        this.map = this.scene.make.tilemap({ key: 'room' })
        const tileset1 = this.map.addTilesetImage('room1FG_1_TVOS', 'room1FG_1_TVOS')
        const tileset2 = this.map.addTilesetImage('room1FG_2_TVOS', 'room1FG_2_TVOS')

        if (tileset1 && tileset2) {
            this.backgroundLayer =
                this.map.createLayer('Tile Layer 1', [tileset1, tileset2]) || null
        }
    }
}

export default RoomMap
