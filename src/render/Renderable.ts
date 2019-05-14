import {Viewport} from "./Viewport";
import {UpdateInfo} from "./UpdateInfo";

export abstract class Renderable{

    suspended: boolean = false;
    paused: boolean = false;

    update(info: UpdateInfo){

    }

    draw(viewport: Viewport){

    }

    getTime(): number{
        return window.performance.now();
    }

    wait(seconds: number): Promise<void>{
        return new Promise<void>(resolve => setTimeout(() => resolve(), seconds * 1000));
    }

}