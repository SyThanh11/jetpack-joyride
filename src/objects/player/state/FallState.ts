import DieState from "./DieState";
import FlyState from "./FlyState";
import Player from "./Player";
import PlayerState from "./PlayerState";
import TakeOffState from "./TakeOffState";

class FallState extends PlayerState {
    enter(player: Player): void {
        player.playAnimation('fallBody', 'fallHead', 'fallJetpack');
        player.body.setVelocityY(0);
        player.body.setGravityY(500);
    }

    handlePointerDown(player: Player): void {
        player.setCurrentState(new FlyState());
    }

    handleCollision(player: Player): void {        
       player.setCurrentState(new DieState());
    }

    update(player: Player): void {        
        if(player.y >= 700){
            player.setCurrentState(new TakeOffState())
        }
    }
}

export default FallState;