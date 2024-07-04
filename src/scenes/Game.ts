import { Scene } from 'phaser'
import ZapperManager from '../objects/obstacles/zapper/ZapperManager'
import LaserManager from '../objects/obstacles/laser/LaserManager'
import Player from '../objects/player/state/Player'
import MapManager from '../map/MapManager'
import MissileManager from '../objects/obstacles/missile/MissileManager'
import Score from '../objects/player/Score'
import GameUI from '../ui/GameUI'
import StateMachine from './state/StateMachine'
import StartState from './state/StartState'
import Laser from '../objects/obstacles/laser/Laser'

export const Events = new Phaser.Events.EventEmitter()

export class Game extends Scene {
    public music: Phaser.Sound.BaseSound | null = null
    public player: Player
    public score: Score = new Score()
    public mapManager: MapManager

    public gameUI: GameUI

    public missileManager: MissileManager
    public zapperManager: ZapperManager
    public laserManager: LaserManager

    public title: Phaser.GameObjects.Image
    public blinkingText: Phaser.GameObjects.Text

    public timeInterval = 0.1
    public gameStarted = false

    public stateMachine: StateMachine

    constructor() {
        super('Game')
    }

    create() {
        const gameWidth = Number(this.game.config.width)
        const gameHeight = Number(this.game.config.height)

        this.gameUI = new GameUI(this)
        this.player = new Player(this, gameWidth / 3, gameHeight / 1.45).setDepth(2)
        this.zapperManager = new ZapperManager(this)
        this.missileManager = new MissileManager(this)
        this.laserManager = new LaserManager(this)

        this.mapManager = new MapManager(this)

        this.mapManager.collisionWithCoin(this.player)
        this.mapManager.zapperCollisionWithPlayer(this.player)
        this.mapManager.triggerMissiles(this.player)
        this.mapManager.missileCollisionWithPlayer(this.player)
        this.mapManager.triggerLasers(this.player)
        this.mapManager.laserCollisionWithPlayer(this.player)

        if (!this.music) {
            this.music = this.sound.add('menuAmb')
            this.music.play({ loop: true })
        }

        Events.on('addCoin', () => {
            const music = this.sound.add('coinPickUpThree')
            music.play()
            this.score.addCoin()
            this.gameUI.setTextCoin(this.score.getCoin())
        })

        Events.on('laserVisible', (laser: Laser) => {
            laser.startAnimations()
        })

        this.stateMachine = new StateMachine(this)
        this.stateMachine.changeState(new StartState(this))
    }

    public update(time: number, deltaTime: number): void {
        this.stateMachine.update(time, deltaTime)
    }
}
