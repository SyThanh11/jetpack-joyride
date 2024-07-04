class Button extends Phaser.GameObjects.Container {
    private text: Phaser.GameObjects.Text
    private background: Phaser.GameObjects.Image
    private selectButtonMusic: Phaser.Sound.BaseSound | null = null

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        sizeX: number,
        sizeY: number,
        callBack: Function,
        text: string,
        textStyle: object
    ) {
        super(scene, x, y)

        this.selectButtonMusic = this.scene.sound.add('selectButtonMusic')

        this.text = this.scene.add.text(0, 0, text, textStyle).setOrigin(0.5, 0.5)
        this.background = this.scene.add.image(0, 0, texture).setOrigin(0.5, 0.5)

        this.setSize(sizeX, sizeY)
        this.setInteractive({
            useHandCursor: true,
        })

        this.add(this.background)
        this.add(this.text)

        this.scene.add.existing(this)

        this.on(
            'pointerdown',
            () => {
                this.selectButtonMusic?.play()
                callBack.call(this)
            },
            this
        )
    }
}

export default Button
