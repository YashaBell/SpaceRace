class GameUI extends Phaser.Scene {
    // code developed from https://youtu.be/HSP7xwacX7c
    constructor() {
        super("gameUIScene");
        this.repairArray = [];
    }
    preload() {
    }
    create() {
         // Start with 3
        this.portalVisionValue = 0;
        //heart container
        this.add.rectangle(UIBorderY, game.config.height - UIBorderY, 64, 24, 0x767676).setOrigin(0, 1);
        this.add.rectangle(UIBorderY + 2, game.config.height - UIBorderY - 2, 60, 20, 0x2b2b2b).setOrigin(0, 1);
        let scoreConfig = defaultTextConfig;
        scoreConfig.fontSize = `${UIBorderY}px`
        scoreConfig.padding = {
            top: -1,
            bottom: 0
        }
        this.scoreText = this.add.text(UIBorderY, UIBorderY / 2, '0', defaultTextConfig).setOrigin(0, 0);

        this.vision = this.add.sprite(game.config.width - UIBorderY, UIBorderY, 'vision').setOrigin(1, 0);
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
            setOrigin: (0, 0),
            setScale: {
                x: 1,
                y: 1
            },
            quantity: health
        });
        sceneEvents.on('collectedLife', hp => {
            if (health < 3) { // Assume a limit
                const newHeart = this.lives.create(UIBorderY + 3 + (20 * health), game.config.height - UIBorderY - 20, 'heart').setOrigin(0, 0).setScale(1, 1);
                health++;
                console.log("healthadd: ", health);
            }
        });

        sceneEvents.on('lostLife', hp => {

            //health--;
            if (repairArray.length > 0) {
                const gear = Phaser.Utils.Array.RemoveAt(repairArray, repairArray.length - 1);
                if (gear) {
                    gear.alpha = 0;
                    // Make sure health is initialized in your class, else use health
                    health--;
                    console.log("health: ", health);
                }


            }
        });

        sceneEvents.on('collectEssence', () => {
            this.portalVisionValue++;
            score += 10;
            if (this.portalVisionValue >= 10) {
                this.vision.setFrame('Vision_10');
                sceneEvents.emit('spawnPortal');
            } else {
                this.vision.setFrame(`Vision_${this.portalVisionValue}`);
            }
        });
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('lostLife');
            sceneEvents.off('collectedLife');
            sceneEvents.off('collectEssence');
        });
    }
    update() {
        this.scoreText.text = score;
    }
    addHeart() {
        const newHeart = this.lives.create(UIBorderY + 12 + (20 * health), game.config.height - UIBorderY - 12, 'heart').setOrigin(0, 0).setScale(1, 1);

        this.repairArray.push(newHeart);
    }

}
