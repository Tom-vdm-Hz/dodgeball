class Ball {
    private radius: number;
    private x: number
    private y: number
    private xSpeed: number;
    private ySpeed: number;
    private readonly minBallHeight = 0.8;


    constructor(ballRadius: number, canvas: HTMLCanvasElement) {
        this.radius = ballRadius + ballRadius * Math.random();
        this.xSpeed = -5 + 10 * Math.random();
        this.ySpeed = 0;
        this.x = this.radius +
            (canvas.width - 2 * this.radius) * Math.random();
        this.y = (this.minBallHeight + this.radius) * 0.2 * Math.random();

    }

    /**
     * moves the ball with gravity and checks player collision
     * @param elapsed
     * @param gravity
     * @param canvas
     * @param playerPositionX
     * @param playerPositionY
     */
    public move(elapsed: number, gravity: number, canvas: HTMLCanvasElement, playerPositionX: number, playerPositionY: number): boolean {
        // Calculate the new position of the ball
        // Some physics here: the y-portion of the speed changes due to gravity
        // Formula: Vt = V0 + gt
        // 9.8 is the gravitational constant and time=1
        this.ySpeed -= gravity * elapsed;
        // Calculate new X and Y parts of the position
        // Formula: S = v*t
        this.x += this.xSpeed * elapsed;
        // Formula: S=v0*t + 0.5*g*t^2
        this.y -= this.ySpeed * elapsed + 0.5 * gravity * elapsed * elapsed;

        // Collision detection: check if the ball hits the walls and let it bounce
        // Left wall
        if (this.x <= this.radius && this.xSpeed < 0) {
            this.xSpeed = -this.xSpeed;
        }
        // Right wall
        if (this.x >= canvas.width - this.radius
            && this.xSpeed > 0) {
            this.xSpeed = -this.xSpeed;
        }

        // Bottom only (ball will always come down)
        if (this.y >= canvas.height - this.radius && this.ySpeed < 0) {
            this.ySpeed = -this.ySpeed;
        }
        return this.checkPlayerCollision(playerPositionX, playerPositionY)
    }

    /**
     * checks if the ball has collided with the player
     * @param playerPositionX
     * @param playerPositionY
     */
    public checkPlayerCollision(playerPositionX: number, playerPositionY: number): boolean {
        //  if the ball collides with the player. It's game over then
        const distX = playerPositionX - this.x;
        const distY = playerPositionY - this.y;
        // Calculate the distance between ball and player using Pythagoras'
        // theorem
        const distance = Math.sqrt(distX * distX + distY * distY);
        return distance <= (this.radius + 50);
    }

    /**
     * renders the ball
     * @param ctx
     */
    public render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius,
            this.radius, 0, 0, 2 * Math.PI);
        ctx.fill();
    }


}
