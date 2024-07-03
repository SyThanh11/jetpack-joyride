class Score {
    private score: number
    private bestScore: number
    private coin: number

    constructor() {
        this.score = 0
        this.bestScore = Number(localStorage.getItem('bestScore')) || 0
        this.coin = 0
    }

    public setScore(value: number): void {
        this.score = value
    }

    public addScore(value: number): void {
        this.score += value
    }

    public setBestScore(value: number): void {
        this.bestScore = Math.max(this.bestScore, value)
        localStorage.setItem('bestScore', String(this.bestScore))
    }

    public getScore(): number {
        return this.score
    }

    public resetScore(): void {
        this.score = 0
    }

    public getBestScore(): number {
        const bestScore = localStorage.getItem('bestScore')
        if (bestScore === null) {
            return 0
        }
        return Number(bestScore)
    }

    public saveScore(): void {
        let bestScore = localStorage.getItem('bestScore')
        if (bestScore === null) {
            bestScore = String(this.score)
        } else {
            if (Number(bestScore) < this.score) {
                bestScore = String(this.score)
            }
        }
        localStorage.setItem('bestScore', bestScore)
        this.bestScore = Number(bestScore)
    }

    public getCoin(): number {
        return this.coin
    }

    public setCoin(value: number): void {
        this.coin = value
    }

    public resetCoin(): void {
        this.coin = 0
    }

    public saveCoin(): void {
        localStorage.setItem('coin', String(this.coin))
    }

    public addCoin(): void {
        this.coin += 1
    }
}

export default Score
