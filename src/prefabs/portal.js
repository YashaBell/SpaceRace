class portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onOverlap = true;
        this.body.isCircle = true;
        this.playerContact = false;
        this.scene = scene;
        this.alpha = 1;
        this.tint = this.scene.portalType
        this.body.drag = 0;
        this.firstX = (game.config.width - horizonLine) / 2;
        this.targetX = (this.x - this.firstX) * game.config.width / horizonLine;
        this.constVelocity = 5;
        this.body.velocity.y = 198/ this.constVelocity;
        //set x velocity to move to the correct end target
        this.body.velocity.x = (this.targetX - this.x) / this.constVelocity;
        this.anims.create({
            key: 'portalSpin',
            defaultTextureKey: texture,
            frames:  this.anims.generateFrameNames(texture, {
                prefix: 'portal_',
                suffix: '',
                start: 0,
                end:2,
                zeroPad: 0,
        }),
            duration: 300,
            repeat: -1
        });
        this.anims.play('portalSpin');

    }
    update() {
        if(!this.playerContact){
            this.scale = ((this.y - 128) / 128);
            if(this.y > game.config.height + this.body.height / 2){
                this.kill()
            }
        }
    }
    kill(){
        this.scene.currentPortals --;
        this.destroy();
    }
}
