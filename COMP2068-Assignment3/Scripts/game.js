/*
 * COMP2068-Assignment3: Space Infiltrators
 *
 * Author: Blaine Parr
 * Last Modified By: Blaine Parr
 * Date Last Modified: March 16th 2015
 *
 * Description: This game is a javascript remake of Space Invaders. The player controls a tank
 * which can fire bullets at aliens moving towards the player. The player can only have 1 bullet
 * on the stage at any time. The aliens move downwards and upwards until they hit the edge of the
 * stage; upon hitting the edge they will move left and then begin going the opposite direction of
 * the one they were going when they hit the edge. The aliens may fire bolts at the player if
 * they are in range. The player's goal is to destroy all of the aliens before they get to the
 * player.
 *
 * Revision History:
 * v0.1:
 * -Created base game.
 *
 * v0.2:
 * -Changed controls from mouse input to keyboard input.
 *
 * v0.3:
 * -Added and implemented gameObject class.
 *
 * v0.4:
 * -Added methods for collision detection and handling.
 *
 * v0.5:
 * -Added firing mechanic to the tank class.
 * -Added a song to the game.
 *
 * v0.6:
 * -Added explosion object to the game, for use on collisions.
 *
 * v0.7:
 * -AI for alien's movement complete.
 *
 * v0.8:
 * -Added more aliens to the game.
 * -Adjusted speed increase on remaining aliens when an alien is destroyed.
 *
 * v0.9:
 * -Added firing mechanic for the aliens.
 *
 * v0.10:
 * -Added some internal documentation.
 *
 * v0.11
 * -Fixed errors caused by objects being destroyed before attempting to call one of their methods.
 * -Replaced ocean background with a desert background (animation and renaming of class still
 * required).
 */
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
/// <reference path="objects/bolt.ts" />
/// <reference path="objects/explosion.ts" />
//Canvas and Asset Objects
var canvas;
var stage;
var assetLoader;
//Game Objects and Variables
var tank;
var island;
var aliens = [];
var ocean;
var numberOfAliens;
var explosions = [];
var numberOfExplosions;
var bolts = [];
var numberOfBolts;
//asset manifest - array of asset objects
var manifest = [
    { id: "alien", src: "assets/images/Alien.png" },
    { id: "island", src: "assets/images/island.png" },
    { id: "background", src: "assets/images/background.png" },
    { id: "tank", src: "assets/images/Tank.png" },
    { id: "bullet", src: "assets/images/Bullet.png" },
    { id: "explosion", src: "assets/images/Explosion.png" },
    { id: "bolt", src: "assets/images/Bolt.png" },
    { id: "song", src: "assets/audio/Conquest.ogg" }
];
/*
 * This function preloads all of the assets in the game, making it ready before the game is
 * launched.
 */
function preload() {
    assetLoader = new createjs.LoadQueue(); // instantiated assetLoader
    assetLoader.installPlugin(createjs.Sound);
    assetLoader.on("complete", init, this); // event handler-triggers when loading done
    assetLoader.loadManifest(manifest); // loading my asset manifest
} //function preload ends
/*
 * This function initializes the game by setting up the canvas, FPS and enabling mouseover
 */
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    main();
} //function init ends
/*
 * This function loops and updates the game as it is being played.
 */
function gameLoop() {
    stage.update(); // Refreshes our stage
    tank.update(); //updates tank's position
    //island.update(); //updates island's position
    //ocean.update(); //updates ocean's position
    //if the tank's bullet is onscreen...
    if (tank.bulletOnScreen) {
        tank.bullet.update(); //refresh its position
    } //if ends
    for (var alien = numberOfAliens - 1; alien >= 0; alien--) {
        if (aliens[alien].hitside) {
            aliensMove(); //if they have call aliensMove
        } //if ends
    }
    for (var alien = numberOfAliens - 1; alien >= 0; alien--) {
        aliens[alien].update(); //updates aliens' position
        aliens[alien].checkTarget(); //check if the tank is in firing range
        checkCollision(tank, aliens[alien]); //check if the tank and alien have collided
        //if the bullet is onscreen...
        if (tank.bulletOnScreen) {
            checkCollision(tank.bullet, aliens[alien]); //check if the alien collided with it
        } //if ends
    }
    for (var bolt = numberOfBolts - 1; bolt >= 0; bolt--) {
        bolts[bolt].update(); //update the bolt's position
        //only check for collision if the bolt wasn't removed from the game in its update
        if (bolts[bolt] != null) {
            checkCollision(tank, bolts[bolt]); //check if it collided with the tank
        } //if ends
    }
    for (var explosion = numberOfExplosions - 1; explosion >= 0; explosion--) {
        explosions[explosion].checkTime(); //check if it should stay on screen
    }
} //function gameLoop ends
/*
 * This function sets up the game, creating and placing the game objects and variables
 */
function main() {
    //set 45 aliens to appear in the game
    numberOfAliens = 45;
    //initialize the number of explosions to 0
    numberOfExplosions = 0;
    //initialize the bolts of explosions to 0
    numberOfBolts = 0;
    //add ocean to game
    ocean = new objects.Ocean();
    stage.addChild(ocean);
    //add island to game
    island = new objects.Island();
    stage.addChild(island);
    //add tank to game
    tank = new objects.Tank();
    stage.addChild(tank);
    for (var alien = numberOfAliens - 1; alien >= 0; alien--) {
        //aliens will appear in rows of 9
        aliens[alien] = new objects.Alien(1184 + (32 * (Math.floor(alien / 9))), (32 * (alien % 9)));
        stage.addChild(aliens[alien]); //add the alien to the game
    }
    //set up the game for keyboard input
    //this section checks which key was pressed
    document.addEventListener("keydown", function (event) {
        tank.actionStart(event.keyCode); //send the tank the key that was pressed
    });
    //this section checks which key was released
    document.addEventListener("keyup", function (event) {
        tank.actionEnd(event.keyCode); ///send the tank the key that was pressed
    });
    //play the song
    createjs.Sound.play("song", { loop: -1 });
} //function main ends
/*
 * This function calculates the distance between two points.
 */
function distance(p1, p2) {
    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
} //function distance ends
/*
 * This function checks for collisions between two game objects.
 */
function checkCollision(collider1, collider2) {
    //create points for each of the objects positions
    var p1 = new createjs.Point();
    var p2 = new createjs.Point();
    //set p1's x and y to collider1's x and y
    p1.x = collider1.x;
    p1.y = collider1.y;
    //set p2's x and y to collider2's x and y
    p2.x = collider2.x;
    p2.y = collider2.y;
    //if the distance of the 2 points is less than half the width of the two objects added,
    //a collision has occured
    if (distance(p2, p1) < ((collider1.width * 0.5) + (collider2.width * 0.5))) {
        //if neither object was already colliding...
        if (!collider1.isColliding && !collider2.isColliding) {
            //set each object to be colliding
            collider1.isColliding = true;
            collider2.isColliding = true;
            //call the collide method of each object
            collider1.collide();
            collider2.collide();
        } //if ends
    }
    else {
        //set each object to not be colliding
        collider1.isColliding = false;
        collider2.isColliding = false;
    } //else ends
} //function plandAndCloud ends
/*
 * This function tells each alien to start moving forward once one alien's hitSide variable has
 * been triggered.
 */
function aliensMove() {
    for (var alien = numberOfAliens - 1; alien >= 0; alien--) {
        aliens[alien].moveForward();
    }
} //function aliensMove ends
//# sourceMappingURL=game.js.map