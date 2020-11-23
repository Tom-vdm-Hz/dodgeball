class Player {
    private _x: number;
    private _y: number;
    private _radius = 50;
    private keyboardListener: KeyboardListener;
    private keyCodes: movementKeyCodes;
    private _score: number = 0
    private speed: number = 3;
    private color: string;


    constructor(canvas: HTMLCanvasElement, keyCodes: movementKeyCodes, color: string) {
        // Set the player at the bottom center
        this._x = canvas.width / 2;
        this._y = canvas.height - this.radius;

        //new KeyboardListener to detect keypresses
        this.keyboardListener = new KeyboardListener()

        //the keyCodes to listen for
        this.keyCodes = keyCodes;

        //color of the player
        this.color = color;
    }

    /**
     * renders the player
     * @param ctx
     * @param cavans
     */
    public render(ctx: CanvasRenderingContext2D, cavans: HTMLCanvasElement) {
        //adding 1 score
        this._score += 1

        //rendering the score
        ctx.font = `${30}px Minecraft`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(`Score: ${this.score}, every 1000 score a ball gets added.`, cavans.width / 2, 50);

        //rendering the player
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this._x, this._y, this._radius, this._radius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }


    /**
     * moves the player
     * @param canvas
     */
    public move(canvas: HTMLCanvasElement) {
        //checks if the player is within moving direction and moves player
        if (this.keyboardListener.isKeyDown(this.keyCodes.up)) {
            if (this.y >= this.radius) {
                this._y -= this.speed
            }
        }
        //checks if the player is within moving direction and moves player
        if (this.keyboardListener.isKeyDown(this.keyCodes.left)) {
            if (this.x >= this.radius) {
                this._x -= this.speed
            }
        }
        //checks if the player is within moving direction and moves player
        if (this.keyboardListener.isKeyDown(this.keyCodes.down)) {
            if (this.y <= canvas.height - this.radius) {
                this._y += this.speed
            }
        }
        //checks if the player is within moving direction and moves player
        if (this.keyboardListener.isKeyDown(this.keyCodes.right)) {
            if (this.x <= canvas.width - this.radius) {
                this._x += this.speed
            }

        }

    }


    get x(): number {
        return this._x;
    }

    get radius(): number {
        return this._radius;
    }


    get y(): number {
        return this._y;
    }


    get score(): number {
        return this._score;
    }


}

//interface to check movement keys
interface movementKeyCodes {
    up: number
    down: number
    right: number
    left: number
}
