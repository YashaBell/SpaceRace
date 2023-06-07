class Home extends Phaser.Scene {
    constructor() {
        super("homeScene");
    }
    
    create(){
        
        this.BGD = this.add.sprite(0,0,'homeScreen').setOrigin(0,0);
        this.BGD.setScale(2.5);
        this.BGD.anims.play('homeFun');
        
        
        this.subtitleTextConfig = {
            fontFamily: 'Impact',
            fontStyle: 'normal',
            fontSize: '20px',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10
            },
            fixedWidth: 0
        }
        this.add.text(UIBorderX*7.5, UIBorderY * 18, 'press (Space) to start', this.subtitleTextConfig).setOrigin(0,0);
        
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update() {
        if(keySpace.isDown){
            this.sound.play('selectSFX');
            this.scene.start('menuScene');
        }
    }
}