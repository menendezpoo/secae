import {Viewport} from "../render/Viewport";

export abstract class Game {

    constructor(readonly viewport: Viewport) {
        this.init();
    }

    abstract init(): void;

    play() {
        this.viewport.start();
    }

    stop() {
        this.viewport.stop();
    }
}
