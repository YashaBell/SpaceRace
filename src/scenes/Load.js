class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    // loading bar code adapted from paddle parkour loading bar
    preload() {
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 
            loadingBar.fillStyle(0xFFFFFF, 1);                  
            loadingBar.fillRect(0, game.config.height / 2, game.config.width * value, 5);  
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });
        this.load.path = "./assets/"
        this.load.image('heart', 'heart.png',);
        this.load.atlas('sunset', 'sunset.png', 'sunset.json');
        this.load.atlas('jetpack', 'jetpack-sheet.png', 'jetpack.json');
        this.load.atlas('asteroid', 'asteroid.png', 'asteroid.json');
        this.load.atlas('warning', 'warning.png', 'warning.json');
        this.load.path = "./assets/audio/"
        this.load.audio('dimension_1', 'Space1.wav');
        this.load.audio('selectSFX', 'selection.wav');
        this.load.audio('portal', 'portal.wav');
        this.load.audio('warning', 'warning.wav');
        this.load.audio('dimension_2','Space2.wav')

    }

    create() {
        this.anims.create({
            key: 'shiftingGrid',
            defaultTextureKey: 'sunset',
            frames:  this.anims.generateFrameNames('sunset', {
                prefix: 'sunset_',
                suffix: '.ase',
                start: 0,
                end: 16,
                zeroPad: 2,
            }),
            duration: 700,
                repeat: -1
        });
        this.scene.start('menuScene');
    }
}