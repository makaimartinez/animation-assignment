class Link {
    
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        //this.game.link = this;

        this.facing = 0; // 0 = right, 1 = left, 2 = up, 3 = down
        this.velocity = { x: 0, y: 0 };
        this.dead = false;

        this.width = 23;
        this.height = 26;

        this.prevX = null;
        this.prevY = null;


        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/linksprites.png");

        // sprite frames per row = 12
        // sprite row width = 288
        // sprite height = 23 (but they all have space in between)
        this.animations = [];
        this.loadAnimations(this.spritesheet)
        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE, this.height * PARAMS.SCALE, "player");

    }

    loadAnimations(spritesheet) {

        for (var i = 0; i < 5; i++) { // 5 states
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // 2 variations
                this.animations[i].push([]);
            }
        }
        
        // sprite frames per row = 12
        // sprite row width = 288
        // 288 / 12 = 24 frame width
        // sprite height = 24
        
        this.frameCount = 12;
        this.totalTime = 0.5;
        this.framePadding = 1;
        this.reverse = new Boolean(false);
        this.loop = new Boolean(true);

        // walk right
        this.animations[0][0] = new Animator(spritesheet, 0, 38,  this.width, this.height, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);
        this.animations[0][1] = new Animator(spritesheet, 0, 165,  this.width, this.height, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);

        // walk left
        this.animations[1][0] = new Animator(spritesheet, 1, 102,  this.width, this.height, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);
        this.animations[1][1] = new Animator(spritesheet, 1, 229,  this.width, this.height, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);


        // walk up
        this.animations[2][0] = new Animator(spritesheet, 0, 6,  this.width, 27, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);
        this.animations[2][1] = new Animator(spritesheet, 0, 134,  this.width, 27, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);

        // walk down
        this.animations[3][0] = new Animator(spritesheet, 0, 70,  this.width, 27, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);
        this.animations[3][1] = new Animator(spritesheet, 0, 198,  this.width, 27, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);

        // idle W I P
        this.idlesprite = ASSET_MANAGER.getAsset("./sprites/idlelink.png");
        this.animations[4][0] = new Animator(this.idlesprite, 0, 0,  this.width, this.height, 1, this.totalTime, this.framePadding, this.reverse, this.loop);
    }

    die() {
        this.velocity.y = -640;
        this.dead = true;
        // ASSET_MANAGER.pauseBackgroundMusic();
    };


    update() {

        this.getPreviousXandY();

        const TICK = this.game.clockTick;
        const MIN_WALK = 30;
        const MAX_WALK = 160;
        const ACC_WALK = 60;

        // check if dead
        if (this.dead) {

            this.velocity.y += RUN_FALL * TICK;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;    // i believe this makes the jump animation before death

            if (this.y > PARAMS.BLOCKWIDTH * 16) {
                this.dead = false;
                this.game.camera.lives--;
                if (this.game.camera.lives < 0)
                    this.game.camera.gameOver = true;
                else this.game.camera.loadLevel(levelOne, 2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH, true, false);
            }
        }


        // update velocity
        if (Math.abs(this.velocity.x) < MIN_WALK || Math.abs(this.velocity.y) < MIN_WALK) { //if not moving, check for button then add movement
            this.velocity.x = 0;
            this.velocity.y = 0;
            if(this.game.right) {
                this.velocity.x += ACC_WALK;
            }
            else if(this.game.left) {
                this.velocity.x -= ACC_WALK;
            }
            else if(this.game.down) {
                this.velocity.y += ACC_WALK;
            }
            else if(this.game.up) {
                this.velocity.y -= ACC_WALK;
            }
        }

        

        // update direction 
        if (this.velocity.x < 0) { this.facing = 1; }
        else if (this.velocity.x > 0) { this.facing = 0; }
        else if (this.velocity.y < 0) { this.facing = 2; }
        else if (this.velocity.y > 0) { this.facing = 3; }
        else { this.facing = 4;}                               
        
        // update position
        // gameworld coordinates are this.x and this.y
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;

        this.collide();
        this.updateBB();
    }

    collide() {
        let that = this;
        this.game.entities.forEach(function(entity) {
            if(entity.BB && entity.BB != that && that.BB.collide(entity.BB)) {
                if(entity.BB.name == "wall")  {
                    if (that.facing == 1) {
                        that.x = that.prevX + 1;
                    }
                    if (that.facing == 0) {
                        that.x = that.prevX - 1;
                    }
                    if (that.facing == 2) {
                        that.y = that.prevY + 1;
                    }
                    if (that.facing == 3) {
                        that.y = that.prevY - 1;
                    }
                }

            }
        })
    }

    getPreviousXandY() {
        this.prevX = this.x;
        this.prevY = this.y;
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width * PARAMS.SCALE, this.height * PARAMS.SCALE, "player");
    }

    draw() {
        let tick = this.game.clockTick;

        this.animations[this.facing][0].drawFrame(tick, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);

        // HitBox?
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red"
            ctx.strokeRect(this.x  - this.game.camera.x, this.y - this.game.camera.y,  this.width * PARAMS.SCALE, this.height * PARAMS.SCALE);
        }
    }

}