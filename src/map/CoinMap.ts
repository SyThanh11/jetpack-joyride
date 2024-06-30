import Player from '../objects/player/state/Player'

class CoinMap extends Phaser.GameObjects.Container {
    private listOfCoins: Phaser.Physics.Arcade.Sprite[] = []

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.init()
    }

    public init() {
        const map = this.scene.make.tilemap({ key: 'coinMap' })
        const coinsObjects = map.createFromObjects('Coin Object Layer', {
            name: 'coinEleCoin Object Layer',
            key: 'coin',
            classType: Phaser.Physics.Arcade.Sprite,
        })

        this.listOfCoins = coinsObjects.map((coinObject) => {
            const coin = coinObject as Phaser.Physics.Arcade.Sprite
            this.scene.physics.add.existing(coin)
            coin.setPosition(coin.x + this.x, coin.y + this.y)
            coin.setActive(true)
            coin.play('coinEffect')
            return coin
        })

        this.scene.add.existing(this)
    }

    preUpdate(time: number, deltaTime: number): void {
        this.listOfCoins.forEach((coin) => {
            coin.x -= (200 * deltaTime) / 1000
        })
    }

    collisionWithPlayer(player: Player): void {
        this.listOfCoins.forEach((coin) => {
            this.scene.physics.add.overlap(player, coin, () => {
                coin.play('collectCoin')
                coin.on('animationcomplete-collectCoin', () => {
                    if (coin.active == true) {
                        coin.setVisible(false)
                        player.score++
                        coin.setActive(false)
                    }
                })
            })
        })
    }
}

export default CoinMap
