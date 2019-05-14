/**
 * Represents a size vector
 */
import {PropertyTarget} from "./PropertyTarget";
/**
 * sprintf for only %s strings
 */
export function sprintf(...any: any[]){
    let arg = 1, format = arguments[0], cur, next, result = [];

    for(let i = 0; i < format.length; i++){

        cur = format.substr(i, 1);
        next = i == format.length - 1 ? '' : format.substr(i + 1, 1);

        if (cur == '%' && next == 's'){
            result.push(arguments[arg++]);
            i++;
        }else{
            result.push(cur);
        }
    }

    return result.join('');
}
export class Size extends PropertyTarget {

    //region Static
    /**
     * Gets the default empty size
     */
    static get empty(): Size {
        return PropertyTarget.getStaticLazyProperty(Size, 'empty', Size, () => {
            return new Size(0, 0);
        });
    }

    //endregion

    /**
     * Creates a new Size, optionally sets its Width and Height components
     */
    constructor(width: number = 0, height: number = 0) {
        super();
        this.setPropertyValue('width', width, Number);
        this.setPropertyValue( 'height', height, Number);
    }

    //region Methods
    /**
     * Gets a value indicating if the size contains the specified size.
     * @param size
     */
    contains(size: Size): boolean{
        return this.width >= size.width && this.height >= size.height;
    }

    /**
     * Returns a value indicating if the size is
     * @param {latte.Size} s
     * @returns {boolean}
     */
    equals(s: Size): boolean{
        return this.width == s.width && this.height == s.height;
    }

    /**
     * Inflates the size on the specified width and height
     *
     * @param width
     * @param height
     * @returns {latte.Size}
     */
    inflate(width: number, height: number): Size{
        return new Size(this.width + width, this.height + height);
    }

    /**
     * Inflates the size uniformly
     * @param wide
     */
    inflateUniform(wide: number){
        return new Size(this.width + wide, this.height + wide);
    }

    /**
     * Returns a new size with rounded dimensions
     * @returns {latte.Size}
     */
    round(): Size{
        return new Size(Math.round(this.width), Math.round(this.height));
    }

    /**
     * Gets a scaled Size that fits in the specified target.
     * @param target
     */
    scaleToFit(target: Size): Size {
        let dh = target.width * this.height / this.width;

        if(dh > target.height) {
            return new Size( target.height * this.width / this.height, target.height);
        }

        return new Size(target.width, dh);
    }

    /**
     * Gets a scaled Size that fills the specified target.
     * @param target
     */
    scaleToFill(target: Size): Size{
        let dh = target.width * this.height / this.width;

        if(dh <= target.height) {
            return new Size( target.height * this.width / this.height, target.height);
        }

        return new Size(target.width, dh);
    }

    /**
     * Gets string representation of the size
     * @returns {string}
     */
    toString(): string{
        return sprintf("(%s, %s)", this.width, this.height);
    }
    //endregion

    //region Properties
    /**
     * Gets the area represented by the size
     *
     * @returns {number}
     */
    get area():number {
        return this.width * this.height;
    }

    /**
     * Gets a value indicating if the size has no compnents assigned or initialized
     *
     * @returns {boolean}
     */
    public get isEmpty():boolean {
        return this.width === 0 || this.height === 0;
    }

    /**
     * Gets a value indicating if the size is horizontal
     *
     * @returns {boolean}
     */
    get isHorizontal(): boolean {
        return this.width > this.height;
    }

    /**
     * Gets a value indicating if the size is a square
     *
     * @returns {boolean}
     */
    get isSquare(): boolean {
        return this.width == this.height;
    }

    /**
     * Gets a value indicating if the size is vertical
     *
     * @returns {boolean}
     */
    get isVertical(): boolean {
        return this.height > this.width;
    }

    /**
     * Gets the height of the size
     */
    get height(): number {
        return this.getPropertyValue('height', Number, null);
    }

    /**
     * Gets the width of the size
     */
    get width(): number {
        return this.getPropertyValue('width', Number, null);
    }


    //endregion
}