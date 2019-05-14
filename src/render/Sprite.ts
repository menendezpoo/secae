import {Renderable} from "./Renderable";
import {Rectangle} from "./Rectangle";
import {Animation} from "./Animation";
import {Point} from "./Point";
import {UpdateInfo} from "./UpdateInfo";

export abstract class Sprite extends Renderable{

    animations: Animation[];
    bounds = new Rectangle();

    constructor(){
        super();
        this.animations = [];
    }

    /**
     * Clears the animations that are over.
     */
    private sweepAnimations(){
        const arr = this.animations.filter(a => !a.ended);
        this.animations = arr;
    }

    /**
     * Adds the animation and returns a promise that resolves when animation is done
     * @param animation
     */
    addAnimation(animation: Animation): Promise<void>{

       this.animations.push(animation);

        return new Promise<void>(resolve => {

            animation.on('finish',
                () => resolve());

        });
    }

    moveLeftTo(left: number): this{
        this.bounds = this.bounds.withLeft(left);
        return this;
    }

    moveTopTo(top: number): this{
        this.bounds = this.bounds.withTop(top);
        return this;
    }

    moveRightTo(right: number): this{
        this.bounds = this.bounds.withLeft(right - this.bounds.width);
        return this;
    }

    moveBottomTo(bottom: number): this{
        this.bounds = this.bounds.withTop(bottom - this.bounds.height);
        return this;
    }

    moveTo(left: number, top: number): this{
        this.bounds = this.bounds.withLocationAt(left, top);
        return this;
    }

    moveToPoint(p: Point): this{
        this.bounds = this.bounds.withLocation(p);
        return this;
    }

    /**
     * Override
     */
    update(info: UpdateInfo) {
        super.update(info);

        if(this.animations.length > 0) {
            this.animations.forEach(anim => {
                anim.update();
            });
            this.sweepAnimations();
        }

    }

}