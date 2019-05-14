import {SpriteGroup} from "../render/SpriteGroup";
import {Color} from "../render/Color";
import {ImageSprite} from "../render/ImageSprite";
import {Resources} from "../game/Resources";
import {Viewport} from "../render/Viewport";
import {Point} from "../render/Point";
import {LinearAnimation} from "../render/LinearAnimation";
import {UpdateInfo} from "../render/UpdateInfo";

export class GradeCrossingSignal extends SpriteGroup{

    readonly post = ImageSprite.fromUrl(Resources.png('post'));
    readonly cantilever = ImageSprite.fromUrl(Resources.png('arm'));
    readonly lightSupport = ImageSprite.fromUrl(Resources.png('light-support'));
    readonly leftLight = new ImageSprite(Resources.lightOff);
    readonly rightLight = new ImageSprite(Resources.lightOff);
    readonly cross = ImageSprite.fromUrl(Resources.png('cross'));

    blocked = false;

    private blinking = false;
    private blinkTime = 500;
    private nextBlink = 0;
    private leftOn = false;
    private rightOn = false;

    lifted = true;

    constructor() {
        super();

        this.cantilever.center = new Point(34, 34);

        this.items.push(this.post);
        this.items.push(this.cantilever);
        this.items.push(this.cross);
        this.items.push(this.lightSupport);
        this.items.push(this.leftLight);
        this.items.push(this.rightLight);

        this.cantilever.degrees = -90;

        this.bounds = this.bounds.withSizeOf(450, 800);

    }

    private stopBlinking(){
        this.nextBlink = 0;
        this.blinking = false;
        this.leftOn = this.rightOn = false;
        this.updateLights();
    }

    private updateLights(){
        this.leftLight.image = this.leftOn ? Resources.lightOn : Resources.lightOff;
        this.rightLight.image = this.rightOn ? Resources.lightOn : Resources.lightOff;
    }


    /**
     * Override
     */
    update(info: UpdateInfo) {
        super.update(info);

        this.post.moveLeftTo(this.bounds.width / 2 - this.post.bounds.width / 2);

        this.cross.bounds = this.cross.bounds.withLeft(this.bounds.width / 2 - this.cross.bounds.width / 2);
        this.cross.bounds = this.cross.bounds.withTop(-this.cross.bounds.height / 2);

        const lightsTop = this.cross.bounds.bottom;

        this.lightSupport.bounds = this.lightSupport.bounds.withLeft(this.bounds.width / 2 - this.lightSupport.bounds.width / 2);
        this.lightSupport.bounds = this.lightSupport.bounds.withTop(lightsTop);

        this.leftLight.bounds = this.leftLight.bounds.withTop(lightsTop);
        this.rightLight.bounds = this.rightLight.bounds.withTop(lightsTop);

        this.leftLight.bounds = this.leftLight.bounds.withLeft(this.post.bounds.left - this.leftLight.bounds.width);
        this.rightLight.bounds = this.rightLight.bounds.withLeft(this.post.bounds.right);

        this.cantilever.bounds = this.cantilever.bounds.withTop(this.leftLight.bounds.bottom + 100);
        this.cantilever.bounds = this.cantilever.bounds.withLeft(this.bounds.width / 2 - 34);

        if(this.blinking) {

            // If just turned on
            if(this.nextBlink === 0 || this.getTime() >= this.nextBlink) {
                this.nextBlink = this.getTime() + this.blinkTime;

                if(this.leftOn) {
                    this.leftOn = false;
                    this.rightOn = true;
                }else{
                    this.leftOn = true;
                    this.rightOn = false;
                }

                this.updateLights();
            }

        }

    }

    /**
     * Override
     * @param viewport
     */
    draw(viewport: Viewport) {
        // viewport.context.fillRectangle(this.bounds, Color.fromHex('ff0'));
        super.draw(viewport);
    }

    lift(){
        this.blocked = true;
        this.cantilever.addAnimation(
            new LinearAnimation(0, -90, 5,
                value => this.cantilever.degrees = value))
            .then(() => {
                this.lifted = true;
                this.stopBlinking();
                this.blocked = false;
            });
    }

    drop(){
        this.blocked = true;
        this.blinking = true;
        this.wait(3)
            .then(() => this.cantilever.addAnimation(
                new LinearAnimation(-90, 0, 5,
                    value => this.cantilever.degrees = value)))
            .then(() => {
                this.lifted = false;
                this.blocked = false;
            });

    }

    get isMovingCantilever(): boolean{
        return this.cantilever.animations.length > 0;
    }

}