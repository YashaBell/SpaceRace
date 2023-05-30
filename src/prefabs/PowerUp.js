class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.onOverlap = true;
      this.body.isCircle = true;
      this.scene = scene;
      this.body.drag = 0;
      this.firstX = (game.config.width - horizonLine) / 2;
      this.targetX = (this.x - this.firstX) * game.config.width / horizonLine;
      this.constVelocity = 5;
      this.body.velocity.y = 198 / this.constVelocity;
      this.body.velocity.x = (this.targetX - this.x) / this.constVelocity;

      //this.setScale(10.25); // Adjust the scale value to shrink the sprite

    // Update the hitbox size based on the new scale
     const hitboxSize = Math.min(this.width, this.height) * 0.075; // Adjust the size value to shrink the hitbox
     const hitboxOffsetX = (this.width - hitboxSize) / 2;
     const hitboxOffsetY = (this.height - hitboxSize) / 2;
     this.body.setCircle(hitboxSize, hitboxOffsetX, hitboxOffsetY); // Set hitbox as a circle


  
  
      this.setTexture('powerUpSpritesheet');
      this.play('bubble');
    }
  
    update() {
      this.scale = ((this.y - 128) / 128) * 3;
      this.angle = -Math.atan(this.body.velocity.x / this.body.velocity.y) * (180 / Math.PI);
    //  
      if (this.y > game.config.height + this.body.height / 2) {
        this.destroy();
      }
    }
  }
  