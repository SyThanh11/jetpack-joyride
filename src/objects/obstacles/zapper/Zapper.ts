import Player from "../../player/state/Player";
import GameObjectCollider from "../GameObjectCollider";

class Zapper extends Phaser.GameObjects.Container {
    declare body: Phaser.Physics.Arcade.Body;

    private zapperOne: Phaser.Physics.Arcade.Sprite;
    private zapperTwo: Phaser.Physics.Arcade.Sprite;
    private zapEffect: Phaser.Physics.Arcade.Sprite;
    private glowOne: Phaser.Physics.Arcade.Sprite;
    private glowTwo: Phaser.Physics.Arcade.Sprite;

    private listColliders: GameObjectCollider[];

    private rotationSpeed: number;
    private zapperDistance: number;
    private isRotate: boolean;
    private degree: number;

    constructor(scene: Phaser.Scene, zapperDistance: number, isRotate: boolean,  degree: number, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);

        this.zapperDistance = zapperDistance;
        this.isRotate = isRotate;
        this.degree = degree;
        this.init();
    }

    init() {
        this.listColliders = [];
        this.zapperOne = new Phaser.Physics.Arcade.Sprite(this.scene, 0, -this.zapperDistance/2, 'zapper').setOrigin(0.5, 0.5);
        this.zapperTwo = new Phaser.Physics.Arcade.Sprite(this.scene, 0, this.zapperDistance/2, 'zapper').setOrigin(0.5, 0.5);
        this.zapEffect = new Phaser.Physics.Arcade.Sprite(this.scene, 0, 0, 'zapEffect').setOrigin(0.5, 0.5);
        this.glowOne = new Phaser.Physics.Arcade.Sprite(this.scene, 0, -this.zapperDistance/2, 'glow').setOrigin(0.5, 0.5);
        this.glowTwo = new Phaser.Physics.Arcade.Sprite(this.scene, 0, this.zapperDistance/2, 'glow').setOrigin(0.5, 0.5);
        
        this.add(this.glowOne);
        this.add(this.glowTwo);
        this.add(this.zapEffect);
        this.add(this.zapperOne);
        this.add(this.zapperTwo);
        
        this.scene.physics.world.enable(this.zapperOne);
        this.scene.physics.world.enable(this.zapperTwo);

        this.scene.add.existing(this);
        this.zapperOne.body?.setSize(32, 32)
        this.zapperTwo.body?.setSize(32, 32)
        this.glowOne.setScale(0.8)
        this.glowTwo.setScale(0.8)

        this.zapperOne.flipY = true;

        this.zapperOne.setImmovable(true);
        this.zapperTwo.setImmovable(true);

        this.positionZapEffect();
        this.colliderOfZapEffect();
        this.rotationSpeed = Phaser.Math.DegToRad(30);
        this.setRotation(Phaser.Math.DegToRad(this.degree));

        this.playAnimation();
    }

    positionZapEffect() {
        // Tính toán trung tâm và khoảng cách giữa hai zapper
        const centerX = (this.zapperOne.x + this.zapperTwo.x) / 2;
        const centerY = (this.zapperOne.y + this.zapperTwo.y) / 2;
        const distance = Phaser.Math.Distance.Between(this.zapperOne.x, this.zapperOne.y, this.zapperTwo.x, this.zapperTwo.y);

        // Đặt vị trí và kích thước của zapEffect
        this.zapEffect.setPosition(centerX, centerY);
        this.zapEffect.displayWidth = distance; // Điều chỉnh chiều dài theo khoảng cách giữa hai zapper

        // Xoay zapEffect 90 độ để nó nằm dọc
        this.zapEffect.rotation = Phaser.Math.DegToRad(90);
        this.zapEffect.displayHeight = this.zapEffect.displayHeight/2
    }

    colliderOfZapEffect() {
        const distance = Phaser.Math.Distance.Between(this.zapperOne.x, this.zapperOne.y, this.zapperTwo.x, this.zapperTwo.y);

        const numColliders = Math.ceil(distance / 10); 
        for (let i = 0; i < numColliders; i++) {
            const colliderX = Phaser.Math.Linear(this.zapperOne.x, this.zapperTwo.x, i / (numColliders - 1));
            const colliderY = Phaser.Math.Linear(this.zapperOne.y, this.zapperTwo.y, i / (numColliders - 1));
            const collider = new GameObjectCollider(this.scene, colliderX, colliderY);
            collider.setSizeCollider(30, 30); 
            this.listColliders.push(collider);
        }

        this.listColliders.forEach(collider => {
            this.add(collider);
        });
        
    }

    preUpdate(time: number, deltaTime: number): void {   
        this.x -= 200*deltaTime/1000;
        if(this.isRotate){
            this.rotation += this.rotationSpeed * deltaTime / 1000;
        }
        if(this.x + 100 < 0){
            this.setActive(false);
            this.setVisible(false);
        }
        
    }

    playAnimation(){
        this.zapperOne.play('zapper');
        this.zapperTwo.play('zapper');
        this.glowOne.play('glow');
        this.glowTwo.play('glow');
    }

    checkCollisionWithPlayer(player: Player): void {
        this.scene.physics.add.collider(player, this.listColliders);
        this.scene.physics.add.collider(player, this.zapperOne);
        this.scene.physics.add.collider(player, this.zapperTwo);
    }

}

export default Zapper;
