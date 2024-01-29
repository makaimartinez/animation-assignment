class Link {
    
    constructor() {
        this.x = 100;
        this.y = 100;

        this.facing = 0; // 0 = right, 1 = left, 2 = up, 3 = down
        this.velocity = { x: 0, y: 0 };


        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/linksprites.png");

        // sprite frames per row = 12
        // sprite row width = 288
        // sprite height = 23 (but they all have space in between)
        this.animations = [];
        this.loadAnimations(this.spritesheet)
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
        this.width = 23;
        this.height = 26;
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

        // idle
        this.animations[4][0] = new Animator(spritesheet, 0, 198,  this.width, 27, 1, this.totalTime, this.framePadding, this.reverse, this.loop);
    }

    update() {
        const TICK = gameEngine.clockTick;
        const MIN_WALK = 30;
        const MAX_WALK = 160;
        const ACC_WALK = 60;

        // update velocity
        if (Math.abs(this.velocity.x) < MIN_WALK || Math.abs(this.velocity.y) < MIN_WALK) { //if not moving, check for button then add movement
            this.velocity.x = 0;
            this.velocity.y = 0;
            if(gameEngine.right) {
                this.velocity.x += ACC_WALK;
            }
            else if(gameEngine.left) {
                this.velocity.x -= ACC_WALK;
            }
            else if(gameEngine.down) {
                this.velocity.y += ACC_WALK;
            }
            else if(gameEngine.up) {
                this.velocity.y -= ACC_WALK;
            }
        }

        // update position

        // update direction 
        if (this.velocity.x < 0) { this.facing = 1; }
        else if (this.velocity.x > 0) { this.facing = 0; }
        else if (this.velocity.y < 0) { this.facing = 2; }
        else if (this.velocity.y > 0) { this.facing = 3; }
        else { this.facing = 4;}

        // update speed
        this.x += this.velocity.x * TICK * 2;
        this.y += this.velocity.y * TICK * 2;
    }

    draw() {
        let scale = 3;
        let tick = gameEngine.clockTick;

        this.animations[this.facing][0].drawFrame(tick, this.x, this.y, scale);

        // HitBox?
        ctx.strokeStyle = "Red"
        ctx.strokeRect(this.x, this.y,  this.width * scale, this.height * scale);
    }

}