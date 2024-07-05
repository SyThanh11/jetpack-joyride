import { Scene } from 'phaser'
import CONST from '../const/Const'

class BootGameScene extends Scene {
    constructor() {
        super('BootGameScene')
    }

    public preload(): void {
        this.load.image('screen', 'assets/Splash/loading_screen.png')
    }

    public create(): void {
        const image = this.add.image(CONST.GAME_WIDTH / 2, CONST.GAME_HEIGHT / 2, 'screen')

        image.setOrigin(0.5, 0.5)
        image.setScale(CONST.GAME_WIDTH / image.width, CONST.GAME_HEIGHT / image.height)

        this.scene.start('PreloadScene')
    }
}

export default BootGameScene
