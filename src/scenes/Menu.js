class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){}
    create(){
        defaultTextConfig.fontSize = '36px';
        this.add.text(game.config.width/2, game.config.height/6, 'Space Race', defaultTextConfig).setOrigin(.5,.5);
        defaultTextConfig.fontSize = '24px';
        //this.add.text(game.config.width/2, game.config.height/6 + 36, `High Score: ${highScore}`, defaultTextConfig).setOrigin(.5,.5);
        defaultTextConfig.color = '#990000';
        this.add.text(game.config.width/2, game.config.height/2, 'use (A) and (D) to move left and right\n press (Space) to start', defaultTextConfig).setOrigin(.5,.5);
        defaultTextConfig.color = '#71b09f';
        this.add.text(game.config.width/2, (game.config.height* 5) / 6, 'press (C) to see credits', defaultTextConfig).setOrigin(.5,.5);
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update() {
        if(keySpace.isDown){
            this.sound.play('selectSFX');
            this.scene.start('playScene');
        }
        if(keyC.isDown){
            this.sound.play('selectSFX');
            this.scene.start('creditsScene');
        }
    }
}
