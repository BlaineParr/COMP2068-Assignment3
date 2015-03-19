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

        //add the next button
        nextButton = new createjs.Bitmap("assets/images/NextButton.png");
        nextButton.x = 829;
        nextButton.y = 398;
        stage.addChild(nextButton);

        startButton.addEventListener("click", startButtonClick);
        startButton.addEventListener("mouseover", startButtonMouseOver);
        startButton.addEventListener("mouseout", startButtonMouseOut);

        nextButton.addEventListener("click", nextButtonClick);
        nextButton.addEventListener("mouseover", nextButtonMouseOver);
        nextButton.addEventListener("mouseout", nextButtonMouseOut);
    } //function instructions ends

    export function nextButtonClick() {
        stage.removeChild(instructionsScreen, startButton, nextButton);
        instructionsScreen = new createjs.Bitmap("assets/images/instructionsScreen2.png");
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
    } //function nextButtonClick ends

    export function nextButtonMouseOver() {
        nextButton.alpha = 0.01;
    } //function nextButtonMouseOver ends

    export function nextButtonMouseOut() {
        nextButton.alpha = 1;
    } //function nextButtonMouseOver ends
} //module states ends