/*
 * This class is an explosion which is placed wherever an alien is destroyed.
 */
module objects {
    export class Explosion extends createjs.Bitmap {
        //instance variables
        private timeEnd: number;

        //Constructor/////////////////////////////////////////////////////////////////////////////
        /*
         * This constructor creates explosion objects at the position provided.
         */
        constructor(x: number, y: number) {
            super(assetLoader.getResult("explosion"));

            //set the x and y positions to be in the middle of the graphic
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().width * 0.5;

            this.x = x;
            this.y = y;

            //set timeEnd to be 1 second from the explosions creation
            this.timeEnd = Date.now() + 1000;
        } //constructor ends

        //Public Methods//////////////////////////////////////////////////////////////////////////
        /*
         * This method checks if enough time has passed to remove the explosion.
         */
        public checkTime(): void {
            //if more than 1 second has passed...
            if (Date.now() > this.timeEnd) {
                //remove the explosion from the explosions array
                explosions.splice(explosions.indexOf(this), 1); 
                stage.removeChild(this); //remove the explosion from the game
                numberOfExplosions--; //decrease the number of explosions in game
            } //if ends
        } //method checkTime ends
    } //class explosion ends
} //module objects ends