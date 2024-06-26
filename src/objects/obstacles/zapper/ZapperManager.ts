import Player from "../../player/state/Player";
import Zapper from "./Zapper";

class ZapperManager {
    private zapperPool: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene) {
        this.zapperPool = new Phaser.GameObjects.Group(scene, {
            classType: Zapper,
            maxSize: 12,
            runChildUpdate: true,
            createCallback: (obj: Phaser.GameObjects.GameObject) => {
                const zapper = obj as Zapper;
                zapper.setActive(false);
                zapper.setVisible(false);
            }
        });

        this.zapperPool.addMultiple([
            new Zapper(scene, 100, false, 90, -100, -100),
            new Zapper(scene, 120, false, 180,-100, -100),
            new Zapper(scene, 100, false, -60, -100, -100),
            new Zapper(scene, 120, true, 90, -100, -100),

            // Quay
            new Zapper(scene, 60, true, 90, -100, -100),
            new Zapper(scene, 80, true, 90, -100, -100),
            new Zapper(scene, 100, true, 90, -100, -100),
           
            // Ngang
            new Zapper(scene, 60, false, 90, -100, -100),
            new Zapper(scene, 80, false, 90, -100, -100),
            new Zapper(scene, 120, false, 90, -100, -100),

            // Dọc
            new Zapper(scene, 60, false, 180, -100, -100),
            new Zapper(scene, 80, false, 180, -100, -100),
            new Zapper(scene, 100, false, 180, -100, -100),


            // Xiên
            new Zapper(scene, 60, false, 30, -100, -100),
            new Zapper(scene, 80, false, 60, -100, -100),
            new Zapper(scene, 120, false, -30, -100, -100),
        ]);
    }

    public spawnZapper(x: number = 500, y: number = 500): Zapper | null {
        const zapper: Zapper = this.zapperPool.get(x, y) as Zapper;        
        if (!zapper) {
            alert('Out of stock');
            return null;
        }
        zapper.setActive(true);
        zapper.setVisible(true);
        return zapper;
    }

    checkCollisionWithPlayer(player: Player){
        this.zapperPool.getChildren().forEach(zapper => {
            (zapper as Zapper ).checkCollisionWithPlayer(player);
        })
    }
}

export default ZapperManager;
