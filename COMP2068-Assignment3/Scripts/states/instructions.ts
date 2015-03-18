module states {
    export function instructionsState() {
        background.update();
    } //function menuState ends

    export function instructions() {
        stage.removeAllChildren(); //clear the stage
        stage.removeAllEventListeners(); //remove event listeners

        background = new objects.Background();
        stage.addChild(background);

        //add the menu screen
        instructionsScreen = new createjs.Bitmap("assets/images/InstructionsScreen.png");
        instructionsScreen.x = 320;
        stage.addChild(instructionsScreen);

        //add the start button
        startButton = new createjs.Bitmap("assets/images/StartButton.png");
        startButton.x = 590;
        startButton.y = 398;
        stage.addChild(startButton);

        startButton.addEventListener("click", startButtonClick);
        startButton.addEventListener("mouseover", startButtonMouseOver);
        startButton.addEventListener("mouseout", startButtonMouseOut);
    } //function instructions ends
} //module states ends