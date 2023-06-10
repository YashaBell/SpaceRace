class asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onOverlap = true;
        this.body.isCircle = true;
        this.scene = scene;
        this.scale = .14;
        this.body.drag = 0;
        this.firstX = (game.config.width - horizonLine) / 2;
        this.targetX = (this.x - this.firstX) * game.config.width / horizonLine;
        this.constVelocity = 5;
        this.body.velocity.y = 198/ this.constVelocity;
        //set x velocity to move to the correct end target
        this.body.velocity.x = (this.targetX - this.x) / this.constVelocity;
        this.anims.create({
            key: 'asteroidFly',
            defaultTextureKey: 'asteroid',
            frames:  this.anims.generateFrameNames('asteroid', {
                prefix: 'asteroid_',
                suffix: '',
                start: 0,
                end:5,
                zeroPad: 0,
        }),
            duration: 600,
            repeat: -1
        });
        if(this.texture.key == 'asteroid'){this.anims.play('asteroidFly');}
    }
    update() {
        if(this.texture.key == 'asteroid'){
            this.scale = ((this.y - 128) / 128) * 3;
            this.angle = - Math.atan(this.body.velocity.x / this.body.velocity.y) * 180/Math.PI;
            this.body.setOffset( Math.sin( (this.angle) * Math.PI/180 ) * - 7.5 ,  Math.cos( (this.angle) * Math.PI/180) * 7.5 );
        }
        if(this.texture.key == 'essence'){this.scale = ((this.y - 128) / 128) / 2;}
        if(this.y > game.config.height + this.body.height / 2){
            this.destroy();
        }

    }
}
