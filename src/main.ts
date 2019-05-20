import {Viewport} from "./render/Viewport";
import {Game} from "./game/Game";
import {SeCaeSingle} from "./secae/SeCaeSingle";
import {Resources} from "./game/Resources";
import {Logger} from "./util/Logger";

async function loadResources() {
    return new Promise((resolve, reject) => {

        const images: HTMLImageElement[] = [];
        const names = Object.getOwnPropertyNames(Resources);
        let loaded = 0;
        let scanned = false;
        let resolved = false;

        const loadCheck = () => {

            if(++loaded === images.length && scanned) {
                Logger.info(`resolve from loadCheck`);
                resolved = true;
                resolve();
            }

            Logger.info(`Loaded: ${loaded}`);

        };

        for(let name of names){
            const result = (Resources as any)[name];

            if(result instanceof HTMLImageElement) {
                images.push(result);
                result.addEventListener('load', () => loadCheck());
                result.addEventListener('error', () => reject());
            }
        }

        scanned = true;

        if(loaded === images.length && !resolved) {
            Logger.info(`resolve from end`);
            resolve();
        }

    });
}

export const run = () => {

    // for(let member in Resources){
    //     console.log(`${member}`);
    // }

    loadResources().then(() => {
        const game: Game = new SeCaeSingle(Viewport.byCanvasId("viewport"));
        game.play();
    });




};

