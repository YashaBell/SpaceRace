class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){}
    create(){
        this.BGD = this.add.sprite(0,0,'titleScreen').setOrigin(0,0);
        this.BGD.anims.play('titleFun');
        
        let titleTextConfig = {
            fontFamily: 'Impact',
            fontStyle: 'normal',
            fontSize: '36px',
            backgroundColor: '#000000',
            color: '#71b09f',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10
            },
            fixedWidth: 0
        }
        this.add.text(UIBorderX, UIBorderY, 'Space Race', titleTextConfig).setOrigin(0,0);
        
        this.subtitleTextConfig = {
            fontFamily: 'Impact',
            fontStyle: 'normal',
            fontSize: '20px',
            color: '#990000',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10
            },
            fixedWidth: 0
        }
        this.add.text(UIBorderX, UIBorderY * 4, 'press (Space) to start', this.subtitleTextConfig).setOrigin(0,0);
        this.add.text(UIBorderX, UIBorderY * 6, 'press (C) to see credits', this.subtitleTextConfig).setOrigin(0,.0);
        
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
