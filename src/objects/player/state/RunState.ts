import DieState from "./DieState";
import FlyState from "./FlyState";
import Player from "./Player";
import PlayerState from "./PlayerState";

class RunState extends PlayerState {
    enter(player: Player): void {
        player.playAnimation('runBody', 'runHead', 'runJetpack');
        player.body.setVelocityX(400);
    }

    handlePointerDown(player: Player): void {
        player.setCurrentState(new FlyState())
    }

    handleCollision(player: Player): void {
        player.setCurrentState(new DieState())
    }
}

export default RunState;