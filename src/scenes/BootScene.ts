import { Scene } from 'phaser'

class BootGameScene extends Scene {
    constructor() {
        super('BootGameScene')
    }

    preload(): void {
        this.load.image('screen', 'assets/Splash/loading_screen.png')
    }

    create(): void {
        this.scene.start('PreloadScene')
    }
}

export default BootGameScene
