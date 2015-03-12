module objects {
    export class Tank extends createjs.Bitmap{
        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super(assetLoader.getResult("tank"));

            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;

            this.x = 32;
            this.y = stage.mouseY;
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        update() {
            this.y = stage.mouseY;
        } //method update ends
    } //class Tank ends
} //module objects ends 