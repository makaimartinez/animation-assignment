class SceneManager {
    constructor(GameEngine) {
        this.game = GameEngine;
        this.game.camera = this;    // anonymous entity, give it a direct reference by setting camera = to this instance of scene manager
        this.x = 0;
        this.y = 0;
        this.lives = 3;
        
        
        // let tiles = new Tiles[10];

        this.title = true;
        this.level = null;

        this.animations = [];
        this.animationCounter = 0;


        this.link = new Link(this.game, 2 * PARAMS.BLOCKWIDTH, 10 * PARAMS.BLOCKWIDTH);
        this.loadGame(levelOne, 2 * PARAMS.BLOCKWIDTH, 10 * PARAMS.BLOCKWIDTH, false, this.title);


    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadGame(level, x, y, transition, title) {
        this.title = title;
        this.level = level;
        this.loading = true;
        this.clearEntities();
        this.x = 0;     // reset camera 

        if (transition) {
            this.game.addEntity(new TransitionScreen(this.game, level, x, y, title, this.loading));
        } else if (!this.title) {
            this.inTransition = false;
            // ENVIRONMENT

            // left wall
            for (let i = -10; i < 13; i++) {
                this.game.addEntity(new Wall(this.game, -7, i));
                this.game.addEntity(new Wall(this.game, -6, i));
                this.game.addEntity(new Wall(this.game, -5, i));
                this.game.addEntity(new Wall(this.game, -4, i));
                this.game.addEntity(new Wall(this.game, -3, i));
                this.game.addEntity(new Wall(this.game, -2, i));
                this.game.addEntity(new Wall(this.game, -1, i));
                this.game.addEntity(new Wall(this.game, 0, i));
            }

            // right wall
            for (let i = -10; i < 13; i++) {
                this.game.addEntity(new Wall(this.game, 16, i));
                this.game.addEntity(new Wall(this.game, 17, i));
                this.game.addEntity(new Wall(this.game, 18, i));
                this.game.addEntity(new Wall(this.game, 19, i));
                this.game.addEntity(new Wall(this.game, 20, i));
                this.game.addEntity(new Wall(this.game, 21, i));
                this.game.addEntity(new Wall(this.game, 22, i));
                this.game.addEntity(new Wall(this.game, 23, i));
            }

            // top wall
            for (let i = -7; i < 24; i++) {
                this.game.addEntity(new Wall(this.game, i, -10));
                this.game.addEntity(new Wall(this.game, i, -11));
                this.game.addEntity(new Wall(this.game, i, -12));
                this.game.addEntity(new Wall(this.game, i, -13));
                this.game.addEntity(new Wall(this.game, i, -14));
                this.game.addEntity(new Wall(this.game, i, -15));
            }

            // bottom wall
            for (let i = -7; i < 24; i++) {
                this.game.addEntity(new Wall(this.game, i, 12));
                this.game.addEntity(new Wall(this.game, i, 13));
                this.game.addEntity(new Wall(this.game, i, 14));
                this.game.addEntity(new Wall(this.game, i, 15));
                this.game.addEntity(new Wall(this.game, i, 16));
                this.game.addEntity(new Wall(this.game, i, 17));
            }

            // maze
            const maze = [
                ['X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
                ['X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' '],
                ['X', 'X', 'X', ' ', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['X', 'X', 'X', ' ', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['X', 'X', 'X', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' '], 
                ['X', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X'],
                ['X', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X', ' ', ' ', ' ', ' '],
                ['X', 'X', ' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X', 'X', 'X', ' ', ' ', 'X', 'X', ' ', ' ', ' ', ' '],
                ['X', 'X', ' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X'],
                ['X', 'X', ' ', ' ', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X'],
                ['X', 'X', ' ', ' ', 'X', 'X', 'X', 'X', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', 'X', 'X'],
                ['X', 'X', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', 'X', 'X'],
                ['X', 'X', ' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X', 'X', ' ', ' ', 'X', 'X'],
                ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' ', ' ', 'X', 'X'],
                ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', 'X', 'X'],

            ];

            this.mazeInterpretter(maze);


            // MUSIC
            if (level.music && !this.title) {
                ASSET_MANAGER.pauseBackgroundMusic();
                ASSET_MANAGER.playAsset(level.music);
            }

            // ITEMS
            this.torch = new Torch(this.game, this.link);
            this.game.addEntity(this.torch);

            // PLAYER
            this.link.x = x;
            this.link.y = y;
            this.link.removeFromWorld = false;      // I want link to be persistent after removing him from the world
            this.link.velocity = { x: 0, y: 0 };    
            this.link.state = 0                     // link enters level in right facing state;

            var that = this;
            var link = false;
            this.game.entities.forEach(function(entity) {       // if link is there dont add him in
                if(that.link === entity) link = true;
            });
            if(!link) this.game.addEntity(this.link);           // if link is not there add him.

            // this.time = 400;
            this.game.camera.paused = false;
        }
    };

    mazeInterpretter(maze) {
        for (let row = 0; row < maze.length; row++) {
            for (let col = 0; col < maze[row].length; col++) {
                const character = maze[row][col];
                if (character !== ' ') {
                    this.game.addEntity(new Maze(this.game, row + 1, col - 9)); // top left corner coords are 1, -9

                }
            }
        }
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

    // check HTML elements
    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    }

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;     
        this.updateAudio();

        let midpointx = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        let midpointy = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2;


        // if (this.x < this.link.x - midpointx) this.x = this.link.x - midpointx;
        // if (this.y > this.link.y - midpointy) this.y = this.link.y - midpointy;
        this.x = this.link.x - midpointx;
        this.y = this.link.y - midpointy;


        if (this.title && this.game.click) {
            if (this.game.click && this.game.click.y > 9 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 9.5 * PARAMS.BLOCKWIDTH) {
                this.title = false;
                this.inTransition = true;
                this.loadGame(levelOne, 3.25 * PARAMS.BLOCKWIDTH, 9.5 * PARAMS.BLOCKWIDTH, true); // SETS STARTING POSITION
            }
        // } else {
        //     this.link = new Link(this.game, 2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
        //     this.loadGame(levelOne, 2.5 * PARAMS.BLOCKWIDTH, 0, true);
        }


    }

    draw() {
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';
        ctx.fillStyle = "White";



        if (this.title) {
            var width = 180;
            var height = 90;
            const titlecard = ASSET_MANAGER.getAsset("./sprites/title.png");
            ctx.drawImage(titlecard, 2.5 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH, width * PARAMS.SCALE, height * PARAMS.SCALE);
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 9 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 9.5 * PARAMS.BLOCKWIDTH ? "Grey" : "White";
            ctx.fillText("START", 6.75 * PARAMS.BLOCKWIDTH, 9.5 * PARAMS.BLOCKWIDTH);
        } 

        else if (!this.title && !this.inTransition) {
            this.shadow = ASSET_MANAGER.getAsset("./sprites/lighting.png");
            ctx.drawImage(this.shadow, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        }

    }

}