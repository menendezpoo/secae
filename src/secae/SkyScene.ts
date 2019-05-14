import {Scene} from "../render/Scene";
import {Viewport} from "../render/Viewport";
import {Color} from "../render/Color";
import {ImageSprite} from "../render/ImageSprite";
import {Resources} from "../game/Resources";
import {UpdateInfo} from "../render/UpdateInfo";
import {Rectangle} from "../render/Rectangle";
import {LinearAnimation} from "../render/LinearAnimation";

export class SkyScene extends Scene{

    readonly skyColor = Color.fromHex('#7AA3D6');

    clouds: ImageSprite[] = [];

    private initedClouds = false;
    private viewBounds: Rectangle = Rectangle.zero;

    constructor(){
        super();

        this.clouds.push(this.randomCloud());
        this.clouds.push(this.randomCloud());
        this.clouds.push(this.randomCloud());
        this.clouds.push(this.randomCloud());
        this.clouds.push(this.randomCloud());
        this.clouds.push(this.randomCloud());

        this.clouds.forEach(cloud => this.items.push(cloud));
    }

    private randomCloud(): ImageSprite{

        const img = new ImageSprite(Math.random() > 0.5 ? Resources.cloud1 : Resources.cloud2);

        return img;
    }

    private resetCloud(cloud: ImageSprite, randomLeft = false){

        const bounds = this.viewBounds;
        const time = 30 + Math.random() * 60;
        const left = randomLeft ? Math.random() * bounds.width : bounds.right;

        cloud.moveTopTo(Math.random() * bounds.height);
        cloud.addAnimation(new LinearAnimation(left, -cloud.bounds.width, time, l => cloud.moveLeftTo(l)))
            .then(() => this.resetCloud(cloud));

    }

    update(info: UpdateInfo) {
        super.update(info);

        this.viewBounds = info.viewportBounds;

        if(!this.initedClouds) {
            this.initedClouds = true;

            this.clouds.forEach(c => this.resetCloud(c, true));
        }

    }

    draw(viewport: Viewport) {
        viewport.context.fillRectangle(viewport.bounds, this.skyColor);

        super.draw(viewport);
    }
}