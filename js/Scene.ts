import {Renderable} from "./Renderable";
import {Viewport} from "../src/Viewport";

export class Scene extends Renderable {

    items: Renderable[] = [];

    constructor(){
        super();
    }

    onUpdate() {
        super.onUpdate();

        this.items.forEach(item => item.onUpdate());
    }

    onDraw(viewport: Viewport) {
        super.onDraw(viewport);

        this.items.forEach(item => item.onDraw(viewport));
    }

    removeItemAt(index: number): this{
        this.items = this.items.splice(index, 1);
        return this;
    }

    removeItem(item: Renderable): this{
        this.items = this.items.filter(i => i !== item);
        return this;
    }

}