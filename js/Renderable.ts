import {Viewport} from "../src/Viewport";

export class Renderable{

    suspended: boolean = false;
    paused: boolean = false;

    onUpdate(){

    }

    onDraw(viewport: Viewport){

    }

    update(){
        if(!this.paused) {
            this.onUpdate();
        }
    }

    draw(viewport: Viewport){
        if(!this.suspended) {
            this.onDraw(viewport);
        }
    }

}