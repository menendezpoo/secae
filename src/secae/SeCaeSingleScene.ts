import {Scene} from "../render/Scene";
import {GradeCrossingSignal} from "./GradeCrossingSignal";
import {Point} from "../render/Point";
import {UpdateInfo} from "../render/UpdateInfo";

export class SeCaeSingleScene extends Scene{

    readonly signal: GradeCrossingSignal;

    constructor(){
        super();

        this.signal = new GradeCrossingSignal();

        // let cloud = new Square(Color.red);
        // let arm = ImageSprite.fromUrl(Resources.png('arm'));
        // let axis = new Square(Color.red);
        //
        // cloud.bounds = cloud.bounds.withSizeOf(50,500);
        // arm.bounds = arm.bounds.withLocationAt(50, 500);
        // axis.bounds = new Rectangle(50 + 15,500 + 15, 35, 35);

        // cloud.animations.push(new LinearAnimation(200, 50, 2, value => {
        //     const pre = cloud.bounds;
        //     cloud.bounds = cloud.bounds.withLeft(value);
        //     const post = cloud.bounds;
        // }));

        // arm.animations.push(new LinearAnimation(0, -90, 10, value => arm.degrees = value));
        // // arm.degrees = -.0001;
        //
        //
        // this.items.push(cloud);
        // this.items.push(arm);
        // this.items.push(axis);

        this.items.push(this.signal);
    }

    update(info: UpdateInfo) {
        super.update(info);

        this.signal.moveLeftTo(info.viewportBounds.left);
        this.signal.moveBottomTo(info.viewportBounds.bottom);
    }

}