class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){}
    create(){
        health = 3;
        score = 0;
        this.BGD = this.add.sprite(0,0,'titleScreen').setOrigin(0,0);
        this.BGD.setScale(2.5);
        this.BGD.anims.play('titleFun');
        
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update() {
        if(keySpace.isDown){
            this.sound.play('selectSFX');
            this.scene.start('instructionScene');
        }
        if(keyC.isDown){
            this.sound.play('selectSFX');
            this.scene.start('creditsScene');
        }
    }
}
