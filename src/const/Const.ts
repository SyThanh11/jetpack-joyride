const CONST = {
    GAME_WIDTH: Number(innerWidth) * devicePixelRatio,
    GAME_HEIGHT: Number((innerWidth * 9) / 16) * devicePixelRatio,
    ANIMATION_COMPLETE_KEY: Phaser.Animations.Events.ANIMATION_COMPLETE_KEY,
    ANIMATION_COMPLETE: 'animationcomplete',
    ANIMATION_START: 'animationstart',
}

export default CONST
