class Play extends Phaser.Scene {
    constructor() {
        super("playScene");        
    }
    preload() {
        this.load.spritesheet('rotatingOrbs', './assets/rotating_orbs.png', { frameWidth: 32, frameHeight: 32 });
    }
    create(){
        
        //play scene variable set up
        this.gameOver = false;
        this.bipor = true;
        //background creation
        this.sunset = this.add.tileSprite(0, 0, 640, 360, `bgd`).setOrigin(0,0);
        this.sunset.tint= portalTint[currentDim];
        this.shmmovvin = this.add.sprite(game.config.width, game.config.height, 'gridMove').setOrigin(1,1);
        //physics world bounds
        this.physics.world.setBounds(0,0,game.config.width,game.config.height);
        this.shmmovvin.anims.play('gridMoveAnim');

        //audio set up based on paddleParkour
        this.bgdMusic = this.sound.add('dimension_1', { 
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




        this.anims.create({
            key: 'bubble',
            frames: this.anims.generateFrameNumbers('rotatingOrbs', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

          
      

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

        
        

        this.scene.run('gameUIScene', {active: true});
        
        this.possiblePortals = new Array(portalTint.length);
        for(let i = 0; i < portalTint.length; i++){
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
        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) =>{
            gameObject2.onOverlap = false;

            if(gameObject2.texture.key == 'portal'){
                console.log(true);
                this.gameOver = true;
                gameObject2.playerContact = true;
                gameObject2.setDepth(2);
                this.asteroids.clear(true, true);
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
            if(gameObject2.texture.key == 'asteroid'){
                this.temp = this.add.sprite(gameObject2.x, gameObject2.y, 'explosion');
                this.temp.angle = gameObject2.angle;
                this.temp.scale = gameObject2.scale;
                gameObject2.destroy();
                this.P1.PlayerAsteroidOverlap(); 
                this.temp.anims.play('boom');
                this.temp.on('animationcomplete', () => {
                    this.temp.destroy();
                });
            }
            if(gameObject2.texture.key == 'essence'){
                gameObject2.destroy();
                sceneEvents.emit('collectEssence');

            }
            if(gameObject2.texture.key ==  'PowerUp'){
                gameObject2.destroy();
                gameObject1.isInvulnerable = true;
            }

        });
        //timing vars for spawning
        this.nextAsteroid = this.sys.game.loop.time + 700;
        this.nextEssence = this.sys.game.loop.time + 700;
        this.nextPowerUp = this.sys.game.loop.time + 1400;
    }

    update(){
        
        if(this.asteroids.countActive(true) < this.asteroids.maxSize){    
            if(this.sys.game.loop.time > this.nextAsteroid ){
                //this.time.delayedCall(Phaser.Math.Between(1000, 10000), () => {
                    this.asteroids.add(new asteroid(this,
                        (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2 , horizonLine / 2),
                        164, 
                        'asteroid',
                    )).setOrigin(0.5);
                    this.nextAsteroid = this.sys.game.loop.time + 700;
                //});
            }
        }
        if(this.essences.countActive(true) < this.essences.maxSize && this.bipor){    
            if(this.sys.game.loop.time > this.nextEssence){
                //this.time.delayedCall(Phaser.Math.Between(1000, 10000), () => {
                    this.essences.add(new asteroid(this,
                        (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2 , horizonLine / 2),
                        164, 
                        'essence',
                    ));
                    this.nextEssence = this.sys.game.loop.time + 700;
                //});
            }
        }
        if(this.powerUps.countActive(true) < this.powerUps.maxSize){    
            if(this.sys.game.loop.time > this.nextPowerUp){
                    this.powerUps.add(new PowerUp(this,
                        (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2 , horizonLine / 2),
                        164, 
                        'PowerUp',
                    ));
                    this.nextPowerUp += this.sys.game.loop.time + 1400;
                
            }
        }
        this.physics.world.overlap(this.P1, this.powerUps, (player, powerUp) => {
            powerUp.destroy();
            player.isInvulnerable = true;
        });

        this.physics.world.overlap(this.P1, this.asteroids, (player, asteroid) => {
            if (player.isInvulnerable) {
                player.isInvulnerable = false;
                asteroid.destroy();
            } else {
                player.PlayerAsteroidOverlap(); 
            }
        });

        
        if(this.portalType != null){
            if(this.portal.countActive(true) < this.portal.maxSize){    
                this.portalCur ++
                console.log(this.portalType)
                this.portal.add(new portal(this,
                    (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2 , horizonLine / 2),
                    164, 
                    'portal',
                ));
                
            }
        }
        
        
        this.P1.update();
        if(!this.gameOver){
            this.P1.update();
            this.physics.world.overlap(this.P1, this.portal);
            this.physics.world.overlap(this.P1, this.essences);
            
            //onOverlap isn't working so I did it myself fuck you phaser
            if(this.P1.body.onOverlap){
                this.physics.world.overlap(this.P1, this.asteroids);
            }
            if(this.P1.health == 0){
                this.gameOver = true;
                this.asteroids.clear(true, true);
                this.tweens.add({
                    targets: this.bgdMusic,
                    volume: 0,
                    ease: 'Linear',
                    duration: 2000,
                    onComplete: () => {
                        this.bgdMusic.destroy();
                        this.scene.stop('gameUIScene');
                        this.scene.start('gameOverScene');
                    }
                });
            }
        }
    } 
}