class Play extends Phaser.Scene {
    constructor() {
        super("playScene");        
    }
    preload() {}
    create(){
        //play scene variable set up
        this.gameOver = false;
        this.bipor = true;
        //background creation
        this.sunset = this.add.tileSprite(0, 0, 640, 360, `${portalCompleteList[currentDim]}bgd`).setOrigin(0,0);
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


        this.asteroids = this.add.group({
            classType: asteroid,
            runChildUpdate: true,
            maxSize: 10
        });
        this.essences = this.add.group({
            classType: asteroid,
            runChildUpdate: true,
            maxSize: 10
        })

        this.scene.run('gameUIScene', {active: true});
        
        this.possiblePortals = new Array(portalCompleteList.length);
        for(let i = 0; i < portalCompleteList.length; i++){
            this.possiblePortals[i] = portalCompleteList[i];
        }
        console.log(this.possiblePortals);
        this.currentPortals = 0;
         this.totalPortals = 1;
        this.possiblePortals.splice(currentDim, 1);
        this.portal = this.add.group({
            classType: portal,
            runChildUpdate: true,
            maxsSize: -1
        });
        this.portalType = null;
        sceneEvents.on('spawnPortal', () => {
            this.portalType = this.possiblePortals[0];
            this.bipor = false;
        });

        this.physics.world.on('overlap', (gameObject1, gameObject2, body1, body2) =>{

            if(gameObject2.texture.key == this.portalType){
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
                        currentDim = portalCompleteList.indexOf(this.portalType);
                        this.scene.start('playScene');
                    }
                });
                
            }
            if(gameObject2.texture.key == 'asteroid'){
                gameObject2.kill();
                this.P1.PlayerAsteroidOverlap(); 
            }
            if(gameObject2.texture.key == 'essence'){
                gameObject2.kill();
                sceneEvents.emit('collectEssence');

            }
        });
        //timing vars for spawning
        this.nextAsteroid = this.sys.game.loop.time + 700;
        this.nextEssence = this.sys.game.loop.time + 700;
    }

    update(){
        
        if(this.asteroids.countActive(true) < this.asteroids.maxSize){    
            if(this.sys.game.loop.time > this.nextAsteroid ){
                //this.time.delayedCall(Phaser.Math.Between(1000, 10000), () => {
                    this.asteroids.add(new asteroid(this,
                        (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2 , horizonLine / 2),
                        164, 
                        'asteroid',
                    ));
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
        if(this.portalType != null){
            if(this.currentPortals < this.totalPortals){    
                this.currentPortals ++;
                this.portal.add(new portal(this,
                    (game.config.width / 2) + Phaser.Math.Between(-horizonLine / 2 , horizonLine / 2),
                    164, 
                    this.portalType,
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
        }
        if(this.P1.health == 0){
            this.gameOver = true;
            this.asteroids.clear(true, true);
            this.time.delayedCall(1000, () => {
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
            });
        }
    } 
}
/*
audio set up based on paddleParkour
        this.bikeSFX = this.sound.add('bikePetal', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bikeSFX.play();

this.tweens.add({
    targets: this.bikeSFX,
    volume: 0,
    ease: 'Linear',
    duration: 2000
});

this.anims.create({
            key: 'warningFlash',
            defaultTextureKey: 'warning',
            frames:  this.anims.generateFrameNames('warning', {
                prefix: 'warning',
                suffix: '.png',
                start: 0,
                end: 2,
                zeroPad: 0,
            }),
                loop: 4,
                duration: 1000,
        });


this.AIFrames = ['white', 'lightBlue', 'red', 'green', 'pink', 'blue'];
        this.AIBikers = this.add.group({
            classType: AI,
            runChildUpdate: true,
            maxsize: -1
        });
        this.totalAI = 5;
        for(let i = 0;  i < 5; i++){
            this.AIBikers.add(new AI(this,
            (i/5) * ( 360 - (UIBorderX + grassWidth) * 2 )  + UIBorderX * 2 + grassWidth ,
            UIBorderY, 
            'AIBike',
            this.AIFrames[Math.floor(Math.random()*6)]
            ));
            
        }


this.AIBikers.createMultiple({
            key: 'AIBike',
            setXY: {
                x: Math.floor(Math.random()*360-(UIBorderX + grassWidth))+UIBorderX + grassWidth,
                y:UIBorderY
            }

if(addAI){     
            this.AIBikers.add(new AI(this,
                game.config.width / 2,
                UIBorderY, 
                'AIBike',
                this.AIFrames[Math.floor(Math.random()*6)]
            ));
            addAI = false;  
        } 

PlayerHitSpikes(gameObject1, gameObject2){
        gameObject1.health --;
        gameObject2.disableBody(true,false);
        gameObject1.breakDown = true;
        gameObject2.inPlayerReset = true;
        this.cameras.main.shake(10,2);
        sceneEvents.emit('playerUseRepair', gameObject1.health);
        this.blink = this.tweens.chain({
            targets: gameObject1,
            tweens: [
                {
                    alpha:0,
                    duration: 40
                },
                {
                    alpha: 1,
                    duration: 40
                },
            ],
            loop: 15,
            onComplete: () => {
                this.P1.breakDown = false;
                gameObject2.inPlayerReset = false;
            }
        });
    }         
 */