const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

let canvas;
let ctx;

// sprites
ASSET_MANAGER.queueDownload("./sprites/linksprites.png");
ASSET_MANAGER.queueDownload("./sprites/idlelink.png");
ASSET_MANAGER.queueDownload("./sprites/title.png");
ASSET_MANAGER.queueDownload("./sprites/stone.png");
ASSET_MANAGER.queueDownload("./sprites/torch.png");


// music
ASSET_MANAGER.queueDownload("./music/testmusic.mp3");		// add music in future

// sfx

ASSET_MANAGER.downloadAll(function () {

	ASSET_MANAGER.autoRepeat("./music/testmusic.mp3");		

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	// We access the HTML canvas using the global document variable and the getElementByID function.
	canvas = document.getElementById("gameWorld");
	ctx = canvas.getContext("2d");	// Paint to canvas element through a 2D context
	ctx.imageSmoothingEnabled = false;

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	// scene manager manages which scene we're in (level 1 sky, bricks, goombas, etc.)
	gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.start();
});
