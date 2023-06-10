class jetPack extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame);
        this.scene = scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onOverlap = true;
        this.body.setCollideWorldBounds(true);
        this.accel = 400;
        this.drag = 400;
        this.scale = 1;
        this.isInvulnerable = false;

        this.anims.create({
            key: 'flyingLoop',
            defaultTextureKey: 'jetPack',
            frames:  this.anims.generateFrameNames('jetpack', {
                prefix: 'jetpack_',
                suffix: '.png',
                start: 0,
                end:6,
                zeroPad: 2,
        }),
            duration: 700,
            repeat: -1
        });
        this.anims.play('flyingLoop');

        this.shield = this.scene.add.sprite(x, y, 'shield');
        this.shield.setVisible(false);
        this.shield.setScale(.9); // Scale shield sprite
        this.shield.depth = 1; // Set shield sprite depth


    }
    create() {}
    
    update() {
        this.angle = this.body.velocity.x/7;
        if(keyA.isDown && this.x >= this.width){
            this.body.setAccelerationX(-this.accel)
        } else if (keyD.isDown && this.x <= game.config.width - this.width) {
            this.body.setAccelerationX(this.accel);
        }else {
            this.body.setAccelerationX(0);
            if(this.body.velocity.x < 0){
                this.body.setAccelerationX(this.accel);
            }
            if(this.body.velocity.x > 0){
                this.body.setAccelerationX(-this.accel);
            }
        }

        

        this.shield.x = this.x;
        this.shield.y = this.y;

       
        if (this.isInvulnerable) {
            this.shield.x = this.x;
            this.shield.y = this.y;
            this.shield.setVisible(true);
        } else {
            this.shield.setVisible(false);
        }


        
        }
    PlayerAsteroidOverlap(){
        if(this.isInvulnerable == false){
            this.body.onOverlap = false;
            this.body.setVelocityY(0);
            this.body.setVelocityX(0);
            this.scene.cameras.main.shake(300 , .01);
            sceneEvents.emit('lostLife', health);
            this.blink = this.scene.tweens.chain({
                targets: this,
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
                    this.body.onOverlap = true;
                }
            });
            
        }

    }
    
    activateShield() {
        // If the shield is already visible, no need to activate it again
        if (!this.shield.visible) {
            this.shield.setVisible(true);
            this.isInvulnerable = true;
        }
    }
    
    removeShield() {
        // If the shield is not visible, no need to remove it
        if (this.shield.visible) {
            this.shield.setVisible(false);
            this.isInvulnerable = false;
        }
    }

    
}
