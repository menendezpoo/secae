define(["require", "exports", "./Eventable"], function (require, exports, Eventable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Animation extends Eventable_1.Eventable {
        constructor(startValue, endValue, seconds, updater) {
            super();
            this.startValue = startValue;
            this.endValue = endValue;
            this.seconds = seconds;
            this.updater = updater;
            this.started = false;
            this.ended = false;
            this.running = false;
            this.value = 0;
            this.startTime = this.getTime();
            this.endTime = this.startTime + this.seconds * 1000;
        }
        getTime() {
            return window.performance.now();
        }
        start() {
            this.started = true;
            this.running = true;
        }
        end() {
            this.ended = true;
            this.running = false;
            this.raise('finish');
        }
        update() {
            if (!this.running) {
                return;
            }
            if (this.getTime() >= this.endTime) {
                this.value = this.endValue;
                this.end();
            }
            else {
                this.value = this.getValue();
            }
            this.updater(this.value);
        }
    }
    exports.Animation = Animation;
});
//# sourceMappingURL=Animation.js.map