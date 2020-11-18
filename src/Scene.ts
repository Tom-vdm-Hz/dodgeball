class Scene {

    private player: Player
    private balls: Ball[] = [];

    private canvas: HTMLCanvasElement;

    private previous: number;

    private readonly gravity: number;
    private lvlUp: number = 500;


    constructor(canvas: HTMLCanvasElement, gravity: number) {

        this.canvas = canvas;
        this.gravity = gravity;
        this.player = new Player(this.canvas);
        this.balls.push(new Ball(25, this.canvas))

        // Transform the rendering context so that (0,0) is the lower left
        // corner.
        const ctx = this.canvas.getContext('2d');
        ctx.transform(1, 0, 0, -1, 0, this.canvas.height);

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
        let collided: boolean = false;
        this.player.move(this.canvas)
        // const gameOver = this.ball.move(elapsed, this.gravity, this.canvas);
        this.balls.forEach((ball) => {
            ball.move(elapsed, this.gravity, this.canvas)
            if (ball.checkPlayerCollision(this.player.playerPositionX, this.player.playerPositionY) === true) {
                collided = true
            }
        })
        this.render()
        if (this.player.score === this.lvlUp) {
            this.lvlUp += 500
            this.balls.push(new Ball(25, this.canvas))
        }
        if (!collided) {
            requestAnimationFrame(this.step);
        }
    }

    private render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.balls.forEach((ball) => {
            ball.render(ctx)
        })
        this.player.render(ctx);
    }
}
