class GameUI extends Phaser.Scene {
    // code developed from https://youtu.be/HSP7xwacX7c
    constructor()
    {
        super("gameUIScene");
    }
    preload(){
    }
    create(){
        let scoreConfig = defaultTextConfig;
        scoreConfig.fontSize = `${UIBorderY}px`
        scoreConfig.padding = {
            top: -1,
            bottom: 0
        }
        this.add.rectangle(UIBorderY, game.config.height - UIBorderY, 64, 24, 0x767676).setOrigin(0,1);
        this.add.rectangle(UIBorderY + 2, game.config.height - UIBorderY - 2, 60, 20, 0x2b2b2b).setOrigin(0,1);
        
        
        this.repairs = this.add.group({});
        const repairArray = this.repairs.getChildren();
        sceneEvents.on('lostLife', health=> {
            const gear = Phaser.Utils.Array.RemoveAt(repairArray, health);
            if(gear){
                gear.alpha = 0;
                this.health --;
            }            
        });
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('lostLife');
        });
        
        this.repairs.createMultiple({
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
            quantity: 3
        });
    }
    update(){
    }
}
