module objects {
    export class Bullet extends objects.GameObject {
        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor(x: number, y: number) {
            super("bullet");

            this.x = x;
            this.y = y;
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        public update(): void {
            this.x += 5;
            if (this.x > 640) {
                tank.bulletOnScreen = false;
                stage.removeChild(this);
            } //if ends
        } //method update ends

        public collide(): void {
            tank.bulletOnScreen = false;
            stage.removeChild(this);
        } //method collide ends
    } //class Bullet ends
} //module objects ends 