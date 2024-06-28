import { Scene } from 'phaser'

class PreloadScene extends Scene {
    constructor() {
        super('PreloadScene')
    }

    public preload() {
        this.load.tilemapTiledJSON('startHallway', 'assets/map/startHallway.tmj')
        this.load.image('hallway', 'assets/Levels/Title/titleFG_1_TVOS.png')
        this.load.image('hallway2', 'assets/Levels/Title/titleFG_2_TVOS.png')
        this.load.tilemapTiledJSON('room', 'assets/map/room1.tmj')
        this.load.image('room1FG_1_TVOS', 'assets/Levels/Room1/room1FG_1_TVOS.png')
        this.load.image('room1FG_2_TVOS', 'assets/Levels/Room1/room1FG_2_TVOS.png')

        this.load.spritesheet('defaultBody', 'assets/Characters/Barry/defaultBody.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('defaultHead', 'assets/Characters/Barry/defaultHead.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('defaultJetpack', 'assets/Characters/Jetpacks/jetpackDefault.png', {
            frameWidth: 128 / 4,
            frameHeight: 176 / 4,
        })
        this.load.image('shadow', 'assets/Characters/effect_shadow.png')
        this.load.image('bullet', 'assets/Characters/Effects/effect_smgbullet.png')
        this.load.spritesheet('bulletFlash', 'assets/Characters/Effects/bulletFlash_TVOS.png', {
            frameWidth: 256 / 4,
            frameHeight: 64,
        })
        this.load.spritesheet('bulletSplash', 'assets/Characters/Effects/bulletSplash_TVOS.png', {
            frameWidth: 256 / 4,
            frameHeight: 64,
        })

        this.load.spritesheet('missile', 'assets/Obstacles/Missile/missile.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('missileAlert', 'assets/Obstacles/Missile/missileAlert.png', {
            frameWidth: 256 / 4,
            frameHeight: 128 / 2,
        })
        this.load.spritesheet('missileEffect', 'assets/Obstacles/Missile/missileEffects.png', {
            frameWidth: 256 / 4,
            frameHeight: 50,
        })
        this.load.spritesheet('missileExplosion', 'assets/Obstacles/Missile/missileExplosion.png', {
            frameWidth: 512 / 8,
            frameHeight: 64,
        })

        this.load.spritesheet('zapper', 'assets/Obstacles/Zapper/orbAnim.png', {
            frameWidth: 248 / 4,
            frameHeight: 42,
        })
        this.load.spritesheet('zapEffect', 'assets/Obstacles/Zapper/RegularZappers/zapEffect.png', {
            frameWidth: 1028,
            frameHeight: 117,
        })
        this.load.spritesheet('glow', 'assets/Obstacles/Zapper/RegularZappers/glow.png', {
            frameWidth: 512 / 4,
            frameHeight: 512 / 4,
        })

        this.load.spritesheet('laser', 'assets/Obstacles/Laser/laser.png', {
            frameWidth: 512 / 4,
            frameHeight: 512 / 4,
        })
        this.load.spritesheet('laserEnergy', 'assets/Obstacles/Laser/laserEnergy.png', {
            frameWidth: 1024 / 4,
            frameHeight: 512 / 2,
        })
        this.load.spritesheet('laserPower', 'assets/Obstacles/Laser/laserPower.png', {
            frameWidth: 256 / 4,
            frameHeight: 256 / 4,
        })
        this.load.spritesheet('laserWarning', 'assets/Obstacles/Laser/laserWarning.png', {
            frameWidth: 256 / 4,
            frameHeight: 32,
        })

        const image = this.add.image(innerWidth / 2, innerHeight / 2, 'screen')
        image.setOrigin(0.5, 0.5)
        image.setScale(window.innerWidth / image.width, window.innerHeight / image.height)

        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()
        progressBox.fillStyle(0x222222, 0.8)
        progressBox.fillRect(innerWidth / 2, innerHeight / 2 + 220, innerWidth / 3, 50)

        const percentText = this.make.text({
            x: innerWidth / 1.5,
            y: innerHeight / 1.25,
            text: '0%',
            style: {
                font: '18px monospace',
                color: '#ffffff',
            },
        })
        percentText.setOrigin(0.5, 0.5)

        this.load.on('progress', function (value: number) {
            percentText.setText(String(value * 100) + '%')
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(innerWidth / 2, innerHeight / 2 + 220, 569 * value, 50)
        })
    }

    public create() {
        this.createAnimation('runBody', 'defaultBody', 0, 3, 10, -1)
        this.createAnimation('runHead', 'defaultHead', 0, 3, 10, -1)
        this.createAnimation('runJetpack', 'defaultJetpack', 0, 3, 10, -1)
        this.createAnimation('flyBody', 'defaultBody', 4, 7, 10, -1)
        this.createAnimation('flyHead', 'defaultHead', 4, 7, 10, -1)
        this.createAnimation('flyJetpack', 'defaultJetpack', 4, 7, 10, -1)
        this.createAnimation('fallBody', 'defaultBody', 8, 11, 10)
        this.createAnimation('fallHead', 'defaultHead', 8, 11, 10)
        this.createAnimation('fallJetpack', 'defaultJetpack', 8, 11, 10)
        this.createAnimation('takeOffBody', 'defaultBody', 12, 15, 10)
        this.createAnimation('takeOffHead', 'defaultHead', 12, 15, 10)
        this.createAnimation('takeOffJetpack', 'defaultJetpack', 12, 15, 10)
        this.createAnimation('dieBody', 'defaultBody', 24, 27, 10)
        this.createAnimation('dieHead', 'defaultHead', 24, 27, 10)
        this.createAnimation('dieBodyTwo', 'defaultBody', 28, 31, 10)
        this.createAnimation('dieHeadTwo', 'defaultHead', 28, 31, 10)
        this.createAnimation('bulletFlash', 'bulletFlash', 0, 3, 10, -1)
        this.createAnimation('bulletSplash', 'bulletSplash', 0, 3, 10)

        this.createAnimation('missile', 'missile', 0, 3, 5)
        this.createAnimation('missileAlert', 'missileAlert', 0, 7, 5)
        this.createAnimation('missileEffect', 'missileEffect', 0, 3, 6, -1)
        this.createAnimation('missileExplosion', 'missileExplosion', 0, 7, 10)

        this.createAnimation('zapper', 'zapper', 0, 3, 5)
        this.createAnimation('glow', 'glow', 0, 15, 10, -1)

        this.createAnimation('laser', 'laser', 0, 11, 10)
        this.createAnimation('laserEnergy', 'laserEnergy', 0, 7, 10)
        this.createAnimation('laserWarning', 'laserWarning', 0, 3, 10, 1)
        this.createAnimation('laserGlow', 'laserPower', 0, 7, 10)
        this.createAnimation('laserPower', 'laserPower', 8, 15, 10)

        this.scene.start('Game')
    }

    public createAnimation(
        key: string,
        keySprite: string,
        startFrame: number,
        endFrame: number,
        frameRate: number,
        repeat?: number
    ) {
        this.anims.create({
            key: key,
            frames: this.anims.generateFrameNumbers(keySprite, {
                start: startFrame,
                end: endFrame,
            }),
            frameRate: frameRate,
            repeat: repeat,
        })
    }
}

export default PreloadScene
