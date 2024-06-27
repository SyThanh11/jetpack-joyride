import Player from '../objects/player/state/Player'
import MapTile from './MapTile'

class RoomMap extends MapTile {
    public init() {
        this.map = this.scene.make.tilemap({ key: 'room' })
        const tileset1 = this.map.addTilesetImage('room1FG_1_TVOS', 'room1FG_1_TVOS')
        const tileset2 = this.map.addTilesetImage('room1FG_2_TVOS', 'room1FG_2_TVOS')

        if (tileset1 && tileset2) {
            this.backgroundLayer =
                this.map.createLayer('Tile Layer 1', [tileset1, tileset2], 990, 0) || null
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

    public collisionWithPlayer(player: Player) {
        if (this.colliderLayer) {
            this.scene.physics.add.collider(player, this.colliderLayer)
        }
    }
}

export default RoomMap
