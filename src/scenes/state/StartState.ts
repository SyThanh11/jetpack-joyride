import MapManager from '../../map/MapManager'
import Laser from '../../objects/obstacles/laser/Laser'
import LaserManager from '../../objects/obstacles/laser/LaserManager'
import MissileManager from '../../objects/obstacles/missile/MissileManager'
import ZapperManager from '../../objects/obstacles/zapper/ZapperManager'
import Player from '../../objects/player/state/Player'
import GameUI from '../../ui/GameUI'
import { Events, Game } from '../Game'
import State from './GamePlayState'
import PlayState from './PlayState'

class StartState implements State {
    constructor(private scene: Game) {}

    enter(): void {
        console.log('Begin Start State')

        const gameWidth = Number(this.scene.game.config.width)
        const gameHeight = Number(this.scene.game.config.height)
        this.scene.gameStarted = false

        const titleWidth = gameWidth * 0.5
        const titleHeight = titleWidth * (9 / 16)

        this.scene.title = this.scene.add
            .image(gameWidth / 2, gameHeight / 2.5, 'mainMenu')
            .setDepth(1)
        this.scene.title.setDisplaySize(titleWidth, titleHeight)

        const textStyle = {
            fontFamily: 'Arial',
            fontSize: `${gameWidth * 0.02}px`,
            color: '#FFFFFF',
        }
        this.scene.blinkingText = this.scene.add
            .text(gameWidth / 2, gameHeight / 1.6, 'PRESS START TO PLAY', textStyle)
            .setOrigin(0.5)

        this.scene.tweens.add({
            targets: this.scene.blinkingText,
            alpha: 0,
            ease: 'Linear',
            duration: 500,
            repeat: -1,
            yoyo: true,
        })

        this.scene.gameUI = new GameUI(this.scene)
        this.scene.player = new Player(this.scene, gameWidth / 3, gameHeight / 1.45).setDepth(2)
        this.scene.zapperManager = new ZapperManager(this.scene)
        this.scene.missileManager = new MissileManager(this.scene)
        this.scene.laserManager = new LaserManager(this.scene)

        this.scene.mapManager = new MapManager(this.scene)

        this.scene.mapManager.collisionWithCoin(this.scene.player)
        this.scene.mapManager.zapperCollisionWithPlayer(this.scene.player)
        this.scene.mapManager.triggerMissiles(this.scene.player)
        this.scene.mapManager.missileCollisionWithPlayer(this.scene.player)
        this.scene.mapManager.triggerLasers(this.scene.player)
        this.scene.mapManager.laserCollisionWithPlayer(this.scene.player)

        this.scene.input.on('pointerdown', () => {
            if (!this.scene.gameStarted) {
                this.scene.score.setScore(0)
                this.scene.score.setCoin(0)
                this.scene.stateMachine.changeState(new PlayState(this.scene))
            }
        })

        Events.on('addCoin', () => {
            this.scene.score.addCoin()
            this.scene.gameUI.setTextCoin(this.scene.score.getCoin())
        })

        Events.on('laserVisible', (laser: Laser) => {
            laser.startAnimations()
        })
    }

    exit(): void {
        console.log('End Start State')
        this.scene.gameStarted = true
        this.scene.title.destroy()
        this.scene.blinkingText.destroy()
    }

    public update(time: number, delta: number): void {}
}

export default StartState
