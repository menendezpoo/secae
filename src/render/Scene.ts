import {Renderable} from "./Renderable";
import {Viewport} from "./Viewport";
import {UpdateInfo} from "./UpdateInfo";

export class Scene extends Renderable {

    items: Renderable[] = [];

    constructor(){
        super();
    }

    update(info: UpdateInfo) {
        super.update(info);
        this.items.forEach(item => {
            item.update(info)
        });
    }

    draw(viewport: Viewport) {
        super.draw(viewport);

        this.items.forEach(item => item.draw(viewport));
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