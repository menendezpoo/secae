import {Rectangle} from "./Rectangle";
import {Color} from "./Color";
import {Point} from "./Point";

export class Context2D{

    constructor(readonly raw: CanvasRenderingContext2D){}

    drawImage(image: HTMLImageElement, point: Point){
        this.raw.drawImage(image, point.x, point.y, image.width, image.height);
    }

    fillRectangle(r: Rectangle, color: Color){

        this.raw.fillStyle = color.toString();
        this.raw.fillRect(r.left, r.top, r.width, r.height);

    }

    clear(r: Rectangle){
        this.raw.clearRect(r.left, r.top, r.width, r.height);
    }

}