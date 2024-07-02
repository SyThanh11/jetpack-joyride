import { Scene } from 'phaser'

class BootGameScene extends Scene {
    constructor() {
        super('BootGameScene')
    }

    preload(): void {
        this.load.image('screen', 'assets/Splash/loading_screen.png')
    }

    create(): void {
        const gameWidth = Number(this.game.config.width)
        const gameHeight = Number(this.game.config.height)

        const image = this.add.image(gameWidth / 2, gameHeight / 2, 'screen')

        image.setOrigin(0.5, 0.5)
        image.setScale(gameWidth / image.width, gameHeight / image.height)

        this.scene.start('PreloadScene')
    }
}

export default BootGameScene
