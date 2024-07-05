import { Scene } from 'phaser'
import CONST from '../const/Const'

class PreloadScene extends Scene {
    constructor() {
        super('PreloadScene')
    }

    public preload() {
        this.load.tilemapTiledJSON('startHallway', 'assets/map/hallway.tmj')
        this.load.image('hallway', 'assets/Levels/Title/titleFG_1_TVOS.png')
        this.load.image('hallway2', 'assets/Levels/Title/titleFG_2_TVOS.png')
        this.load.image('alarmLight_TVOS', 'assets/Levels/Title/alarmLight_TVOS.png')
        this.load.image('doNotTouchSign_TVOS', 'assets/Levels/Title/doNotTouchSign_TVOS.png')
        this.load.image('title_light_TVOS', 'assets/Levels/Title/title_light_TVOS.png')
        this.load.image('lightEffect2', 'assets/Levels/Title/lightEffect2.png')

        this.load.tilemapTiledJSON('room', 'assets/map/room.tmj')
        this.load.image('room1FG_1_TVOS', 'assets/Levels/Room1/room1FG_1_TVOS.png')
        this.load.image('room1FG_2_TVOS', 'assets/Levels/Room1/room1FG_2_TVOS.png')
        this.load.tilemapTiledJSON('lab', 'assets/map/lab.tmj')
        this.load.image('lab1FG_1_TVOS', 'assets/Levels/lab1/lab1FG_1_TVOS.png')
        this.load.image('lab1FG_2_TVOS', 'assets/Levels/lab1/lab1FG_2_TVOS.png')

        this.load.tilemapTiledJSON('hallway1', 'assets/map/hallway1.tmj')
        this.load.image('hallway1FG_1_TVOS', 'assets/Levels/Hallway1/hallway1FG_1_TVOS.png')
        this.load.image('hallway1FG_2_TVOS', 'assets/Levels/Hallway1/hallway1FG_2_TVOS.png')
        this.load.spritesheet(
            'alarmLightGlowOpt_TVOS',
            'assets/Levels/Hallway1/alarmLightGlowOpt_TVOS.png',
            {
                frameWidth: 256 / 2,
                frameHeight: 256 / 2,
            }
        )
        this.load.spritesheet(
            'alarmLightGlow_TVOS',
            'assets/Levels/Hallway1/alarmLightGlow_TVOS.png',
            {
                frameWidth: 1024 / 2,
                frameHeight: 1024 / 4,
            }
        )

        this.load.tilemapTiledJSON('aquarium', 'assets/map/aquariumMap.tmj')
        this.load.image('aquarium_assets', 'assets/atlas/aquarium_assets.png')

        this.load.tilemapTiledJSON('cave', 'assets/map/caveMap.tmj')
        this.load.image('cave_assets', 'assets/atlas/cave_assets.png')

        this.load.tilemapTiledJSON('coinMap', 'assets/map/coin.tmj')
        this.load.spritesheet('coin', 'assets/Entities/coin1_TVOS.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('collectCoin', 'assets/Entities/coinCollect1_TVOS.png', {
            frameWidth: 32,
            frameHeight: 32,
        })

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
        this.load.image('cartouche', 'assets/Characters/Effects/effect_rocketmgshell_TVOS.png')

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

        this.load.spritesheet(
            'zapEffectRotating',
            'assets/Obstacles/Zapper/RotatingZappers/zapEffectsRotating.png',
            {
                frameWidth: 1024,
                frameHeight: 468 / 4,
            }
        )
        this.load.spritesheet(
            'glowRotating',
            'assets/Obstacles/Zapper/RotatingZappers/glowRotating.png',
            {
                frameWidth: 512 / 4,
                frameHeight: 512 / 4,
            }
        )

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

        this.load.image('buttonPause', 'assets/UI/buttonPause.png')
        this.load.image('controlButtonPause', 'assets/UI/buttonBackingCredit.png')

        this.load.image('mainMenu', 'assets/Levels/Title/Objects/title_small.png')

        // Audio
        this.load.audio('menuAmb', ['assets/BGM/menu_amb_lp.mp3'])
        this.load.audio('musicLevel', ['assets/BGM/Music_Level.mp3'])
        this.load.audio('runMetalMusic', ['assets/SFX/Barry/run_metal_left_1.mp3'])
        this.load.audio('playerHurt', ['assets/SFX/Barry/Player_hurt_2.mp3'])
        this.load.audio('playerBones', ['assets/SFX/Barry/Player_bones.mp3'])
        this.load.audio('fallBounce', ['assets/SFX/Barry/fall_bounce_1.mp3'])
        this.load.audio('jetpackFireLP', ['assets/SFX/Jetpack/jetpack_fireLP.mp3'])
        this.load.audio('jetpackStop', ['assets/SFX/Jetpack/Jetpack_stop.mp3'])
        this.load.audio('coinPickUpOne', ['assets/SFX/Obstacle/Coin/coin_pickup_1.mp3'])
        this.load.audio('coinPickUpTwo', ['assets/SFX/Obstacle/Coin/coin_pickup_2.mp3'])
        this.load.audio('coinPickUpThree', ['assets/SFX/Obstacle/Coin/coin_pickup_3.mp3'])
        this.load.audio('laserFireLPMusic', ['assets/SFX/Obstacle/Laser/laser_fire_lp.mp3'])
        this.load.audio('laserStartMusic', ['assets/SFX/Obstacle/Laser/laser_start.mp3'])
        this.load.audio('laserStopMusic', ['assets/SFX/Obstacle/Laser/laser_stop.mp3'])
        this.load.audio('laserWarningMusic', ['assets/SFX/Obstacle/Laser/laser_warning.mp3'])
        this.load.audio('missileLaunchMusic', ['assets/SFX/Obstacle/Missile/missile_launch.mp3'])
        this.load.audio('missileWarningMusic', ['assets/SFX/Obstacle/Missile/missile_warning.mp3'])
        this.load.audio('rocketExplodeMusic', ['assets/SFX/Obstacle/Missile/rocket_explode_1.mp3'])
        this.load.audio('selectButtonMusic', ['assets/SFX/UI/ui_select.mp3'])

        const image = this.add.image(CONST.GAME_WIDTH / 2, CONST.GAME_HEIGHT / 2, 'screen')

        image.setOrigin(0.5, 0.5)
        image.setScale(CONST.GAME_WIDTH / image.width, CONST.GAME_HEIGHT / image.height)

        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()
        progressBox.fillStyle(0x222222, 0.8)
        progressBox.fillRect(
            CONST.GAME_WIDTH / 2,
            CONST.GAME_HEIGHT / 1.3,
            CONST.GAME_WIDTH / 3,
            CONST.GAME_HEIGHT / 20
        )

        const percentText = this.make.text({
            x: CONST.GAME_WIDTH / 1.5,
            y: CONST.GAME_HEIGHT / 1.26,
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
            progressBar.fillRect(
                CONST.GAME_WIDTH / 2,
                CONST.GAME_HEIGHT / 1.3,
                (CONST.GAME_WIDTH / 3) * value,
                CONST.GAME_HEIGHT / 20
            )
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
        this.createAnimation('bulletSplash', 'bulletSplash', 0, 3, 10, -1)
        this.createAnimation('fireBody', 'defaultBody', 20, 23, 10)
        this.createAnimation('fireHead', 'defaultHead', 20, 23, 10)
        this.createAnimation('electricBody', 'defaultBody', 16, 19, 10)
        this.createAnimation('electricHead', 'defaultHead', 16, 19, 10)

        this.createAnimation('missile', 'missile', 0, 3, 5)
        this.createAnimation('missileAlert', 'missileAlert', 0, 7, 5)
        this.createAnimation('missileEffect', 'missileEffect', 0, 3, 6, -1)
        this.createAnimation('missileExplosion', 'missileExplosion', 0, 7, 10)

        this.createAnimation('zapper', 'zapper', 0, 3, 10, -1)
        this.createAnimation('glow', 'glow', 0, 15, 10, -1)
        this.createAnimation('glowRotating', 'glowRotating', 0, 15, 10, -1)

        this.createAnimation('laser', 'laser', 0, 11, 10)
        this.createAnimation('laserEnergy', 'laserEnergy', 0, 7, 10)
        this.createAnimation('laserWarning', 'laserWarning', 0, 3, 10, 1)
        this.createAnimation('laserGlow', 'laserPower', 0, 7, 10)
        this.createAnimation('laserPower', 'laserPower', 8, 15, 10)

        this.createAnimation('coinEffect', 'coin', 0, 7, 8, -1)
        this.createAnimation('collectCoin', 'collectCoin', 0, 3, 20)

        this.createAnimation('alarmLightGlowOpt_TVOS', 'alarmLightGlowOpt_TVOS', 0, 3, 10, -1)
        this.createAnimation('alarmLightGlow_TVOS', 'alarmLightGlow_TVOS', 0, 5, 10, -1)

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
