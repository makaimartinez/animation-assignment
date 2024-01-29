class SceneManager {
    constructor(GameEngine) {
        this.gameEngine = GameEngine;
        // gameEngine.camera = this;
        this.x = 0;
        this.y = 0;
        
        // this.link = new Link();
        // let tiles = new Tiles[10];

        this.animations = [];
        // loadGame();

        // NOTE: PLEASE USE THE FOLLOWING LINE TO TEST.
        // this.loadLevel(levelTwo, 2.5 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH, false, true);
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

        this.animations[0][0] = new Animator(spritesheet, 0, 0,  width, height, 1, 1, 0, false, false);
       
    }

    update() {

    }

    draw() {
        
    }





}