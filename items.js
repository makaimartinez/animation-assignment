class Torch {

    constructor(game,link) {
        Object.assign(this, { game, link});
        this.x *= PARAMS.BLOCKWIDTH;
        this.y *= PARAMS.BLOCKWIDTH;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/torch.png");
        this.width = 24;
        this.BB = new BoundingBox(this.x + 12, this.y, this.width, PARAMS.BLOCKWIDTH, "torch");
        this.animations = null;
        this.loadAnimations(this.spritesheet)
    }
    loadAnimations(spritesheet) {

        this.frameCount = 3;
        this.totalTime = .75;
        this.framePadding = 0;
        this.reverse = new Boolean(false);
        this.loop = new Boolean(true);

        // walk right
        this.animations = new Animator(spritesheet, 0, 0, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, this.frameCount, this.totalTime, this.framePadding, this.reverse, this.loop);
    }

    update() {
        this.x = this.link.x - this.game.camera.x - 8;
        this.y = this.link.y - this.game.camera.y + 8;
    }

    getx() {
        return this.x;
    }


    draw() {
        let tick = this.game.clockTick;
        this.animations.drawFrame(tick, this.x, this.y, 1);
        // hitbox
        if (PARAMS.DEBUG) {
            this.BB.draw(ctx, this.game.camera);
        }
    }

}

class Chest {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.x *= PARAMS.BLOCKWIDTH;
        this.y *= PARAMS.BLOCKWIDTH;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/chest.png");
        this.size = 48; // 48 x 48 px 
        this.BB = new BoundingBox(this.x, this.y, this.size, this.size, "chest");
    };

    update() {
        

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y);
        
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "red";
            this.BB.draw(ctx, this.game.camera);
        }
    };
}
