import {Animation} from "./Animation";

export class LinearAnimation extends Animation{

    speed: number;
    distance: number;

    constructor(readonly startValue: number,
                readonly endValue: number,
                readonly seconds: number,
                readonly updater: (value: number) => any){
        super(startValue, endValue, seconds, updater);
        this.distance = this.endValue - this.startValue;
        this.speed = this.distance / (this.seconds * 1000);
        this.start();

    }


    getValue(): number {
        const time = this.getTime() - this.startTime;
        return this.startValue + this.speed * time;
    }
}