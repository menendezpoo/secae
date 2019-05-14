import {SeCaeSingleScene} from "./SeCaeSingleScene";
import {Game} from "../game/Game";
import {Logger} from "../util/Logger";
import {SkyScene} from "./SkyScene";

export class SeCaeSingle extends Game{

    private sky: SkyScene;
    private mainScene: SeCaeSingleScene;

    init(): void {

        this.sky = new SkyScene();
        this.mainScene = new SeCaeSingleScene();

        this.viewport.scenes.push(this.sky);
        this.viewport.scenes.push(this.mainScene);

        const sendSignalToSignal = () => {
            if(!this.mainScene.signal.blocked) {
                Logger.info(`Passing signal`);
                if(this.mainScene.signal.lifted) {
                    this.mainScene.signal.drop();
                }else{
                    this.mainScene.signal.lift();
                }
            }
        };

        this.viewport.canvas.addEventListener('click', e => sendSignalToSignal());
        document.body.addEventListener('keypress', e => {
            if(e.key === 'Return') sendSignalToSignal()
        });
    }

}