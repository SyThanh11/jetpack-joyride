import MapTile from './MapTile'

class AquariumMap extends MapTile {
    public init() {
        this.map = this.scene.make.tilemap({ key: 'aquarium' })
        const tileset1 = this.map.addTilesetImage('aquarium_assets', 'aquarium_assets')
        if (tileset1) {
            this.backgroundLayer = this.map.createLayer('Tile Layer 1', [tileset1], 0, 0) || null
            this.backgroundLayerTwo =
                this.map.createLayer('Tile Layer 2', [tileset1], 0, 0)?.setDepth(-3) || null
            this.backgroundLayerThree =
                this.map.createLayer('Tile Layer 3', [tileset1], 0, 0) || null
            this.backgroundLayerFour =
                this.map.createLayer('Tile Layer 4', [tileset1], 0, 0) || null
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

            const tintColors = [0x00c0ff, 0xffffff]
            const randomColor = Phaser.Math.RND.pick(tintColors)
            coin.setTint(randomColor)

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
                const spawnedZagger = this.zapperManager.spawnZapper(
                    zagger.x,
                    zagger.y * scaleFactor
                )
                if (spawnedZagger) {
                    this.scene.physics.add.existing(spawnedZagger)
                    this.zapperContainer.add(spawnedZagger)
                }
            }
        })

        const missileTriggerObjects = this.map.createFromObjects('Trigger Missile', {
            name: 'missile',
            classType: Phaser.Physics.Arcade.Sprite,
        })

        missileTriggerObjects.forEach((missileTriggerObject) => {
            const missileTrigger = missileTriggerObject as Phaser.Physics.Arcade.Sprite

            this.scene.physics.add.existing(missileTrigger)
            missileTrigger.setActive(false)
            missileTrigger.setVisible(false)
            this.missileContainer.add(missileTrigger)
        })
    }
}

export default AquariumMap
