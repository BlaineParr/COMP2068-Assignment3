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
        startButton = new objects.Button("startButton", 640, 423);
        stage.addChild(startButton);

        //add the next button
        nextButton = new objects.Button("nextButton", 879, 423);
        stage.addChild(nextButton);

        startButton.addEventListener("click", startButtonClick);

        nextButton.addEventListener("click", nextButtonClick);
    } //function instructions ends

    export function nextButtonClick() {
        stage.removeChild(instructionsScreen, startButton, nextButton);
        instructionsScreen = new createjs.Bitmap("assets/images/instructionsScreen2.png");
        instructionsScreen.x = 320;
        stage.addChild(instructionsScreen);

        //add the start button
        startButton = new objects.Button("startButton", 640, 423);
        stage.addChild(startButton);

        startButton.addEventListener("click", startButtonClick);
    } //function nextButtonClick ends
} //module states ends