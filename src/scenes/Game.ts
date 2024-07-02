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

export const Events = new Phaser.Events.EventEmitter()

export class Game extends Scene {
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
        this.stateMachine = new StateMachine(this)
        this.stateMachine.changeState(new StartState(this))
    }

    public update(time: number, deltaTime: number): void {
        this.stateMachine.update(time, deltaTime)
    }
}
