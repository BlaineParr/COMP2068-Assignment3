module objects {
    export class Tank extends createjs.Bitmap{

        //instance variables
        private _movingUp;
        private _movingDown;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super(assetLoader.getResult("tank"));

            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;

            this.x = 48;
            this.y = 240;
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            if (this._movingUp) {
                this.y -= 3;
            } //if ends
            else if (this._movingDown) {
                this.y += 3;
            } //else if ends
        } //method update ends

        startMoving(key) {
            if (key == 87) {
                this._movingUp = true;
            } //if ends
            else if (key == 83) {
                this._movingDown = true;
            } //if ends
        } //method startMoving ends

        stopMoving(key) {
            if (key == 87) {
                this._movingUp = false;
            } //if ends
            else if (key == 83) {
                this._movingDown = false;
            } //if ends
        } //method startMoving ends
    } //class Tank ends
} //module objects ends 