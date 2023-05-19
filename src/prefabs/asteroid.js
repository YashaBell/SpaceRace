class asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onOverlap = true;
        this.body.isCircle = true;
        this.scene = scene;
        this.body.drag = 0;
        this.firstX = (game.config.width - horizonLine) / 2;
        this.targetX = (this.x - this.firstX) * game.config.width / horizonLine;
        this.constVelocity = 5;
        this.body.velocity.y = 198/ this.constVelocity;
        //set x velocity to move to the correct end target
        this.body.velocity.x = (this.targetX - this.x) / this.constVelocity;
        this.angle = - Math.atan(this.body.velocity.x / this.body.velocity.y) * 180/Math.PI;
        this.body.setOffset(this.body.velocity.x * 0.15, this.body.velocity.y * 0.15);
        this.anims.create({
            key: 'asteroidFly',
            defaultTextureKey: 'asteroid',
            frames:  this.anims.generateFrameNames('asteroid', {
                prefix: 'asteroid_',
                suffix: '.png',
                start: 0,
                end:5,
                zeroPad: 0,
        }),
            duration: 600,
            repeat: -1
        });
        this.anims.play('asteroidFly');

    }
    update() {
        this.scale = ((this.y - 128) / 128) * 3;
        if(this.y > game.config.height + this.body.height / 2){
            this.kill()
        }

    }
    kill(){
        this.scene.currentAsteroid --;
        this.destroy();
    }

    

}
