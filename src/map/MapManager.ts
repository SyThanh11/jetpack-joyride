import HallwayMap from './HallwayMap'
import MapTile from './MapTile'
import RoomMap from './RoomMap'

class MapManager {
    private hallwayMap: HallwayMap
    private roomMapOne: RoomMap
    private roomMapTwo: RoomMap
    private roomMapThree: RoomMap
    private listOfMap: MapTile[]

    constructor(scene: Phaser.Scene) {
        this.hallwayMap = new HallwayMap(scene, 0, 0)
        this.roomMapOne = new RoomMap(scene, 1120 - 32 * 4, 0)
        this.roomMapTwo = new RoomMap(scene, this.roomMapOne.x + 2432 - 32 * 4, 0)
        this.roomMapThree = new RoomMap(scene, this.roomMapTwo.x + 2432 - 32 * 4, 0)
        this.listOfMap = [this.roomMapOne, this.roomMapTwo, this.roomMapThree]
    }

    update() {
        if (this.listOfMap[0].x + 2432 - 32 * 4 <= 0) {
            this.listOfMap.shift()
            this.listOfMap.push(
                new RoomMap(
                    this.listOfMap[this.listOfMap.length - 1].scene,
                    this.listOfMap[this.listOfMap.length - 1].x + 2432 - 32 * 4,
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
