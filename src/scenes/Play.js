class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.invulnerabilityTimer = null;
    }
    preload() {


    }

    create() {

        //play scene variable set up
        this.gameOver = false;
        this.bipor = true;
        //background creation
        this.sunset = this.add.tileSprite(0, 0, 640, 360, `bgd`).setOrigin(0, 0);
        this.sunset.tint = portalTint[currentDim];
        this.shmmovvin = this.add.sprite(game.config.width, game.config.height, 'gridMove').setOrigin(1, 1);
        this.shmmovvin.tint = portalTint[currentDim];
        //physics world bounds
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height);
        this.shmmovvin.anims.play('gridMoveAnim');

        //audio set up based on paddleParkour
        this.bgdMusic = this.sound.add(`dimension_${Phaser.Math.Between(1, 2)}`, {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        });
        this.bgdMusic.play();

        //key binds
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        this.P1 = new jetPack(this, game.config.width / 2, game.config.height - playerBuffer, 'jetpack', 'jetpack_00.png').setDepth(1);
        this.P1.isInvulnerable = false;  // Initialize isInvulnerable property

        

        this.asteroids = this.add.group({
            classType: asteroid,
            runChildUpdate: true,
            maxSize: 10
        });
        this.essences = this.add.group({
            classType: asteroid,
            runChildUpdate: true,
            maxSize: 10
        });
        this.powerUps = this.add.group({
            classType: PowerUp,
            runChildUpdate: true,
            maxSize: 10
        });
        this.lifePowerUps = this.add.group({
            classType: LifePowerUp,
            runChildUpdate: true,
            maxSize: 10
        });

        this.scene.run('gameUIScene', { active: true });

        this.possiblePortals = new Array(portalTint.length);
        for (let i = 0; i < portalTint.length; i++) {
            this.possiblePortals[i] = portalTint[i];
        }
        console.log(this.possiblePortals);

        this.possiblePortals.splice(currentDim, 1);

        this.portal = this.add.group({
            classType: portal,
            runChildUpdate: true,
            maxSize: 1
        });
        this.portalType = null;
        sceneEvents.on('spawnPortal', () => {
            this.portalType = this.possiblePortals[Phaser.Math.Between(0, this.possiblePortals.length - 1)];
            this.bipor = false;
        });
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('spawnPortal');
        });
        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) => {
            gameObject2.onOverlap = false;

            if (gameObject2.texture.key == 'portal') {
                score += 100;
                this.P1.setAcceleration(0,0);
                this.P1.setVelocity(0,0);
                this.gameOver = true;
                gameObject2.playerContact = true;
                gameObject2.setDepth(2);
                this.asteroids.clear(true, true);
                this.essences.clear(true, true);
                this.powerUps.clear(true, true);
                this.lifePowerUps.clear(true, true);
                if (score > 1200) {
                    this.gameOver = true;
                    this.scene.stop('gameUIScene');
                    this.bgdMusic.destroy();
                    this.scene.start('homeScene');
    
                }else{
                    this.tweens.add({
                        targets: this.bgdMusic,
                        volume: 0,
                        ease: 'Linear',
                        duration: 2000,
                        onComplete: () => {
                            this.bgdMusic.destroy();
                        }
                    });
                    this.tweens.chain({
                        targets: gameObject2,
                        tweens: [
                            {
                                scale: 40,
                                duration: 2000
                            }
                        ],
                        onComplete: () => {
                            currentDim = portalTint.indexOf(this.portalType);
                            this.scene.start('playScene');
                        }
                    });
                }
            }
            if (gameObject2.texture.key == 'asteroid') {
                this.temp = this.add.sprite(gameObject2.x, gameObject2.y, 'explosion');
                this.temp.angle = gameObject2.angle;
                this.temp.scale = gameObject2.scale;
                gameObject2.destroy();

                if (gameObject1.isInvulnerable) {
                    gameObject1.isInvulnerable = false;
                    gameObject2.destroy();
                } else {
                    gameObject1.PlayerAsteroidOverlap();
                }

                this.temp.anims.play('boom');
                this.temp.on('animationcomplete', () => {
                    this.temp.destroy();
                });
            }
            if (gameObject2.texture.key == 'essence') {
                gameObject2.destroy();
                sceneEvents.emit('collectEssence');

            }
            if (gameObject2.texture.key == 'PowerUp') {
                gameObject2.destroy();
                gameObject1.isInvulnerable = true;

                if (this.invulnerabilityTimer !== null) {
                    this.invulnerabilityTimer.remove(false);
                }
                this.P1.activateShield();

                // Add a timer that will set isInvulnerable back to false after 10 seconds
                this.invulnerabilityTimer = this.time.delayedCall(10000, () => {
                    gameObject1.isInvulnerable = false;
                    this.P1.removeShield();
                    this.invulnerabilityTimer = null; // Reset the timer
                });
            }

            //need to add collision behavior

        });
        //timing vars for spawning
        this.nextAsteroid = this.sys.game.loop.time + 700;
        this.nextEssence = this.sys.game.loop.time + 700;
        this.nextPowerUp = this.sys.game.loop.time + 1400;
        this.nextLifePowerUp = this.sys.game.loop.time + 1400;

    }

    update() {
        if (!this.gameOver) {
            if (this.asteroids.countActive(true) < this.asteroids.maxSize) {
                if (this.sys.game.loop.time > this.nextAsteroid) {
                    //this.time.delayedCall(Phaser.Math.Between(1000, 10000), () => {
                    this.asteroids.add(new asteroid(this,
                        (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2, horizonLine / 2),
                        164,
                        'asteroid',
                    )).setOrigin(0.5);
                    this.nextAsteroid = this.sys.game.loop.time + 700;
                    //});
                }
            }
            if (this.essences.countActive(true) < this.essences.maxSize && this.bipor) {
                if (this.sys.game.loop.time > this.nextEssence) {
                    //this.time.delayedCall(Phaser.Math.Between(1000, 10000), () => {
                    this.essences.add(new asteroid(this,
                        (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2, horizonLine / 2),
                        164,
                        'essence',
                    ));
                    this.nextEssence = this.sys.game.loop.time + 700;
                    //});
                }
            }

            if (this.powerUps.countActive(true) < this.powerUps.maxSize) {
                if (this.sys.game.loop.time > this.nextPowerUp) {
                    this.powerUps.add(new PowerUp(this,
                        (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2, horizonLine / 2),
                        164,
                        'PowerUp',
                    ));
                    this.nextPowerUp += this.sys.game.loop.time + 1400;

                }
            }
            //spawns life
            if (this.lifePowerUps.countActive(true) < this.lifePowerUps.maxSize) {
                if (this.sys.game.loop.time > this.nextLifePowerUp) {
                    this.lifePowerUps.add(new LifePowerUp(this,
                        (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2, horizonLine / 2),
                        164,
                    ));
                    this.nextLifePowerUp += this.sys.game.loop.time + 1400;

                }
            }

            if (this.portalType != null) {
                if (this.portal.countActive(true) < this.portal.maxSize) {
                    this.portalCur++
                    console.log(this.portalType)
                    this.portal.add(new portal(this,
                        (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2, horizonLine / 2),
                        164,
                        'portal',
                    ));

                }
            }

            this.P1.update();
            this.physics.world.overlap(this.P1, this.portal);

            this.physics.world.overlap(this.P1, this.powerUps, (player, powerUp) => {
                powerUp.destroy();
                player.isInvulnerable = true;

                if (this.invulnerabilityTimer !== null) {
                    this.invulnerabilityTimer.remove(false);
                }
                this.invulnerabilityTimer = this.time.delayedCall(10000, () => {
                    player.isInvulnerable = false;
                    this.invulnerabilityTimer = null;
                });


            });
            this.physics.world.overlap(this.P1, this.lifePowerUps, (player, lifePowerUp) => {
                lifePowerUp.destroy();
                sceneEvents.emit('collectedLife');
            });

            this.physics.world.overlap(this.P1, this.essences);

            //onOverlap isn't working so I did it myself **** you phaser
            if (this.P1.body.onOverlap) {
                this.physics.world.overlap(this.P1, this.asteroids);
            }
            if (health <= 0) {
                this.P1.setAcceleration(0,0);
                this.P1.setVelocity(0,0);
                this.gameOver = true;
                this.scene.stop('gameUIScene');
                this.asteroids.clear(true, true);
                this.essences.clear(true, true);
                this.powerUps.clear(true, true);
                this.lifePowerUps.clear(true, true);
                this.tweens.add({
                    targets: this.bgdMusic,
                    volume: 0,
                    ease: 'Linear',
                    duration: 2000,
                    onComplete: () => {
                        this.bgdMusic.destroy();
                        this.scene.start('gameOverScene');
                    }
                });
            }
        }
    }
}