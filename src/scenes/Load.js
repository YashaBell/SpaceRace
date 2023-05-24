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
        // image files
        this.load.path = "./assets/"
        // title screen animation
        this.load.atlas('titleScreen', 'titleScreen.png', 'titleScreen.json');
        // Background resources
        this.load.image('portalBluebgd', 'blueDime.png');
        this.load.image('portalGreenbgd', 'greenDime.png');
        this.load.atlas('gridMove', 'moving_grid.png', 'moving_grid.json' )
        // Game UI elements
        this.load.image('heart', 'heart.png',);
        this.load.atlas('vision', 'vision.png', 'vision.json')

        // portal sprites
        this.load.atlas('portalBlue', 'portalBlue.png', 'portalBlue.json');
        this.load.atlas('portalGreen', 'portalGreen.png', 'portalGreen.json');
        // player sprite atlas
        this.load.atlas('jetpack', 'jetpack-sheet.png', 'jetpack.json');
        // asteroid animation atlas
        this.load.atlas('asteroid', 'asteroid.png', 'asteroid.json');
        //essence sprite
        this.load.image('essence', 'temp.png');
        
        // audio files
        this.load.path = "./assets/audio/"
        // game music
        this.load.audio('dimension_1', 'Space1.wav');
        this.load.audio('dimension_2','Space2.wav')
        // SFX
        this.load.audio('selectSFX', 'selection.wav');
        this.load.audio('portal', 'portal.wav');
        this.load.audio('warning', 'warning.wav');
        
    }

    create() {
        this.anims.create({
            key: 'gridMoveAnim',
            defaultTextureKey: 'gridMove',
            frames:  this.anims.generateFrameNames('gridMove', {
                prefix: 'gridMove_',
                suffix: '',
                start: 0,
                end: 16,
                zeroPad: 0,
            }),
            duration: 700,
                repeat: -1
        });
        this.scene.start('menuScene');

        this.anims.create({
            key: 'titleFun',
            defaultTextureKey: 'titleScreen',
            frames:  this.anims.generateFrameNames('titleScreen', {
                prefix: 'title_',
                suffix: '',
                start: 0,
                end: 2,
                zeroPad: 2,
            }),
            duration: 700,
                repeat: -1
        });
        this.scene.start('menuScene');
    }
}