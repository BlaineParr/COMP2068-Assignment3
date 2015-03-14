/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/alien.ts" />
/// <reference path="objects/island.ts" />
/// <reference path="objects/ocean.ts" />
/// <reference path="objects/tank.ts" />
var canvas;
var stage;
var assetLoader;
//Game Objects
var tank;
var island;
var aliens = [];
var ocean;
//asset manifest - array of asset objects
var manifest = [
    { id: "alien", src: "assets/images/Alien.png" },
    { id: "island", src: "assets/images/island.png" },
    { id: "ocean", src: "assets/images/ocean.gif" },
    { id: "tank", src: "assets/images/Tank.png" }
];
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
    if (tank != null) {
        tank.update(); //updates tank's position
    }
    island.update(); //updates island's position
    ocean.update(); //updates ocean's position
    for (var alien = 3; alien > 0; alien--) {
        aliens[alien].update(); //updates aliens' position
        checkCollision(tank, aliens[alien]);
    }
    if (tank.health <= 0) {
        tank.visible = false;
    } //if ends
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
        tank.startMoving(event.keyCode); //start moving the tank
    });
    document.addEventListener("keyup", function (event) {
        tank.stopMoving(event.keyCode); //start moving the tank
    });
} //function main ends
//calculate the distance between two points
function distance(p1, p2) {
    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
} //function distance ends
function checkCollision(collider1, collider2) {
    var p1 = new createjs.Point();
    var p2 = new createjs.Point();
    p1.x = collider1.x;
    p1.y = collider1.y;
    p2.x = collider2.x;
    p2.y = collider2.y;
    if (distance(p2, p1) < ((collider1.width * 0.5) + (collider2.width * 0.5))) {
        if (!collider1.isColliding && !collider2.isColliding) {
            //createjs.Sound.play(collider.soundString);
            collider1.isColliding = true;
            collider2.isColliding = true;
            collider1.collide();
            collider2.collide();
        } //if ends
    }
    else {
        collider1.isColliding = false;
        collider2.isColliding = false;
    } //else ends
} //function plandAndCloud ends
//# sourceMappingURL=game.js.map