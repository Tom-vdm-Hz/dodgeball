class Scene {

    private player: Player;
    private balls: Ball[] = [];

    private canvas: HTMLCanvasElement;

    private previous: number;

    private readonly gravity: number;
    private lvlUp: number = 1000;


    constructor(canvas: HTMLCanvasElement, gravity: number) {
        this.canvas = canvas;
        this.gravity = gravity;
        this.player = new Player(this.canvas, {up: 87, down: 83, right: 68, left: 65}, 'black');
        this.balls.push(new Ball(25, this.canvas))
        this.previous = performance.now();
        requestAnimationFrame(this.step);
    }

    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = (timestamp: number) => {
        const elapsed = timestamp - this.previous;
        this.previous = timestamp;
        //let the player move
        this.player.move(this.canvas)
        //checks if the players has collided with any balls
        const gameover = this.balls.reduce((previous_return, ball) => previous_return || ball.move(elapsed, this.gravity, this.canvas, this.player.x, this.player.y), false);
        //renders all parts of the game
        this.render()
        //checks the score of the player
        this.checkScore()
        if (!gameover) {
            requestAnimationFrame(this.step);
        } else {
            this.gameOver()
        }
    }

    /**
     * checks if the player score is high enough to add another ball
     * @private
     */
    private checkScore() {
        if (this.player.score === this.lvlUp) {
            this.lvlUp += 1000
            this.balls.push(new Ball(25, this.canvas))
        }
    }

    /**
     * renders all balls and the player on the canvas
     * @private
     */
    private render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.balls.forEach((ball) => {
            ball.render(ctx)
        })
        this.player.render(ctx, this.canvas);
    }

    /**
     * logic to do onm gameOveer
     * @private
     */
    private gameOver() {
        document.getElementById('tudo').classList.remove('hidden')
        document.getElementById('score').innerHTML = `${this.player.score}`;
        document.getElementById('canvas').classList.add('hidden')
    }
}
