import Player from "./Player";

class PlayerState {
    enter(player: Player): void {};
    handlePointerDown(player: Player): void {}
    handlePointerUp(player: Player): void {}
    handleCollision(player: Player): void {}
    update(player: Player): void {}
}

export default PlayerState;