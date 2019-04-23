import {Viewport} from "./Viewport";



window.addEventListener('load', e => {
    let viewport = new Viewport(document.getElementById("viewport") as HTMLCanvasElement);
});