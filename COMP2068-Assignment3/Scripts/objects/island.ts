module objects {
    export class Island extends createjs.Bitmap {
        //instance variables
        public width;
        public height;
        private _dy = 5;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super(assetLoader.getResult("island"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;

            this._reset();
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        private _reset() {
            //set x to a random number
            this.x = Math.floor(Math.random() * 640);
            this.y = -this.width;
        } //method reset ends

        private _checkBounds() {
            if (this.y > 480 + this.height) {
                this._reset();
            } //if ends
        } //method checkBounds ends
        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this.y += this._dy;

            this._checkBounds();
        } //method update ends
    } //class Plane ends
} //module objects ends  