module objects {
    export class Alien extends objects.GameObject {
        //instance variables
        private _dx: number;
        private _dy: number;
        private _goalX: number;
        private _movingForward: boolean;
        private _coolDownStart: number;
        private _coolDownEnd: number;
        public speed: number;
        public hitside: boolean;
        
        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor(x: number, y: number) {
            super("alien");

            this.x = x;
            this.y = y;

            this.speed = 1;

            this._coolDownStart = 0;
            this._coolDownEnd = 0;

            this.hitside = false;
            this._movingForward = false;
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        private _checkBounds(): void {
            if (this.y < 0 || this.y > 480) {
                this.hitside = true;
            } //if ends
        } //method checkBounds ends

        private _fire() {
            if (Math.floor(Math.random() * 100 + 1) == 1) {
                if (Date.now() > this._coolDownEnd) {
                    this._coolDownStart = Date.now();
                    this._coolDownEnd = this._coolDownStart + 5000;

                    bolts[numberOfBolts] = new objects.Bolt(this.x, this.y);
                    stage.addChild(bolts[numberOfBolts]);
                    numberOfBolts++;
                } //if ends
            } //if ends
        } //method fire ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        public update(): void {
            if (this._movingForward) {
                if (this.speed > 0) {
                    this.x -= this.speed;
                } //if ends
                else {
                    this.x += this.speed;
                } //else ends

                if (this.x <= this._goalX) {
                    this._movingForward = false;
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
            this._movingForward = true;
            this._goalX = this.x - 32;
        } //method moveForward ends

        public changeDirection(): void {
            this.speed *= -1;
        } //method reset ends

        public checkTarget() {
            if (tank.y - this.y <= 16 && tank.y - this.y >= -16) {
                this._fire();
            } //if ends
        } //method checkTarget ends

        public collide(): void {
            //create an explosion at the place the collission occured
            explosions[numberOfExplosions] = new objects.Explosion(this.x, this.y);
            stage.addChild(explosions[numberOfExplosions]);
            numberOfExplosions++;

            //remove alien from the array
            aliens.splice(aliens.indexOf(this), 1);

            //decrease the number of aliens, to account for the alien being removed
            numberOfAliens--;

            for (var alien = numberOfAliens - 1; alien >= 0; alien--) {
                if (numberOfAliens > 1) {
                    aliens[alien].speed *= 1.02;
                } //if ends
                else {
                    aliens[alien].speed *= 4;
                } //else ends
            } //for ends

            //remove the alien from the stage
            stage.removeChild(this);
        } //method collide ends
    } //class Alien ends
} //module objects ends   