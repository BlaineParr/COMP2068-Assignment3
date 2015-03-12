module objects {
    export class Ocean extends createjs.Bitmap {
        //instance variables
        public width;
        public height;
        private _dy = 5;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super(assetLoader.getResult("ocean"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this._reset();
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        private _reset() {
            this.x = 0;
            this.y = -960;
        } //method reset ends

        private _checkBounds() {
            if (this.y >= 0) {
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