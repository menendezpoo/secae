import {Sprite} from "./Sprite";
import {Color} from "./Color";
import {Viewport} from "./Viewport";

export class Square extends Sprite{

    constructor(readonly color: Color){
        super();
    }

    draw(viewport: Viewport) {
        super.draw(viewport);

        viewport.context.fillRectangle(this.bounds, this.color);
    }

}