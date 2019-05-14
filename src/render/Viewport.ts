import {Context2D} from "./Context2D";
import {Scene} from "./Scene";
import {Rectangle} from "./Rectangle";
import {UpdateInfo} from "./UpdateInfo";

export class Viewport{


    static byCanvasId(id: string): Viewport{
        return new Viewport(document.getElementById(id) as HTMLCanvasElement);
    }

    readonly canvasContext: CanvasRenderingContext2D;
    readonly context: Context2D;

    private active = false;

    scenes: Scene[] = [];
    bounds: Rectangle = new Rectangle();

    constructor(readonly canvas: HTMLCanvasElement, readonly fullscreen = true){
        if(!canvas) {
            throw "Invalid canvas";
        }

        this.canvasContext = this.canvas.getContext('2d');
        this.context = new Context2D(this.canvasContext);

        if(fullscreen) {
            window.addEventListener('resize', e => this.adjustToViewport());
            this.adjustToViewport();
        }

    }

    private adjustToViewport(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.bounds = this.bounds.withSizeOf(this.canvas.width, this.canvas.height);
    }

    start(){

        this.active = true;

        let frame = () => {

            if(!this.active) {
                return;
            }

            this.context.clear(this.bounds);

            this.scenes.forEach(scene => {
                scene.update(new UpdateInfo(this.bounds));
                scene.draw(this);
            });

            requestAnimationFrame(frame);
        };

        requestAnimationFrame(frame);

    }

    stop(){
        this.active = false;
    }

}