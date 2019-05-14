/**
 * Reprsents a Rectangle
 **/
import {Any, PropertyTarget} from "./PropertyTarget";
import {Point} from "./Point";
import {Size} from "./Size";

export class Rectangle extends PropertyTarget{

    //region Static

    /**
     * Returns a rectangle at (0,0) of 0 dimensions
     * @returns {latte.Rectangle}
     */
    static get zero(): Rectangle{
        return new Rectangle();
    }

    /**
     * Creates a rectangle with the specified left, right, top and bottom.
     **/
    static fromLRTB(left: number, right: number, top: number, bottom: number): Rectangle{
        return  new Rectangle(left, top, right - left, bottom - top)
    }

    /**
     * Creates a rectangle from the specified object (top, left, width, height)
     * @param obj
     */
    static fromObject(obj: any): Rectangle{

        'left,top,width,height'.split(',').forEach(p => {
            if(!(p in obj)) {
                throw "Missing " + p + " property"
            }
        });

        return new Rectangle(obj.left, obj.top, obj.width, obj.height);
    }

    /**
     * Creates a rectangle from the specified object (top, left, width, height)
     * @param obj
     */
    static fromObjectLRTB(obj: any): Rectangle{

        'left,right,top,bottom'.split(',').forEach(p => {
            if(!(p in obj)) {
                throw "Missing " + p + " property"
            }
        });

        return Rectangle.fromLRTB(obj.left, obj.right, obj.top, obj.bottom);
    }

    /**
     * Creates a rectangle of the specified rectangle
     * @param {HTMLElement} e
     * @returns {latte.Rectangle}
     */
    static fromElement(e: HTMLElement): Rectangle{
        return Rectangle.fromObject(e.getBoundingClientRect());
    }

    //endregion

    /**
     * Creates a rectangle with the specified left, top, width and height.
     **/
    constructor(left: number = 0, top: number = 0, width: number = 0, height: number = 0){
        super();
        this.setPropertyValue('top', top, Number);
        this.setPropertyValue('left', left, Number);
        this.setPropertyValue('width', width, Number);
        this.setPropertyValue('height', height, Number);

    }

    //region Methods

    /**
     * Returns a rectangle of positive width and height, by changing its coordinates and preserving width and height
     */
    absolute(): Rectangle{
        let width = Math.abs(this.width);
        let height = Math.abs(this.height);
        let left = this.width < 0 ? this.right : this.left;
        let top = this.height < 0 ? this.bottom : this.top;
        return new Rectangle(left, top, width, height);
    }

    addSize(extraSize: Size): Rectangle{
        return this.withSize(new Size(this.width + extraSize.width, this.height + extraSize.height));
    }

    addSizeBy(width: number, height: number): Rectangle{
        return this.addSize(new Size(width, height));
    }

    addWidth(extraWidth: number): Rectangle{
        return this.addSize(new Size(extraWidth, 0));
    }

    addHeight(extraHeight: number): Rectangle{
        return this.addSize(new Size(0, extraHeight));
    }

    /**
     * Returns a rectangle with ceiling coordinates
     * @returns {latte.Rectangle}
     */
    ceil(): Rectangle{
        let r = Math.ceil;
        return new Rectangle(r(this.left), r(this.top), r(this.width), r(this.height));
    }

    /**
     * Returns the result of centering this into the specified container
     **/
    centerOn(container: Rectangle): Rectangle{
        return new Rectangle( container.left + (container.width - this.width) / 2,
            container.top + (container.height - this.height) / 2, this.width, this.height );
    }

    /**
     *
     * @returns {latte.Rectangle}
     */
    clone(): Rectangle{
        return new Rectangle(this.left, this.top, this.width, this.height);
    }

    /**
     * Gets a value indicating if the specified point is contained
     **/
    contains(x: number, y: number): boolean{

        return this.left <= x && x <= this.right && this.top <= y && y <= this.bottom;

    }

    /**
     * Returns a value indicating if the rectangle contains the specified point
     * @param {latte.Point} point
     * @returns {boolean}
     */
    containsPoint(point: Point){
        return this.contains(point.x, point.y);
    }

    /**
     * Gets a value indicating if the rectangle is contained inside this rectangle
     **/
    containsRectangle(rectangle: Rectangle): boolean{

        return this.contains( rectangle.left, rectangle.top) && this.contains( rectangle.right, rectangle.bottom);

    }

    /**
     * Compares this rectangle with the specified rectangle and returns the result
     * @param r
     * @returns {boolean}
     */
    equals(r: Rectangle): boolean{
        if(!r) return false;
        return this.left === r.left && this.top === this.top && this.width === r.width && this.height === r.height;
    }

    /**
     * Returns a rectangle with floor coordinates
     * @returns {latte.Rectangle}
     */
    floor(): Rectangle{
        let r = Math.floor;
        return new Rectangle(r(this.left), r(this.top), r(this.width), r(this.height));
    }

    /**
     * Returns the result of inflating the rectangle vertically and horizontally on each edge.
     **/
    inflate(horizontal: number, vertical: number): Rectangle{
        return Rectangle.fromLRTB(this.left - horizontal, this.right + horizontal,
            this.top - vertical, this.bottom + vertical);

    }

    /**
     * Returns the rectangle result of intersecting this with passed rectangle
     **/
    intersection(rectangle: Rectangle): Rectangle{

        let a = this;
        let b = rectangle;
        let x1: number = Math.max(a.left, b.left);
        let x2: number = Math.min(a.right, b.right);
        let y1: number = Math.max(a.top, b.top);
        let y2: number = Math.min(a.bottom, b.bottom);

        if(x2 >= x1 && y2 >= y1) {
            return new Rectangle(x1, y1, x2 - x1, y2 - y1);
        }

        return Rectangle.zero;

    }

    /**
     * Gets a value indicating if the rectangle intersects specified rectangle
     **/
    intersects(rectangle: Rectangle): boolean{
        let thisX = this.left;
        let thisY = this.top;
        let thisW = this.width;
        let thisH = this.height;
        let rectX = rectangle.left;
        let rectY = rectangle.top;
        let rectW = rectangle.width;
        let rectH = rectangle.height;
        return (rectX < thisX + thisW) && (thisX < (rectX + rectW)) && (rectY < thisY + thisH) && (thisY < rectY + rectH);
    }

    offset(offset: Point): Rectangle{
        return new Rectangle(this.left + offset.x, this.top + offset.y, this.width, this.height);
    }

    offsetBy(x: number, y:number): Rectangle{
        return this.offset(new Point(x, y));
    }

    offsetLeft(offset: number): Rectangle{
        return this.offset(new Point(offset, 0));
    }

    offsetTop(offset: number): Rectangle{
        return this.offset(new Point(0, offset));
    }

    /**
     * Returns a new rectangle on specified location of same size
     * @param {latte.Point} location
     */
    withLocation(location: Point): Rectangle{
        return new Rectangle(location.x, location.y, this.width, this.height);
    }

    withLocationAt(x: number, y: number){
        return this.withLocation(new Point(x, y));
    }

    withLeft(left: number): Rectangle{
        return this.withLocation(new Point(left, this.top));
    }

    withTop(top: number): Rectangle{
        return this.withLocation(new Point(this.left, top));
    }

    withWidth(width: number): Rectangle{
        return this.withSize(new Size(width, this.height));
    }

    withHeight(height: number): Rectangle{
        return this.withSize(new Size(this.width, height));
    }

    /**
     * Returns a new rectangle with same location, specified size
     * @param {latte.Size} size
     * @returns {latte.Rectangle}
     */
    withSize(size: Size): Rectangle{
        return new Rectangle(this.left, this.top, size.width, size.height);
    }

    withSizeOf(width: number, height: number): Rectangle{
        return this.withSize(new Size(width, height));
    }

    /**
     * Returns a rectangle with rounded coordinates
     * @returns {latte.Rectangle}
     */
    round(): Rectangle{
        let r = Math.round;
        return new Rectangle(r(this.left), r(this.top), r(this.width), r(this.height));
    }

    /**
     * Returns a new rectangle that could fill the specified size
     * @param {latte.Size} size
     * @returns {latte.Rectangle}
     */
    scaleToFill(size: Size): Rectangle{
        return this.withSize(this.size.scaleToFill(size));
    }

    /**
     * Scales the rectangle to fit the specified size.
     * @param {latte.Size} size
     * @returns {latte.Rectangle}
     */
    scaleToFit(size: Size): Rectangle{
        return this.withSize(this.size.scaleToFit(size));
    }

    /**
     * Returns a scaled rectangle
     * @param width
     */
    scaleToHeight(height: number): Rectangle{
        return new Rectangle(this.left, this.top, height * this.width / this.height, height);
    }

    /**
     * Returns a scaled rectangle
     * @param width
     */
    scaleToWidth(width: number): Rectangle{
        return new Rectangle(this.left, this.top, width, width * this.height / this.width);
    }

    /**
     * Returns a string describing the rectangle
     **/
    toString(): string{
        return "Rectangle: " + [this.left, this.top, this.width, this.height].join(', ');

    }

    /**
     * Gets a rectangle representing the union of this rectangle and the passed one
     **/
    union(rectangle: Rectangle): Rectangle{

        return Rectangle.fromLRTB(
            Math.min(this.left, rectangle.left),
            Math.max(this.right, rectangle.right),
            Math.min(this.top, rectangle.top),
            Math.max(this.bottom, rectangle.bottom)
        );

    }

    //endregion

    //region Properties

    /**
     * Gets the area of the rectangle
     *
     * @returns {number}
     */
    get area(): number {
        return this.size.area;
    }

    /**
     * Gets the aspect ratio of the rectangle
     *
     * @returns {number}
     */
    get aspectRatio():number {
        return this.width / this.height;
    }

    /**
     * Gets or sets the right side of the rectangle
     **/
    get bottom(): number{
        return this.top + this.height;
    }

    /**
     * Gets or sets the center of the rectangle
     * @returns {latte.Point}
     */
    get center(): Point{
        return new Point(this.left + this.width / 2, this.top + this.height / 2);
    }

    /**
     * Gets the height of the rectangle
     */
    get height(): number {
        return this.getPropertyValue('height', Number, null);
    }

    /**
     * Gets a value indicating if the rectangle is empty
     *
     * @returns {boolean}
     */
    get isZero(): boolean {
        return this.size.isEmpty && this.location.isOrigin;
    }

    /**
     * Gets a value indicating if the rectangle is horizontal
     *
     * @returns {boolean}
     */
    get isHorizontal(): boolean {
        return this.width > this.height;
    }

    /**
     * Gets a value indicating if the rectangle is a square
     *
     * @returns {boolean}
     */
    get isSquare(): boolean {
        return this.width == this.height;
    }

    /**
     * Gets a value indicating if the rectangle is vertical
     *
     * @returns {boolean}
     */
    get isVertical(): boolean {
        return this.height > this.width;
    }

    /**
     * Gets the left of the rectangle
     */
    get left(): number {
        return this.getPropertyValue('left', Number, null);
    }

    /**
     * Gets the location of the rectangle
     *
     * @returns {Point}
     */
    get location(): Point {
        return new Point(this.left, this.top);
    }

    /**
     * Gets or sets the right side of the rectangle
     **/
    get right(): number{
        return this.left + this.width;
    }

    /**
     * Gets the size of the rectangle
     *
     * @returns {Size}
     */
    get size():Size {
        return new Size(this.width, this.height);
    }

    /**
     * Gets or sets the tag of the rectangle
     */
    get tag(): any {
        return this.getPropertyValue('tag', Any, null);
    }

    /**
     * Gets or sets the tag of the rectangle
     *
     * @param {any} value
     */
    set tag(value: any) {
        this.setPropertyValue('tag', value, Any);
    }

    /**
     * Gets the top of the rectangle
     */
    get top(): number {
        return this.getPropertyValue('top', Number, null);
    }

    /**
     * Gets the width of the rectangle
     */
    get width(): number {
        return this.getPropertyValue('width', Number, null);
    }

    //endregion

}