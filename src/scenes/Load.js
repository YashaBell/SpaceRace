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
        this.load.atlas('titleScreen', 'Title_Screen.png', 'Title_Screen.json');
        this.load.atlas('instructionScreen', 'Instructions.png', 'Instructions.json');
        this.load.atlas('homeScreen', 'Home_screen.png', 'Home_screen.json');
        // Background resources
        this.load.image('portalBluebgd', 'blueDime.png');
        this.load.image('portalGreenbgd', 'greenDime.png');
        this.load.image('bgd', 'bgd.png');
        this.load.atlas('gridMove', 'moving_grid.png', 'moving_grid.json' )
        // Game UI elements
        this.load.image('heart', 'heart.png',);
        this.load.atlas('vision', 'vision.png', 'vision.json')

        // portal sprites
        this.load.atlas('portal', 'portal.png', 'portal.json');
        // player sprite atlas
        this.load.atlas('jetpack', 'jetpack-sheet.png', 'jetpack.json');
        this.load.spritesheet('rotatingOrbs', 'rotating_orbs.png', { frameWidth: 32, frameHeight: 32 });
        // asteroid animations atlas
        this.load.atlas('asteroid', 'asteroid.png', 'asteroid.json');
        this.load.atlas('explosion', 'explosion.png', 'explosion.json');
        //essence and power ups sprite
        this.load.image('essence', 'essence.png');
        this.load.image('shield', 'shield.png');
        this.load.image('life', 'life.png');
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
        //anims factory
        this.anims.create({
            key: 'bubble',
            frames: this.anims.generateFrameNumbers('rotatingOrbs', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

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
        
        this.anims.create({
            key: 'boom',
            defaultTextureKey: 'explosion',
            frames:  this.anims.generateFrameNames('explosion', {
                prefix: 'explosion_',
                suffix: '',
                start: 0,
                end: 12,
                zeroPad: 0,
            }),
            duration: 1000
        });

        this.anims.create({
            key: 'titleFun',
            defaultTextureKey: 'titleScreen',
            frames:  this.anims.generateFrameNames('titleScreen', {
                prefix: '',
                suffix: '',
                start: 0,
                end: 2,
                zeroPad: 1,
            }),
            duration: 700,
                repeat: -1
        });
        this.anims.create({
            key: 'instructionFun',
            defaultTextureKey: 'instructionScreen',
            frames:  this.anims.generateFrameNames('instructionScreen', {
                prefix: 'Instructions ',
                suffix: '',
                start: 0,
                end: 2,
                zeroPad: 1,
            }),
            duration: 700,
                repeat: -1
        });
        this.anims.create({
            key: 'homeFun',
            defaultTextureKey: 'homeScreen',
            frames:  this.anims.generateFrameNames('homeScreen', {
                prefix: '',
                suffix: '',
                start: 0,
                end: 28,
                zeroPad: 1,
            }),
            duration: 700,
            repeat: false
        });
        this.scene.start('menuScene');
    }
}