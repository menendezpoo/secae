import {Sprite} from "./Sprite";
import {Viewport} from "./Viewport";
import {Rectangle} from "./Rectangle";
import {UpdateInfo} from "./UpdateInfo";

export class SpriteGroup extends Sprite{

    items: Sprite[] = [];

    update(info: UpdateInfo) {
        super.update(info);
        this.items.forEach(item => item.update(info) );
    }

    draw(viewport: Viewport) {
        super.draw(viewport);

        viewport.context.raw.save();
        viewport.context.raw.translate(this.bounds.left, this.bounds.top);

        this.items.forEach(item => item.draw(viewport));

        viewport.context.raw.restore();
    }

}