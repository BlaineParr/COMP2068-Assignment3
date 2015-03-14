module objects {
    export class Tank extends objects.GameObject{

        //instance variables
        private _movingUp: boolean;
        private _movingDown: boolean;
        public health: number;
        public bullet: objects.Bullet;
        public bulletOnScreen: boolean;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super("tank");

            this.health = 3;

            this.x = 48;
            this.y = 240;
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        public update(): void {
            if (this._movingUp) {
                this.y -= 3;

                if (this.y < -16) {
                    this.y = 496;
                } //if ends
            } //if ends
            else if (this._movingDown) {
                this.y += 3;

                if (this.y > 496) {
                    this.y = -16;
                } //if ends
            } //else if ends
        } //method update ends

        public actionStart(key): void {
            if (key == 87) {
                this._movingUp = true;
            } //if ends
            if (key == 83) {
                this._movingDown = true;
            } //if ends
            if (key == 32) {
                this.fire();
            } //if ends
        } //method startMoving ends

        public actionEnd(key): void {
            if (key == 87) {
                this._movingUp = false;
            } //if ends
            else if (key == 83) {
                this._movingDown = false;
            } //if ends
        } //method startMoving ends

        public fire(): void {
            if (!this.bulletOnScreen) {
                this.bullet = new objects.Bullet(this.x, this.y);
                stage.addChild(this.bullet);
                this.bulletOnScreen = true;
                console.log("Bullet on Screen!");
            } //if ends
        } //method fire ends

        public collide(): void {
            this.health--;
        } //method collide ends
    } //class Tank ends
} //module objects ends 