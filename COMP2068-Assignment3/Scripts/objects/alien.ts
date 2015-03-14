module objects {
    export class Alien extends objects.GameObject {
        //instance variables
        private _dx: number;
        private _dy: number;
        private _goalX: number;
        public speed: number;
        public hitside: boolean;
        public movingForward: boolean;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor(x: number, y: number) {
            super("alien");

            this.x = x;
            this.y = y;

            this.speed = 1;

            this.hitside = false;
            this.movingForward = false;
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        private _checkBounds(): void {
            if (this.y < 0 || this.y > 480) {
                this.hitside = true;
            } //if ends
        } //method checkBounds ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        public update(): void {
            if (this.movingForward) {
                if (this.speed > 0) {
                    this.x -= this.speed;
                } //if ends
                else {
                    this.x += this.speed;
                } //else ends

                if (this.x <= this._goalX) {
                    this.movingForward = false;
                    this.changeDirection();
                } //if ends
            } //if ends
            else {
                this.y += this.speed;

                this._checkBounds();
            } //else ends
        } //method update ends

        public moveForward() {
            this.hitside = false;
            this.movingForward = true;
            this._goalX = this.x - 32;
        } //method moveForward ends

        public changeDirection(): void {
            this.speed *= -1;
            
        } //method reset ends

        public collide(): void {
            //create an explosion at the place the collission occured
            numberOfExplosions++;

            explosions[numberOfExplosions] = new objects.Explosion(this.x, this.y);
            stage.addChild(explosions[numberOfExplosions]);

            for (var alien = numberOfAliens; alien > 0; alien--) {
                aliens[alien].speed *= 1.2;
            } //for ends

            //remove alien from the array
            aliens.splice(aliens.indexOf(this), 1);

            //decrease the number of aliens, to account for the alien being removed
            numberOfAliens--;

            //remove the alien from the stage
            stage.removeChild(this);
        } //method collide ends
    } //class Alien ends
} //module objects ends   