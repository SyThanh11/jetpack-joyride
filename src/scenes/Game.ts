import ZapperManager from '../objects/obstacles/zapper/ZapperManager'
import LaserManager from '../objects/obstacles/laser/LaserManager'
import Player from '../objects/player/state/Player'
import MapManager from '../map/MapManager'
import MissileManager from '../objects/obstacles/missile/MissileManager'
import Score from '../objects/player/Score'
import GameUI from '../ui/GameUI'
import StateMachine from './state/StateMachine'
import Laser from '../objects/obstacles/laser/Laser'
import CONST from '../const/const'
import StartState from './state/StartState'
import MusicManager from '../music/MusicManager'

export const Events = new Phaser.Events.EventEmitter()

class Game extends Phaser.Scene {
    public player: Player
    public score: Score
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
    private isMusic = false

    constructor() {
        super('Game')
    }

    public init() {
        if (!this.isMusic) {
            MusicManager.getInstance(this).playMusicLevel()
            console.log('Hi')
            this.isMusic = true
        }
    }

    public create() {
        this.gameUI = new GameUI(this)
        this.player = new Player(this, CONST.GAME_WIDTH / 3, CONST.GAME_HEIGHT / 1.45).setDepth(2)
        this.zapperManager = new ZapperManager(this)
        this.missileManager = new MissileManager(this)
        this.laserManager = new LaserManager(this)
        this.score = new Score()

        this.mapManager = new MapManager(this)

        this.mapManager.collisionWithCoin(this.player)
        this.mapManager.zapperCollisionWithPlayer(this.player)
        this.mapManager.triggerMissiles(this.player)
        this.mapManager.missileCollisionWithPlayer(this.player)
        this.mapManager.triggerLasers(this.player)
        this.mapManager.laserCollisionWithPlayer(this.player)

        this.setupEvents()

        this.stateMachine = new StateMachine(this)
        this.stateMachine.changeState(new StartState(this))
    }

    public update(time: number, deltaTime: number): void {
        this.stateMachine.update(time, deltaTime)
    }

    private setupEvents(): void {
        Events.off('addCoin')
        Events.off('laserVisible')
        Events.on('addCoin', () => {
            MusicManager.getInstance(this).playMusicCoinPickUp()
            this.score.addCoin()
            this.gameUI.setTextCoin(this.score.getCoin())
        })

        Events.on('laserVisible', (laser: Laser) => {
            laser.startAnimations()
        })
    }
}

export default Game
