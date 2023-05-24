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
        let scoreConfig = titleTextConfig;
        scoreConfig.fontSize = `${UIBorderY}px`
        scoreConfig.padding = {
            top: -1,
            bottom: 0
        }
        //heart container
        this.add.rectangle(UIBorderY, game.config.height - UIBorderY, 64, 24, 0x767676).setOrigin(0,1);
        this.add.rectangle(UIBorderY + 2, game.config.height - UIBorderY - 2, 60, 20, 0x2b2b2b).setOrigin(0,1);

        this.vision = this.add.sprite(game.config.width - UIBorderY, UIBorderY,'vision').setOrigin(1,0);
        this.vision.scale = 2;
        this.vision.setFrame('vision_0');
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
        });
        sceneEvents.on('collectEssence', () => {
            this.portalVisionValue += 5;
            console.log(this.portalVisionValue);
            if(this.portalVisionValue >= 100){
                this.vision.setFrame('vision_1');
                sceneEvents.emit('spawnPortal');
                this.portalVisionValue = 0;
            }
        });
    }
    update(){
    }
}
