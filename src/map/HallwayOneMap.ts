import MapTile from './MapTile'

class HallwayOneMap extends MapTile {
    public init() {
        this.map = this.scene.make.tilemap({ key: 'hallway1' })

        const tileset1 = this.map.addTilesetImage('hallway1FG_1_TVOS', 'hallway1FG_1_TVOS')
        const tileset2 = this.map.addTilesetImage('hallway1FG_2_TVOS', 'hallway1FG_2_TVOS')

        if (tileset1 && tileset2) {
            this.backgroundLayer =
                this.map.createLayer('Tile Layer 1', [tileset1, tileset2]) || null
        }

        this.havingCoinTile = true
        this.havingZaggerTile = true
        this.havingAlarmTile = true
    }
}

export default HallwayOneMap
