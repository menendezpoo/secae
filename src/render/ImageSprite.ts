import {Sprite} from "./Sprite";
import {Viewport} from "./Viewport";
import {Point} from "./Point";
import {Color} from "./Color";
import {Size} from "./Size";

export class ImageSprite extends Sprite{

    static fromUrl(url: string): ImageSprite{
        const img = document.createElement('img');
        img.src = url;

        img.addEventListener('error', e => {
            throw `Invalid image: --${url}-- : ${e}`
        });

        return new ImageSprite(img);
    }

    degrees: number = 0;
    center: Point = Point.origin;

    constructor(public image: HTMLImageElement, explicitSize: Size = null){
        super();

        if(explicitSize) {
            this.bounds = this.bounds.withSize(explicitSize);
        }

        let sizeSet = !!explicitSize;

        if(!sizeSet) {
            if(!this.image.complete) {
                this.image.addEventListener('load',
                    () => this.bounds = this.bounds.withSizeOf(this.image.width, this.image.height));
            }else{
                this.bounds = this.bounds.withSizeOf(this.image.width, this.image.height);
            }
        }

    }

    /**
     * Override
     * @param viewport
     */
    draw(viewport: Viewport) {

        super.draw(viewport);

        if(this.degrees !== 0) {
            viewport.context.raw.save();
            viewport.context.raw.translate(this.bounds.left + this.center.x, this.bounds.top + this.center.y );
            viewport.context.raw.rotate(this.degrees * Math.PI / 180);
            viewport.context.drawImage(this.image, new Point(-this.center.x, -this.center.y));
        }else{
            viewport.context.drawImage(this.image, this.bounds.location);
        }


        if(this.degrees !== 0) {
            viewport.context.raw.restore();
        }

    }

}