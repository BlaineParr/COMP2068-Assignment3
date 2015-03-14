module objects {
    export class Alien extends objects.GameObject {
        //instance variables
        private _dx: number;
        private _dy: number;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        constructor() {
            super("alien");

            this._reset();
        } //constructor ends

        //Private Methods/////////////////////////////////////////////////////////////////////////
        private _reset(): void {
            //set y to a random number
            this.x = 640 + this.width;
            this.y = Math.floor(Math.random() * 480);

            this._dx = Math.floor(Math.random() * 5) + 5;
            this._dy = Math.floor(Math.random() * -4) + 2;
        } //method reset ends

        private _checkBounds(): void {
            if (this.x < 0 - this.height) {
                this._reset();
            } //if ends
        } //method checkBounds ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        public update(): void {
            this.x -= this._dx;
            this.y += this._dy;

            this._checkBounds();
        } //method update ends

        public collide(): void {

            //create an explosion at the place the collission occured
            numberOfExplosions++;

            explosions[numberOfExplosions] = new objects.Explosion(this.x, this.y);
            stage.addChild(explosions[numberOfExplosions]);

            console.log(explosions);
            //remove alien from the array
            aliens.splice(aliens.indexOf(this), 1);

            //decrease the number of aliens, to account for the alien being removed
            numberOfAliens--;

            //remove the alien from the stage
            stage.removeChild(this);
        } //method collide ends
    } //class Alien ends
} //module objects ends   