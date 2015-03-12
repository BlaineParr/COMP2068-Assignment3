module objects {
    export class Alien extends createjs.Bitmap {
        //instance variables
        public width;
        public height;
        private _dx;
        private _dy;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super(assetLoader.getResult("alien"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;

            this._reset();
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        private _reset() {
            //set y to a random number
            this.x = 640 + this.width;
            this.y = Math.floor(Math.random() * 480);

            this._dx = Math.floor(Math.random() * 5) + 5;
            this._dy = Math.floor(Math.random() * -4) + 2;
        } //method reset ends

        private _checkBounds() {
            if (this.x < 0 - this.height) {
                this._reset();
            } //if ends
        } //method checkBounds ends
        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this.x -= this._dx;
            this.y += this._dy;

            this._checkBounds();
        } //method update ends
    } //class Plane ends
} //module objects ends   