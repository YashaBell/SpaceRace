class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }
    preload(){}
    create(){
        if(raceScore > highScore){
            highScore = raceScore;
        }
        this.add.rectangle(0,0,game.config.width,game.config.height);
        defaultTextConfig.fontSize = '50px'
        this.add.text(game.config.width/2, game.config.height/6, 'Game Over', defaultTextConfig).setOrigin(0.5);
        defaultTextConfig.fontSize = '24px'
        this.add.text(game.config.width/2, (game.config.height* 5) / 6, 'press (space) to return to menu', defaultTextConfig).setOrigin(.5,.5);
        
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if(keySpace.isDown){
            this.sound.play('selectSFX');
            this.scene.start('menuScene');
        }
    }
}
