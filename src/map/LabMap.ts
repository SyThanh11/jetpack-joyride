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
            coin.setTint(0xfbd7f9)
            coin.setActive(true)
            coin.play('coinEffect')
            this.coinContainer.add(coin)
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

export default LabMap
