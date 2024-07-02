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

        const coinsObjects = this.map.createFromObjects('Coin Object Layer', {
            name: 'coin',
            key: 'coin',
            classType: Phaser.Physics.Arcade.Sprite,
        })

        coinsObjects.forEach((coinObject) => {
            const coin = coinObject as Phaser.Physics.Arcade.Sprite
            this.scene.physics.add.existing(coin)
            coin.setPosition(coin.x, coin.y)
            coin.setActive(true)
            coin.play('coinEffect')
            this.coinContainer.add(coin)
        })

        const zaggerObjects = this.map.createFromObjects('Zagger Object Layer', {
            name: 'zagger',
            classType: Phaser.Physics.Arcade.Sprite,
        })

        zaggerObjects.forEach((zaggerObject) => {
            const zagger = zaggerObject as Phaser.Physics.Arcade.Sprite
            zagger.setVisible(false)
            if (zagger) {
                const spawnedZagger = this.zapperManager.spawnZapper(zagger.x, zagger.y)
                if (spawnedZagger) {
                    this.scene.physics.add.existing(spawnedZagger)
                    this.zapperContainer.add(spawnedZagger)
                }
            }
        })
    }
}

export default HallwayOneMap
