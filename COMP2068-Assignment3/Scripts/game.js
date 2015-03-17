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
 *
 * v0.12
 * -Implemented game state system.
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
/// <reference path="constants.ts" />
/// <reference path="states/play.ts" />
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
//state objects
var currentState;
var currentStateFunction;
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
    currentState = constants.PLAY_STATE;
    changeState(currentState);
} //function init ends
/*
 * This function loops and updates the game as it is being played.
 */
function gameLoop() {
    currentStateFunction();
    stage.update(); // Refreshes our stage
} //function gameLoop ends
function changeState(state) {
    switch (state) {
        case constants.MENU_STATE:
            break;
        case constants.PLAY_STATE:
            // instantiate play screen
            currentStateFunction = states.playState;
            states.play();
            break;
        case constants.GAME_OVER_STATE:
            break;
    }
}
//# sourceMappingURL=game.js.map