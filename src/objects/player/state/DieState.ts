import Player from "./Player";
import PlayerState from "./PlayerState";

class DieState extends PlayerState {
    enter(player: Player): void {
        player.playAnimation('dieBody', 'dieHead');
        player.remove(player.getJetpack(), true);

        player.body.setGravityY(1000); 
        player.body.setBounce(0.5); 
        player.body.setCollideWorldBounds(true); 
        player.body.onCollide = false;

        player.getDefaultBody().on('animationcomplete-dieBody', () => {
            player.playAnimation('dieBodyTwo', 'dieHeadTwo');
            player.rotation = Phaser.Math.DegToRad(-90);

            player.scene.physics.world.on('worldbounds', () => {
                this.onHitGround(player);
            });
        });
    }

    private onHitGround(player: Player): void {
        if (player.body.onFloor()) {
            player.body.setBounce(0.2); 
            player.body.setVelocityX(0);
        }
    }
}

export default DieState;
