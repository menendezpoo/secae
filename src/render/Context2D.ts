import {Rectangle} from "./Rectangle";
import {Color} from "./Color";

export class Context2D{

    constructor(readonly raw: CanvasRenderingContext2D){}

    drawImage(image: HTMLImageElement, r: Rectangle){
        this.raw.drawImage(image, r.left, r.top, r.width, r.height);
    }

    fillRectangle(r: Rectangle, color: Color){

        this.raw.fillStyle = color.toString();
        this.raw.fillRect(r.left, r.top, r.width, r.height);

    }

    clear(r: Rectangle){
        this.raw.clearRect(r.left, r.top, r.width, r.height);
    }

}