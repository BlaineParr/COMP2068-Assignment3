module states {
    export function gameOverState() {
        background.update();
    } //function gameOverState ends

    export function gameOver() {
        stage.removeAllChildren(); //clear the stage
        stage.removeAllEventListeners(); //remove event listeners

        background = new objects.Background();
        stage.addChild(background);

        scoreText = new createjs.Text("Final Score: " + score, "72px Arial", "Red");
        stage.addChild(scoreText);
    } //function gameOver ends
} //module states ends 