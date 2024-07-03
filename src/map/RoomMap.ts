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

        const gameWidth = Number(this.scene.game.config.width)
        const gameHeight = Number(this.scene.game.config.height)
        const scaleFactor = Math.min(gameWidth, gameHeight) / 1000

        const coinsObjects = this.map.createFromObjects('Coin Object Layer', {
            name: 'coin',
            key: 'coin',
            classType: Phaser.Physics.Arcade.Sprite,
        })

        coinsObjects.forEach((coinObject) => {
            const coin = coinObject as Phaser.Physics.Arcade.Sprite
            this.scene.physics.add.existing(coin)
            coin.setPosition(coin.x, coin.y * scaleFactor)
            coin.setActive(true)
            coin.setTint(0x009aa6)
            coin.play('coinEffect')
            this.coinContainer.add(coin)
        })

        const laserTriggerObjects = this.map.createFromObjects('Trigger Laser', {
            name: 'laser',
            classType: Phaser.Physics.Arcade.Sprite,
        })

        laserTriggerObjects.forEach((laserTriggerObject) => {
            const laserTrigger = laserTriggerObject as Phaser.Physics.Arcade.Sprite

            this.scene.physics.add.existing(laserTrigger)
            laserTrigger.setActive(false)
            laserTrigger.setVisible(false)
            this.laserContainer.add(laserTrigger)
        })
    }
}

export default RoomMap
