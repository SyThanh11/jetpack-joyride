import DieState from "./DieState";
import FallState from "./FallState";
import Player from "./Player";
import PlayerState from "./PlayerState";

class FlyState extends PlayerState {
    enter(player: Player): void {        
        player.playAnimation('flyBody', 'flyHead', 'flyJetpack');
        player.body.setVelocityY(-300);
        player.body.setGravityY(0);
    }

    handlePointerUp(player: Player): void {                
        player.setCurrentState(new FallState());
    }

    handleCollision(player: Player): void {
        player.setCurrentState(new DieState());
    }
}

export default FlyState;