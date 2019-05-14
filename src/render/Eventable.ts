export type EventHandler = (...any: any[]) => any;

/**
 * Base object who supports events
 */
export class Eventable{

    //region Fields
    private eventHandlers: {[name: string]: EventHandler[]} = {};
    //endregion

    //region Methods

    /**
     * Handles an event
     * @param {string} eventName
     * @param {(...any: any[]) => any} handler
     */
    on(eventName: string, handler: EventHandler): this{

        if(!(eventName in this.eventHandlers)) {
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(handler);

        return this;
    }

    /**
     * Override this method to catch events on the current class, before the
     * event chain has been raised.
     * @param eventName
     * @param params
     */
    onBeforeEvent(eventName: string, params: any[]){

    }

    /**
     * Override this method to catch events on the current class, once the
     * event chain has been raised.
     * @param eventName
     * @param params
     */
    onEvent(eventName: string, params: any[]){

    }

    /**
     * Raises an event
     * @param {string} eventName
     * @param params
     */
    raise(eventName: string, ...params: any[]){

        this.onBeforeEvent(eventName, params);

        if(eventName in this.eventHandlers) {
            for(let name in this.eventHandlers) {
                this.eventHandlers[name].forEach( f => f.apply(this, params));
            }
        }

        this.onEvent(eventName, params);

    }

    //endregion

}