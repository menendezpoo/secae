import {Logger} from "../util/Logger";
import {Eventable} from "./Eventable";

export abstract class Animation extends Eventable{

    readonly startTime: number;
    readonly endTime: number;

    started = false;
    ended = false;
    running = false;
    value = 0;

    constructor(readonly startValue: number,
                readonly endValue: number,
                readonly seconds: number,
                readonly updater: (value: number) => any){
        super();
        this.startTime = this.getTime();
        this.endTime = this.startTime + this.seconds * 1000;
    }

    getTime(): number{
        return window.performance.now();
    }

    start(){
        Logger.time(`Anim`);
        this.started = true;
        this.running = true;
    }

    end(){
        Logger.timeEnd(`Anim`);
        this.ended = true;
        this.running = false;
        this.raise('finish');
    }

    update(){

        if(!this.running) {
            return;
        }

        if(this.getTime() >= this.endTime) {
            this.value = this.endValue;
            this.end();
        }else{
            this.value = this.getValue();
        }

        this.updater(this.value);

    }

    abstract getValue(): number;

}