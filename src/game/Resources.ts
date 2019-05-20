import {ResLoader} from "./ResLoader";

export class Resources {

    static get arm(): HTMLImageElement{
        return ResLoader.imgBuffer('arm')
    }

    static get cross(): HTMLImageElement{
        return ResLoader.imgBuffer('cross')
    }

    static get lightOn(): HTMLImageElement{
        return ResLoader.imgBuffer('light-on')
    }

    static get lightOff(): HTMLImageElement{
        return ResLoader.imgBuffer('light-off')
    }

    static get lightSupport(): HTMLImageElement{
        return ResLoader.imgBuffer('light-support')
    }

    static get cloud1(): HTMLImageElement{
        return ResLoader.imgBuffer('cloud1')
    }

    static get cloud2(): HTMLImageElement{
        return ResLoader.imgBuffer('cloud2')
    }

    static get post(): HTMLImageElement{
        return ResLoader.imgBuffer('post')
    }

}