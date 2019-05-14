/**
 * Gives an object property capabilities
 */
import {Eventable} from "./Eventable";

export type PropertyValueType = any;

/**
 * Returns the camel case of the passed string
 * @param {string} s
 * @returns {string}
 * @private
 */
export function _camelCase(s: string): string{

    let nextUpper = true;
    let result = "";
    let skip = false;


    if(s == null) {
        s = '';
    }

    s = String(s);

    if(s.length == 0) {
        return s;
    }

    for(let i = 0; i < s.length; i++){
        if(skip) {
            skip = false;
            nextUpper = true;
            continue;
        }else if(nextUpper) {
            nextUpper = false;
            result += s.charAt(i).toUpperCase();
            continue;
        }else{
            result += s.charAt(i);
        }

        if(i < s.length - 1) {
            let chr = s.charAt(i + 1);

            if(chr == ' ' || chr == '_') {
                skip = true;
            }
        }

    }

    return result;
}

/**
 * Data passed on the didSet (property value) events
 */
export interface DidSet{
    property: string;
    oldValue: any;
    newValue: any;
}

/**
 * Data passed on the willSet (property value) events
 */
export interface WillSet extends DidSet{}

export class Any{}// (...any: any[]) => any | Function;

/**
 * Options that may be applied to the <c>setPropertyValue</c> method
 */
export interface SetPropertyOptions{
    silent?: boolean;
}

export class PropertyTarget extends Eventable{

    //region Static

    private static staticProperties: PropertyTarget;

    private static getStaticObject(eventObj: any): PropertyTarget{
        if(!('staticProperties' in eventObj)) {
            eventObj.staticProperties = new PropertyTarget();
        }
        return eventObj.staticProperties;
    }

    static getStaticPropertyValue(classObj: any, name: string, validator: PropertyValueType, withDefault: any = undefined): any{
        return PropertyTarget.getStaticObject(classObj).getPropertyValue(name, validator, withDefault);
    }

    static hasStaticPropertyValue(className: any, name: string): boolean{
        return PropertyTarget.getStaticObject(className).hasPropertyValue(name);
    }

    static setStaticPropertyValue<T>(className: any, name: string, validator: PropertyValueType, value: T, options: SetPropertyOptions = {}): T{
        return PropertyTarget.getStaticObject(className).setPropertyValue(name, value, validator, options);
    }

    static getStaticLazyProperty<T>(className: any, name: string, validator: PropertyValueType, creator: () => T): T{
        return PropertyTarget.getStaticObject(className).getLazyProperty(name, validator, creator);
    }

    //endregion

    //region Private
    private propertyValues: {[name: string]: any} = {};
    //endregion

    //region Protected Methods

    /**
     * Called before changing the value of a property
     * @param {latte.WillSet} e
     */
    protected willSet(e: WillSet){
        this.raise('willSet' + _camelCase(e.property), e);
    }

    /**
     * Called after chaning the value of a property
     * @param {latte.DidSet} e
     */
    protected didSet(e: DidSet){
        this.raise('didSet' + _camelCase(e.property), e);
    }

    protected valid<T>(value: T, validator: PropertyValueType): boolean{

        if(validator === null) {
            // HACK: this should not be possible.
            return true;
        }

        if(validator === (Number as any)) {
            return "number" === (typeof value);

        }else if(validator === Boolean) {
            return "boolean" === (typeof value);

        }else if(validator === String) {
            return "string" === (typeof value);

        }else if(validator === Any){
            return true;

        }else{
            return value instanceof validator;
        }


        return true;
    }

    //endregion

    //region Methods

    /**
     * Deletes any value related to the property as it never was registered.
     * @param {string} name
     */
    protected deleteProperty(name: string){
        if(name in this.propertyValues) {
            delete this.propertyValues[name];
        }
    }

    /**
     * Gets the value of a property
     * @param {string} name
     * @param withDefault
     * @returns {any}
     */
    protected getPropertyValue(name: string, validator: PropertyValueType, withDefault: any):any{
        if(!(name in this.propertyValues)) {
            this.propertyValues[name] = withDefault;
        }
        return this.propertyValues[name];
    }

    /**
     * Gets a property in a lazy fashion
     * @param {string} name
     * @param {() => T} creator
     * @returns {T}
     */
    protected getLazyProperty<T>(name: string, validator: PropertyValueType, creator: () => T): T{
        if(!(name in this.propertyValues)) {
            this.propertyValues[name] = creator();
        }
        return this.getPropertyValue(name, validator, undefined);
    }

    /**
     * Returns a value indicating if there is a value for the specified property
     * @param {string} name
     * @returns {boolean}
     */
    protected hasPropertyValue(name: string): boolean{
        return name in this.propertyValues;
    }

    /**
     * Sets the value of a property
     * @param {string} name
     * @param value
     */
    protected setPropertyValue<T>(name: string, value: T, validator: PropertyValueType,
                                  options: SetPropertyOptions = {}): T{

        let oldValue = this.getPropertyValue(name, validator, undefined);
        let data = {
            property: name,
            oldValue: oldValue,
            newValue: value
        };

        // Let people know this will change
        this.willSet(data);

        // Check if a true change was done
        let changed = oldValue !== data.newValue;

        if(!this.valid(data.newValue, validator)){
            throw "Invalid property value";
        }

        // Only change if different value
        if(changed) {

            // Actually change the value
            this.propertyValues[name] = data.newValue;

            // Let people know
            if(options.silent !== true) {
                this.didSet(data);
            }
        }

        return value;
    }
    protected setPropertyUnsafe<T>(name: string, value: T): T{
        this.propertyValues[name] = value;
        return value;
    }

    /**
     * Sets the values of more than one property
     * @param {{[name: string]: any}} values
     * @returns {this}
     */
    protected setPropertyValues(values: {[name: string]: any}): this{
        for(let i in values){
            this.setPropertyValue(i, values[i], null);
        }
        return this;
    }

    //endregion

}