import MapTile from './MapTile'

class HallwayMap extends MapTile {
    public init() {
        this.map = this.scene.make.tilemap({ key: 'startHallway' })
        const tileset1 = this.map.addTilesetImage('titleFG_1_TVOS', 'hallway')
        const tileset2 = this.map.addTilesetImage('titleFG_2_TVOS', 'hallway2')
        const tileset3 = this.map.addTilesetImage('alarmLight_TVOS', 'alarmLight_TVOS')
        const tileset4 = this.map.addTilesetImage('doNotTouchSign_TVOS', 'doNotTouchSign_TVOS')
        const tileset5 = this.map.addTilesetImage('title_light_TVOS', 'title_light_TVOS')
        const tileset6 = this.map.addTilesetImage('lightEffect2', 'lightEffect2')

        if (tileset1 && tileset2) {
            this.backgroundLayer =
                this.map.createLayer('Tile Layer 1', [tileset1, tileset2], 0, 0) || null
        }

        if (tileset3 && tileset4 && tileset5 && tileset6) {
            this.backgroundLayerTwo =
                this.map.createLayer(
                    'Tile Layer 2',
                    [tileset3, tileset4, tileset5, tileset6],
                    0,
                    0
                ) || null
        }

        const gameWidth = Number(this.scene.game.config.width)
        const gameHeight = Number(this.scene.game.config.height)
        const scaleFactor = Math.min(gameWidth, gameHeight) / 1000

        const alarmObjects = this.map.createFromObjects('Alarm Light Layer', {
            name: 'alarm',
            key: 'alarmLightGlow_TVOS',
            classType: Phaser.Physics.Arcade.Sprite,
        })

        alarmObjects.forEach((alarmObject) => {
            const alarm = alarmObject as Phaser.Physics.Arcade.Sprite
            alarm.setPosition(alarm.x, alarm.y * scaleFactor)
            alarm.setScale(scaleFactor)
            alarm.play('alarmLightGlow_TVOS')
            this.scene.physics.add.existing(alarm)
            this.alarmContainer.add(alarm)
        })
    }
}

export default HallwayMap
