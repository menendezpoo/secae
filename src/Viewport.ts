
export class Viewport{

    readonly context: CanvasRenderingContext2D;

    constructor(readonly canvas: HTMLCanvasElement){
        if(!canvas) {
            throw "Invalid canvas";
        }

        this.context = this.canvas.getContext('2d');
    }

}