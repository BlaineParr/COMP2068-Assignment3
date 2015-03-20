module states {
    export function gameOverState() {
        background.update();
    } //function gameOverState ends

    export function gameOver() {
        stage.removeAllChildren(); //clear the stage
        stage.removeAllEventListeners(); //remove event listeners
        createjs.Sound.stop();

        background = new objects.Background();
        stage.addChild(background);

        missionOutcomeText = new createjs.Text(missionOutcome, "72px Arial", "Red");
        missionOutcomeText.x = 640 - (missionOutcomeText.getMeasuredWidth() / 2);
        stage.addChild(missionOutcomeText);

        scoreText = new createjs.Text("Final Score: " + score, "72px Arial", "Red");
        scoreText.x = 640 - (scoreText.getMeasuredWidth() / 2);
        scoreText.y = 100;
        stage.addChild(scoreText);
    } //function gameOver ends
} //module states ends 