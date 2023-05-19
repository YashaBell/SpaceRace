let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 360,
    fps:{target: 30,},
    scene: [ Load, Menu , Play, GameUI, Credits, GameOver ],
    physics: {default: 'arcade',arcade: {debug: true}},
    pixelArt: true,
    health: 3   
};

let game = new Phaser.Game(config);
let keyA, keyD, keyC, keySpace;
let playerBuffer = game.config.height/10;
let UIBorderX = game.config.width/20;
let UIBorderY = game.config.height/20;
let highScore = 100;
let newHighScore = false;
let raceScore = 0;

let horizonLine = ( 98 * game.config.width )/640;

const sceneEvents = new Phaser.Events.EventEmitter();
let defaultTextConfig = {
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



function MouseInTextBox(pointerX, pointerY, textBox){
    let x1 = textBox.x - textBox.width/2;
    let x2 = textBox.x + textBox.width/2;
    let y1 = textBox.y - textBox.height/2;
    let y2 = textBox.y + textBox.height/2;
    if(pointerX >= x1 && pointerX <= x2 && pointerY >= y1 && pointerY <= y2){
        return(true);
    }else {
        return(false);
    }
}
