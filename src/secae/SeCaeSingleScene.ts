import {Scene} from "../render/Scene";
import {GradeCrossingSignal} from "./GradeCrossingSignal";
import {Point} from "../render/Point";
import {UpdateInfo} from "../render/UpdateInfo";

export class SeCaeSingleScene extends Scene{

    readonly signal: GradeCrossingSignal;

    constructor(){
        super();

        this.signal = new GradeCrossingSignal();

        this.items.push(this.signal);
    }

    update(info: UpdateInfo) {
        super.update(info);

        this.signal.moveLeftTo(info.viewportBounds.left);
        this.signal.moveBottomTo(info.viewportBounds.bottom);
    }

}