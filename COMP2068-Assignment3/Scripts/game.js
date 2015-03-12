/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="objects/alien.ts" />
/// <reference path="objects/island.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/tank.ts" />
var canvas;
var stage;
var assetLoader;
//Game objects
var tank;
var island;
var aliens = [];
var ocean;
// asset manifest - array of asset objects
var manifest = [
    { id: "alien", src: "assets/images/Alien.png" },
    { id: "island", src: "assets/images/island.png" },
    { id: "ocean", src: "assets/images/ocean.gif" },
    { id: "tank", src: "assets/images/Tank.png" }
];
// Game Objects 
function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
} //function preload ends
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    main();
} //function init ends
function gameLoop() {
    stage.update(); // Refreshes our stage
    tank.update(); //updates tank's position
    island.update(); //updates island's position
    ocean.update(); //updates ocean's position
    for (var alien = 3; alien > 0; alien--) {
        aliens[alien].update(); //updates aliens' position
    }
} //function gameLoop ends
// Our Game Kicks off in here
function main() {
    //add ocean to game
    ocean = new objects.Ocean();
    stage.addChild(ocean);
    //add island to game
    island = new objects.Island();
    stage.addChild(island);
    //add tank to game
    tank = new objects.Tank();
    stage.addChild(tank);
    for (var alien = 3; alien > 0; alien--) {
        aliens[alien] = new objects.Alien();
        stage.addChild(aliens[alien]);
    }
    //set up the game for keyboard input
    document.addEventListener("keydown", function (event) {
        tank.startMoving(event.keyCode);
    });
    document.addEventListener("keyup", function (event) {
        tank.stopMoving(event.keyCode);
    });
} //function main ends
//# sourceMappingURL=game.js.map