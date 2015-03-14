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
/// <reference path="objects/bullet.ts" />
/// <reference path="objects/explosion.ts" />
var canvas;
var stage;
var assetLoader;
//Game Objects
var tank;
var island;
var aliens = [];
var ocean;
var numberOfAliens;
var explosions = [];
var numberOfExplosions;
//asset manifest - array of asset objects
var manifest = [
    { id: "alien", src: "assets/images/Alien.png" },
    { id: "island", src: "assets/images/island.png" },
    { id: "ocean", src: "assets/images/ocean.gif" },
    { id: "tank", src: "assets/images/Tank.png" },
    { id: "bullet", src: "assets/images/Bullet.png" },
    { id: "explosion", src: "assets/images/Explosion.png" },
    { id: "song", src: "assets/audio/Conquest.ogg" }
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
    tank.update(); //updates tank's position
    island.update(); //updates island's position
    ocean.update(); //updates ocean's position
    if (tank.bulletOnScreen) {
        tank.bullet.update();
    } //if ends
    for (var alien = numberOfAliens; alien > 0; alien--) {
        if (aliens[alien].hitside) {
            aliensMove();
        } //if ends
    }
    for (var alien = numberOfAliens; alien > 0; alien--) {
        aliens[alien].update(); //updates aliens' position
        checkCollision(tank, aliens[alien]);
        if (tank.bulletOnScreen) {
            checkCollision(tank.bullet, aliens[alien]);
        } //if ends
    }
    for (var explosion = numberOfExplosions; explosion > 0; explosion--) {
        explosions[explosion].checkTime();
    }
} //function gameLoop ends
// Our Game Kicks off in here
function main() {
    //set the number of aliens to put in the game
    numberOfAliens = 7;
    //initialize the number of explosions to 0
    numberOfExplosions = 0;
    //add ocean to game
    ocean = new objects.Ocean();
    stage.addChild(ocean);
    //add island to game
    island = new objects.Island();
    stage.addChild(island);
    //add tank to game
    tank = new objects.Tank();
    stage.addChild(tank);
    for (var alien = numberOfAliens; alien > 0; alien--) {
        aliens[alien] = new objects.Alien(608, 0 + (32 * alien));
        stage.addChild(aliens[alien]);
    }
    //set up the game for keyboard input
    document.addEventListener("keydown", function (event) {
        tank.actionStart(event.keyCode); //start moving the tank
    });
    document.addEventListener("keyup", function (event) {
        tank.actionEnd(event.keyCode); //start moving the tank
    });
    //play song
    createjs.Sound.play("song", { loop: -1 });
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
function aliensMove() {
    for (var alien = numberOfAliens; alien > 0; alien--) {
        aliens[alien].moveForward();
    }
} //function aliensMove ends
//# sourceMappingURL=game.js.map