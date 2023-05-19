class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    preload(){
        //load audio
       
    }
    create(){
        this.add.text(game.config.width/2, game.config.height/6, 'Game Credits', defaultTextConfig).setOrigin(0.5);
        defaultTextConfig.fontSize = '18px'
        this.add.text(game.config.width / 2 , game.config.height / 2, 'Game created by: Yasha Bell,\nKelsey Melott,\nJames Clark,\nand\nRoss Mantell', defaultTextConfig).setOrigin(0.5);
        defaultTextConfig.fontSize = '24px'

        this.add.text(game.config.width/2, (game.config.height* 5) / 6, 'press (C) to return to menu', defaultTextConfig).setOrigin(.5,.5);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }
    update() {
        if(keyC.isDown){
            this.sound.play('selectSFX');
            this.scene.start('menuScene');
        }
    }
}
