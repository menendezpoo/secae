/**
 * Represents a inmmutable point
 */
import {PropertyTarget} from "./PropertyTarget";
import {sprintf} from "./Size";

export class Point extends PropertyTarget{

    //region Static

    /**
     * Gets the distance between two points
     * @param a
     * @param b
     */
    static distance(a: Point, b: Point): number{
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y , 2));
    }

    /**
     * Gets an empty point
     */
    static get origin(): Point {
        return PropertyTarget.getStaticLazyProperty(Point, 'origin', Point, () => {
            return new Point(0, 0);
        });
    }


    //endregion

    /**
     * Creates a new point, optionally
     */
    constructor(x: number = null, y: number = null) {
        super();

        this.setPropertyValue('x', x, Number);
        this.setPropertyValue('y', y, Number);
    }

    //region Methods

    /**
     * Gets the distance to the specified point
     * @param {latte.Point} p
     * @returns {number}
     */
    distanceTo(p: Point): number{
        return Point.distance(this, p);
    }

    /**
     * Gets a value indicating if the passed point is equals to this one
     * @param {latte.Point} p
     * @returns {boolean}
     */
    equals(p: Point): boolean{
        return this.x == p.x && p.y == this.y;
    }

    /**
     * Returns a point with the negative version of its coordinates
     */
    negate(): Point{
        return new Point(this.x * -1, this.y * -1);
    }

    /**
     * Returns the offset operation of the point
     *
     * @param x
     * @param y
     * @returns {latte.Point}
     */
    offset(x: number, y: number): Point{
        return new Point(this.x + x, this.y + y);
    }

    /**
     * Returns a Point with rounded components
     * @returns {latte.Point}
     */
    round(): Point{
        return new Point(Math.round(this.x), Math.round(this.y));
    }

    /**
     * Gets string representation of the point
     * @returns {string}
     */
    toString(): string{
        return sprintf("(%s, %s)", this.x, this.y);
    }

    //endregion

    //region Properties

    /**
     * Gets a value indicating if the Point is the origin
     *
     * @returns {boolean}
     */
    get isOrigin(): boolean {
        return this.x === 0 && this.y === 0;
    }


    /**
     * Gets the x component of the point
     */
    get x(): number {
        return this.getPropertyValue('x', Number, null);
    }

    /**
     * Gets the y component of the point
     */
    get y(): number {
        return this.getPropertyValue('y', Number, null);
    }

    //endregion
}
