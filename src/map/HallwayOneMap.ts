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

export default HallwayOneMap
