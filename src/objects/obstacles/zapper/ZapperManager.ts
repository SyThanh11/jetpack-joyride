import Zapper from './Zapper'

class ZapperManager {
    private zapperPool: Phaser.GameObjects.Group

    constructor(scene: Phaser.Scene) {
        this.zapperPool = new Phaser.GameObjects.Group(scene, {
            classType: Zapper,
            maxSize: 12,
            runChildUpdate: true,
            createCallback: (obj: Phaser.GameObjects.GameObject) => {
                const zapper = obj as Zapper
                zapper.setActive(false)
                zapper.setVisible(false)
            },
        })

        this.zapperPool.addMultiple([
            new Zapper(scene, 100, false, 90, -100, -100),
            new Zapper(scene, 120, false, 180, -100, -100),
            new Zapper(scene, 100, false, -60, -100, -100),
            new Zapper(scene, 120, true, 90, -100, -100),
            new Zapper(scene, 200, false, 90, -100, -100),
            new Zapper(scene, 160, false, 180, -100, -100),
            new Zapper(scene, 180, false, -30, -100, -100),
            new Zapper(scene, 150, true, 90, -100, -100),
        ])
    }

    public spawnZapper(x = 500, y = 500): Zapper | null {
        const zapper: Zapper = this.zapperPool.get(x, y) as Zapper
        if (!zapper) {
            alert('Out of stock')
            return null
        }
        zapper.setActive(true)
        zapper.setVisible(true)
        return zapper
    }
}

export default ZapperManager
