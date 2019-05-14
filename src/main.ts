import {Viewport} from "./render/Viewport";
import {Game} from "./game/Game";
import {SeCaeSingle} from "./secae/SeCaeSingle";

export const run = () => {

    const game: Game = new SeCaeSingle(Viewport.byCanvasId("viewport"));
    game.play();

};

