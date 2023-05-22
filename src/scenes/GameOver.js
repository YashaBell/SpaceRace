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
        titleTextConfig.fontSize = '50px'
        this.add.text(game.config.width/2, game.config.height/6, 'Game Over', titleTextConfig).setOrigin(0.5);
        titleTextConfig.fontSize = '24px'
        this.add.text(game.config.width/2, (game.config.height* 5) / 6, 'press (space) to return to menu', titleTextConfig).setOrigin(.5,.5);
        
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if(keySpace.isDown){
            this.sound.play('selectSFX');
            this.scene.start('menuScene');
        }
    }
}
