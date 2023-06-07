class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.onOverlap = true;
      this.body.isCircle = true;  // Ensure hitbox is a circle
      this.scene = scene;
      this.body.drag = 0;
      this.firstX = (game.config.width - horizonLine) / 2;
      this.targetX = (this.x - this.firstX) * game.config.width / horizonLine;
      this.constVelocity = 5;
      this.body.velocity.y = 198 / this.constVelocity;
      this.body.velocity.x = (this.targetX - this.x) / this.constVelocity;

      // Update the hitbox size to exactly match the sprite's size
      const hitboxRadius = Math.min(this.width, this.height) / 2;  // Set hitbox radius to half the smaller dimension of the sprite
      this.body.setCircle(hitboxRadius);  // Set hitbox size to match the sprite

      this.setTexture('powerUpSpritesheet');
      this.play('bubble');
    }

    update() {
      this.angle = -Math.atan(this.body.velocity.x / this.body.velocity.y) * (180 / Math.PI);
      if (this.y > game.config.height + this.body.height / 2) {
        this.destroy();
      }
    }
  }
