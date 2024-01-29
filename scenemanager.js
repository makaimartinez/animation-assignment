class SceneManager {
    constructor(GameEngine) {
        this.gameEngine = GameEngine;
        // gameEngine.camera = this;
        this.x = 0;
        this.y = 0;
        
        // this.link = new Link();
        // let tiles = new Tiles[10];

        this.animations = [];
        this.animationCounter = 0;
        this.loadGame();
    };

    loadGame() {
        // this.link.x = x;
        // this.link.y = y;
        // gameEngine.addEntity(this.link);
        this.spritesheet = ASSET_MANAGER.getAsset("./tiles/stone.png");
        this.loadAnimation(this.spritesheet);


    }

    loadAnimation(spritesheet) {
        let width = 16;
        let height = 16;
        for (var i = 0; i < 10; i++) { // 10 tiles
            this.animations.push([]);
        }

        this.animations[this.animationCounter] = new Animator(spritesheet, 0, 0,  width, height, 1, 1, 0, false, false);
        this.animationCounter += 1;
    }

    update() {

    }

    draw() {
        
    }

}