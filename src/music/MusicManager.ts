class MusicManager {
    private static instance: MusicManager
    private musicLevel: Phaser.Sound.BaseSound
    private musicCoinPickUp: Phaser.Sound.BaseSound
    private runMetalMusic: Phaser.Sound.BaseSound
    private playerHurt: Phaser.Sound.BaseSound
    private playerBones: Phaser.Sound.BaseSound
    private fallBounce: Phaser.Sound.BaseSound
    private jetpackFire: Phaser.Sound.BaseSound
    private jetpackStop: Phaser.Sound.BaseSound

    private laserFireLPMusic: Phaser.Sound.BaseSound
    private laserStartMusic: Phaser.Sound.BaseSound
    private laserStopMusic: Phaser.Sound.BaseSound
    private laserWarningMusic: Phaser.Sound.BaseSound

    private missileLaunchMusic: Phaser.Sound.BaseSound
    private rocketExplodeMusic: Phaser.Sound.BaseSound
    private missileWarningMusic: Phaser.Sound.BaseSound

    private selectButtonMusic: Phaser.Sound.BaseSound

    private constructor(scene: Phaser.Scene) {
        this.musicLevel = scene.sound.add('musicLevel', {
            loop: true,
        })
        this.musicCoinPickUp = scene.sound.add('coinPickUpThree', {
            loop: false,
        })
        this.runMetalMusic = scene.sound.add('runMetalMusic', {
            loop: true,
        })
        this.playerHurt = scene.sound.add('playerHurt', {
            loop: false,
        })
        this.playerBones = scene.sound.add('playerBones', {
            loop: false,
        })
        this.fallBounce = scene.sound.add('fallBounce', {
            loop: false,
        })
        this.jetpackFire = scene.sound.add('jetpackFireLP', {
            loop: true,
        })
        this.jetpackStop = scene.sound.add('jetpackStop', {
            loop: false,
        })
        this.laserFireLPMusic = scene.sound.add('laserFireLPMusic')
        this.laserStartMusic = scene.sound.add('laserStartMusic')
        this.laserStopMusic = scene.sound.add('laserStopMusic')
        this.laserWarningMusic = scene.sound.add('laserWarningMusic')

        this.missileLaunchMusic = scene.sound.add('missileLaunchMusic')
        this.rocketExplodeMusic = scene.sound.add('rocketExplodeMusic')
        this.missileWarningMusic = scene.sound.add('missileWarningMusic')

        this.selectButtonMusic = scene.sound.add('selectButtonMusic')
    }

    public static getInstance(scene: Phaser.Scene): MusicManager {
        if (!MusicManager.instance) {
            MusicManager.instance = new MusicManager(scene)
        }
        return MusicManager.instance
    }

    public playMusicLevel(): void {
        if (this.musicLevel.isPlaying) {
            this.musicLevel.stop()
        }
        this.musicLevel.play()
    }

    public playMusicCoinPickUp(): void {
        if (this.musicCoinPickUp.isPlaying) {
            this.musicCoinPickUp.stop()
        }
        this.musicCoinPickUp.play()
    }

    public playRunMetalMusic(): void {
        if (this.runMetalMusic.isPlaying) {
            this.runMetalMusic.stop()
        }
        this.runMetalMusic.play()
    }

    public playPlayerHurt(): void {
        if (this.playerHurt.isPlaying) {
            this.playerHurt.stop()
        }
        this.playerHurt.play()
    }

    public playPlayerBones(): void {
        if (this.playerBones.isPlaying) {
            this.playerBones.stop()
        }
        this.playerBones.play()
    }

    public playFallBounce(): void {
        if (this.fallBounce.isPlaying) {
            this.fallBounce.stop()
        }
        this.fallBounce.play()
    }

    public playJetpackFire(): void {
        if (this.jetpackFire.isPlaying) {
            this.jetpackFire.stop()
        }
        this.jetpackFire.play()
    }

    public playJetpackStop(): void {
        if (this.jetpackStop.isPlaying) {
            this.jetpackStop.stop()
        }
        this.jetpackStop.play()
    }

    public playLaserFireLPMusic(): void {
        if (this.laserFireLPMusic.isPlaying) {
            this.laserFireLPMusic.stop()
        }
        this.laserFireLPMusic.play()
    }

    public playLaserStartMusic(): void {
        if (this.laserStartMusic.isPlaying) {
            this.laserStartMusic.stop()
        }
        this.laserStartMusic.play()
    }

    public playLaserStopMusic(): void {
        if (this.laserStopMusic.isPlaying) {
            this.laserStopMusic.stop()
        }
        this.laserStopMusic.play()
    }

    public playLaserWarningMusic(): void {
        if (this.laserWarningMusic.isPlaying) {
            this.laserWarningMusic.stop()
        }
        this.laserWarningMusic.play()
    }

    public playMissileLaunchMusic(): void {
        if (this.missileLaunchMusic.isPlaying) {
            this.missileLaunchMusic.stop()
        }
        this.missileLaunchMusic.play()
    }

    public playRocketExplodeMusic(): void {
        if (this.rocketExplodeMusic.isPlaying) {
            this.rocketExplodeMusic.stop()
        }
        this.rocketExplodeMusic.play()
    }

    public playMissileWarningMusic(): void {
        if (this.missileWarningMusic.isPlaying) {
            this.missileWarningMusic.stop()
        }
        this.missileWarningMusic.play()
    }

    public playSelectButtonMusic(): void {
        if (this.selectButtonMusic.isPlaying) {
            this.selectButtonMusic.stop()
        }
        this.selectButtonMusic.play()
    }

    public pauseMusicLevel(): void {
        this.musicLevel.pause()
    }

    public resumeMusicLevel(): void {
        this.musicLevel.resume()
    }

    public stopMusicLevel(): void {
        this.musicLevel.stop()
    }

    public stopMusicCoinPickUp(): void {
        this.musicCoinPickUp.stop()
    }

    public stopRunMetalMusic(): void {
        this.runMetalMusic.stop()
    }

    public stopPlayerHurt(): void {
        this.playerHurt.stop()
    }

    public stopPlayerBones(): void {
        this.playerBones.stop()
    }

    public stopFallBounce(): void {
        this.fallBounce.stop()
    }

    public stopJetpackFire(): void {
        this.jetpackFire.stop()
    }

    public stopJetpackStop(): void {
        this.jetpackStop.stop()
    }

    public stopLaserFireLPMusic(): void {
        this.laserFireLPMusic.stop()
    }

    public stopLaserStartMusic(): void {
        this.laserStartMusic.stop()
    }

    public stopLaserStopMusic(): void {
        this.laserStopMusic.stop()
    }

    public stopLaserWarningMusic(): void {
        this.laserWarningMusic.stop()
    }

    public stopMissileLaunchMusic(): void {
        this.missileLaunchMusic.stop()
    }

    public stopRocketExplodeMusic(): void {
        this.rocketExplodeMusic.stop()
    }

    public stopMissileWarningMusic(): void {
        this.missileWarningMusic.stop()
    }

    public stopSelectButtonMusic(): void {
        this.selectButtonMusic.stop()
    }

    public stopAllMusics(): void {
        this.musicLevel.stop()
        this.musicCoinPickUp.stop()
        this.runMetalMusic.stop()
        this.playerHurt.stop()
        this.playerBones.stop()
        this.fallBounce.stop()
        this.jetpackFire.stop()
        this.jetpackStop.stop()
        this.laserFireLPMusic.stop()
        this.laserStartMusic.stop()
        this.laserStopMusic.stop()
        this.laserWarningMusic.stop()
        this.missileLaunchMusic.stop()
        this.rocketExplodeMusic.stop()
        this.missileWarningMusic.stop()
        this.selectButtonMusic.stop()
    }
}

export default MusicManager
