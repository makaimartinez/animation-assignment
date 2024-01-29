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

        for (var i = 0; i < 4; i++) { // 4 directions
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
        this.animations[2][0] = new Animator(spritesheet, 0, 5,  this.width, 27, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);
        this.animations[2][1] = new Animator(spritesheet, 0, 134,  this.width, 27, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);

        // walk down
        this.animations[3][0] = new Animator(spritesheet, 0, 69,  this.width, 27, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);
        this.animations[3][1] = new Animator(spritesheet, 0, 197,  this.width, 27, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);

    }

    update() {
        const TICK = gameEngine.clockTick;
        const MIN_WALK = 30;
        const MAX_WALK = 160;
        const ACC_WALK = 40;

        // update velocity
        if (Math.abs(this.velocity.x) < MIN_WALK) { //if not moving, check for button then add movement
            this.velocity.x = 0;
            this.state = 0;
            if(gameEngine.right) {
                this.velocity.x += ACC_WALK;
            }
            if(gameEngine.left) {
                this.velocity.x -= ACC_WALK;
            }
        } else if (Math.abs(this.velocity.x) >= MIN_WALK) { // if greater than min_walk, check if player wants to speed up or slow down
            if(this.facing == false) { //facing right
                if (gameEngine.right && !gameEngine.left && !gameEngine.down) {
                    this.velocity.x += ACC_WALK * TICK;
                } else if (gameEngine.left && !gameEngine.right && !gameEngine.down) {
                    this.velocity.x -= DEC_SKID * TICK;
                } else {
                    this.velocity.x -= DEC_REL * TICK;
                }
            } else {
                if (gameEngine.left && !gameEngine.right && !gameEngine.down) {
                    this.velocity.x -= ACC_WALK * TICK;
                } else if (gameEngine.right && !gameEngine.left && !gameEngine.down) {
                    this.velocity.x += DEC_SKID * TICK;
                } else {
                    this.velocity.x += DEC_REL * TICK;
                }
            }
        }

        // update position

        // update direction 
        if (this.velocity.x < 0) this.facing = true;
        if (this.velocity.x > 0) this.facing = false;

        // update speed
        this.x += this.velocity.x * TICK * 2;
        this.y += this.velocity.y * TICK * 2;
    }

    draw() {
        let scale = 3;
        let tick = gameEngine.clockTick;



        
        // right walk
        this.animations[0][0].drawFrame(tick, this.x, this.y, scale);
        // this.animations[0][1].drawFrame(tick, this.x + 100, this.y, scale);

        // left walk
        // this.animations[1][0].drawFrame(tick, this.x, this.y + 100, scale);
        // this.animations[1][1].drawFrame(tick, this.x + 100, this.y + 100, scale);
        
        // walk up
        // this.animations[2][0].drawFrame(tick, 0, this.y + 200, scale);
        // this.animations[2][1].drawFrame(tick, 0 + 100, this.y + 200, scale);
        
        // walk down
        // this.animations[3][0].drawFrame(tick, 0, this.y + 300, scale);
        // this.animations[3][1].drawFrame(tick, 0 + 100, this.y + 300, scale);

        // HitBox?
        ctx.strokeStyle = "Green"
        ctx.strokeRect(this.x, this.y,  this.width * scale, this.height * scale);
    }

}