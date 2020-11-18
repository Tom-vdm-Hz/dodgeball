class Player {
    private _playerPositionX: number;
    private _playerPositionY: number;
    private _playerRadius = 50;
    private keyboardListener: KeyboardListener;
    private _score: number = 0
    private speed: number = 3;


    constructor(canvas: HTMLCanvasElement) {
        // Set the player at the center
        this._playerPositionX = canvas.width / 2;
        this._playerPositionY = 50
        this.keyboardListener = new KeyboardListener()
    }

    public render(ctx: CanvasRenderingContext2D) {
        this._score += 1
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.ellipse(this._playerPositionX, this._playerPositionY, this._playerRadius, this._playerRadius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }


    public move(canvas: HTMLCanvasElement) {
        //w
        if (this.keyboardListener.isKeyDown(87)) {
            console.log('w')
            if (!(this.playerPositionY >= canvas.height - this.playerRadius)) {
                this._playerPositionY += this.speed
            }
        }
        //a
        if (this.keyboardListener.isKeyDown(65)) {
            if (this.playerPositionX >= this.playerRadius) {
                this._playerPositionX -= this.speed
            }
        }
        //s
        if (this.keyboardListener.isKeyDown(83)) {
            console.log('s')
            if (!(this.playerPositionY <= this.playerRadius)) {
                this._playerPositionY -= this.speed
            }

        }
        //d
        if (this.keyboardListener.isKeyDown(68)) {
            console.log('d')
            if (this.playerPositionX <= canvas.width - this.playerRadius) {
                this._playerPositionX += this.speed
            }

        }

    }


    get playerPositionX(): number {
        return this._playerPositionX;
    }

    get playerRadius(): number {
        return this._playerRadius;
    }


    get playerPositionY(): number {
        return this._playerPositionY;
    }


    get score(): number {
        return this._score;
    }
}
