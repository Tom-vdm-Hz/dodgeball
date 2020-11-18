/**
 * Main class of this Game.
 */
class Game {


    private scene: Scene;
    private canvas: HTMLCanvasElement
    private readonly wallOffsetWidth = 1
    private readonly wallOffsetHeight = 4
    private readonly gravity: number = 0.0098;


    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas
        this.canvas.width = window.innerWidth - this.wallOffsetWidth;
        this.canvas.height = window.innerHeight - this.wallOffsetHeight;
        for (let i = 0; i < 2; i++) {
            
        }
        this.scene = new Scene(this.canvas, this.gravity)
    }


}
