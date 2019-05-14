define(["require", "exports", "./Animation"], function (require, exports, Animation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LinearAnimation extends Animation_1.Animation {
        constructor(startValue, endValue, seconds, updater) {
            super(startValue, endValue, seconds, updater);
            this.startValue = startValue;
            this.endValue = endValue;
            this.seconds = seconds;
            this.updater = updater;
            this.distance = this.endValue - this.startValue;
            this.speed = this.distance / (this.seconds * 1000);
            this.start();
        }
        getValue() {
            const time = this.getTime() - this.startTime;
            return this.startValue + this.speed * time;
        }
    }
    exports.LinearAnimation = LinearAnimation;
});
//# sourceMappingURL=LinearAnimation.js.map