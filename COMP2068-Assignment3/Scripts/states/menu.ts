module states {
    export function menuState() {
        background.update();
    } //function menuState ends

    export function menu() {
        stage.removeAllChildren(); //clear the stage
        stage.removeAllEventListeners(); //remove event listeners

        background = new objects.Background();
        stage.addChild(background);

        //add the menu screen
        menuScreen = new createjs.Bitmap("assets/images/MenuScreen.png");
        menuScreen.x = 320;
        stage.addChild(menuScreen);

        //add the start button
        startButton = new objects.Button("startButton", 402, 423);
        stage.addChild(startButton);

        //add the instructions button
        instructionsButton = new objects.Button("instructionsButton", 878, 423);
        stage.addChild(instructionsButton);

        startButton.addEventListener("click", startButtonClick);

        instructionsButton.addEventListener("click", instructionsButtonClick);
    } //function menu ends

    export function startButtonClick() {
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    } //function playButtonClick ends

    export function instructionsButtonClick() {
        currentState = constants.INSTRUCTIONS_STATE;
        changeState(currentState);
    } //function playButtonClick ends
} //module states ends