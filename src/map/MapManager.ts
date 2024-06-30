import HallwayMap from './HallwayMap'
import HallwayOneMap from './HallwayOneMap'
import LabMap from './LabMap'
import MapTile from './MapTile'
import RoomMap from './RoomMap'

class MapManager {
    private hallwayMap: HallwayMap
    private hallwayOneMap: HallwayOneMap
    private roomMap: RoomMap
    private labMap: LabMap
    private listOfMap: MapTile[]

    private gameWidth: number

    constructor(scene: Phaser.Scene) {
        this.gameWidth = Number(scene.game.config.width)

        this.hallwayMap = new HallwayMap(scene, 0, 0)
        this.hallwayOneMap = new HallwayOneMap(
            scene,
            this.hallwayMap.x + this.gameWidth - 32 * 3,
            0
        )
        this.roomMap = new RoomMap(scene, this.hallwayOneMap.x + this.gameWidth - 32 * 3, 0)
        this.labMap = new LabMap(scene, this.roomMap.x + this.gameWidth - 32 * 3, 0)
        this.listOfMap = [this.hallwayOneMap, this.roomMap, this.labMap]
    }

    update() {
        if (this.listOfMap[0].x + Number(this.gameWidth) + 32 * 3 <= 0) {
            this.listOfMap.shift()
            this.listOfMap.push(
                new RoomMap(
                    this.listOfMap[this.listOfMap.length - 1].scene,
                    this.listOfMap[this.listOfMap.length - 1].x + Number(this.gameWidth) - 32 * 3,
                    0
                )
            )
        }
    }

    public getHallwayMap() {
        return this.hallwayMap
    }
}

export default MapManager
