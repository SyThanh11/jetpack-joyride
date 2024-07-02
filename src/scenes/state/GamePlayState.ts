interface State {
    enter(): void
    exit(): void
    update(time: number, delta: number): void
}

export default State
