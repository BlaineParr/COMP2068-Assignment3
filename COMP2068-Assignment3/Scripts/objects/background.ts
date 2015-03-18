module objects {
    export class Background extends createjs.Bitmap {
        //instance variables
        public width;
        public height;
        private _dx = -5;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super(assetLoader.getResult("background"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this._reset();
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        private _reset() {
            this.x = 0;
            this.y = 0;
        } //method reset ends

        private _checkBounds() {
            if (this.x <= -640) {
                this._reset();
            } //if ends
        } //method checkBounds ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this.x += this._dx;

            this._checkBounds();
        } //method update ends
    } //class Plane ends
} //module objects ends   