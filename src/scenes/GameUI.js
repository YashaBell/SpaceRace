class GameUI extends Phaser.Scene {
    // code developed from https://youtu.be/HSP7xwacX7c
    constructor()
    {
        super("gameUIScene");
    }
    preload(){
    }
    create(){
        this.portalVisionValue = 0;
        //heart container
        this.add.rectangle(UIBorderY, game.config.height - UIBorderY, 64, 24, 0x767676).setOrigin(0,1);
        this.add.rectangle(UIBorderY + 2, game.config.height - UIBorderY - 2, 60, 20, 0x2b2b2b).setOrigin(0,1);

        this.scoreText = this.add.text(UIBorderY, UIBorderY / 2, '0', defaultTextConfig).setOrigin(0,0);

        this.vision = this.add.sprite(game.config.width - UIBorderY, UIBorderY,'vision').setOrigin(1,0);
        this.vision.scale = 3;
        this.vision.setFrame('Vision_0');
        this.lives = this.add.group({});
        const repairArray = this.lives.getChildren();
    
        this.lives.createMultiple({
            key: 'heart',
            setXY: {
                x: UIBorderY + 12,
                y: game.config.height - UIBorderY - 12, 
                stepX: 20
            },
            setOrigin: (0,0),
            setScale: {
                x: 1,
                y: 1
            },
            quantity: health
        });
      
        sceneEvents.on('lostLife', hp=> {
            health --;
            const gear = Phaser.Utils.Array.RemoveAt(repairArray, hp);
            if(gear){
                gear.alpha = 0;
                this.health --;
            }            
        });
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('lostLife');
            sceneEvents.off('collectEssence');
        });
        sceneEvents.on('collectEssence', () => {
            this.portalVisionValue ++;
            score += 10;
            console.log(this.portalVisionValue);
            if(this.portalVisionValue >= 10){
                this.vision.setFrame('Vision_10');
                sceneEvents.emit('spawnPortal');
            }else{
                this.vision.setFrame(`Vision_${this.portalVisionValue}`);
            }
        });
    }
    update(){
        this.scoreText.text = score;
    }
}
