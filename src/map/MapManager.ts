import Phaser from 'phaser'
import HallwayMap from './HallwayMap'
import HallwayOneMap from './HallwayOneMap'
import MapTile from './MapTile'
import RoomMap from './RoomMap'
import LabMap from './LabMap'
import Player from '../objects/player/state/Player'

class MapManager {
    private mapPool: Phaser.GameObjects.Group
    private maps: MapTile[] = []

    constructor(scene: Phaser.Scene) {
        this.mapPool = new Phaser.GameObjects.Group(scene, {
            classType: MapTile,
            maxSize: 6,
            runChildUpdate: true,
            createCallback: (obj: Phaser.GameObjects.GameObject) => {
                const mapTile = obj as MapTile
                mapTile.setActive(false)
                mapTile.setVisible(false)
            },
        })

        const hallwayMap = new HallwayMap(scene, 0, 0)
        const hallwayOneMap = new HallwayOneMap(scene, 0, 0)
        const roomMap = new RoomMap(scene, 0, 0)
        const labMap = new LabMap(scene, 0, 0)

        this.mapPool.addMultiple([hallwayMap, hallwayOneMap, labMap, roomMap])

        this.maps.push(hallwayOneMap, labMap, roomMap)

        this.arrangeMaps()
    }

    private arrangeMaps(): void {
        const maps = this.mapPool.getChildren() as MapTile[]
        let x = 0

        maps.forEach((map) => {
            map.x = x
            map.y = 0
            map.setActive(true)
            map.setVisible(true)

            const backgroundLayer = map.getBackgroundLayer()
            if (backgroundLayer && backgroundLayer.width) {
                x += backgroundLayer.width - 32 * 4
            }
        })
    }

    public update(): void {
        const activeMaps = this.maps.filter((map) => map.active)

        const firstMap = activeMaps[0]
        const firstMapBackgroundLayer = firstMap?.getBackgroundLayer()
        if (firstMapBackgroundLayer && firstMapBackgroundLayer.width) {
            if (firstMap.x + firstMapBackgroundLayer.width <= 0) {
                const lastMap = activeMaps[activeMaps.length - 1]
                const lastMapBackgroundLayer = lastMap?.getBackgroundLayer()
                if (lastMapBackgroundLayer && lastMapBackgroundLayer.width) {
                    firstMap.x = lastMap.x + lastMapBackgroundLayer.width - 32 * 4
                }
                this.maps.push(this.maps.shift() as MapTile)
            }
        }
    }

    public reset(): void {
        this.mapPool.getChildren().forEach((map) => {
            const mapEle = map as MapTile
            if (mapEle.active) {
                mapEle.reset()
                mapEle.setVisible(false)
                mapEle.setActive(false)
            }
        })

        this.maps = []

        this.mapPool.getChildren().forEach((map) => {
            if (!(map instanceof HallwayMap)) {
                this.maps.push(map as MapTile)
            }
        })

        this.arrangeMaps()
    }

    public start(): void {
        this.mapPool.getChildren().forEach((map) => {
            const mapTile = map as MapTile
            if (mapTile.active) {
                mapTile.start()
            }
        })
    }

    public stop(): void {
        this.mapPool.getChildren().forEach((map) => {
            const mapTile = map as MapTile
            if (mapTile.active) {
                mapTile.stop()
            }
        })
    }

    public collisionWithCoin(player: Player) {
        this.mapPool.getChildren().forEach((map) => {
            const mapTile = map as MapTile
            if (mapTile.active) {
                mapTile.collisionWithCoin(player)
            }
        })
    }

    public zapperCollisionWithPlayer(player: Player) {
        this.mapPool.getChildren().forEach((map) => {
            const mapTile = map as MapTile
            if (mapTile.active) {
                mapTile.zapperCollisionWithPlayer(player)
            }
        })
    }

    public triggerMissiles(player: Player) {
        this.mapPool.getChildren().forEach((map) => {
            const mapTile = map as MapTile
            if (mapTile.active) {
                mapTile.triggerMissiles(player)
            }
        })
    }

    public missileCollisionWithPlayer(player: Player) {
        this.mapPool.getChildren().forEach((map) => {
            const mapTile = map as MapTile
            if (mapTile.active) {
                mapTile.missileCollisionWithPlayer(player)
            }
        })
    }

    public triggerLasers(player: Player) {
        this.mapPool.getChildren().forEach((map) => {
            const mapTile = map as MapTile
            if (mapTile.active) {
                mapTile.triggerLasers(player)
            }
        })
    }

    public laserCollisionWithPlayer(player: Player) {
        this.mapPool.getChildren().forEach((map) => {
            const mapTile = map as MapTile
            if (mapTile.active) {
                mapTile.laserCollisionWithPlayer(player)
            }
        })
    }
}

export default MapManager
