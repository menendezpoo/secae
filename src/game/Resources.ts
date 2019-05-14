export class Resources {

    static png(name: string){
        return `/secae/res/imgs/${name}.png`;
    }

    static pngImage(name: string): HTMLImageElement{
        const img = document.createElement('img');
        img.src = Resources.png(name);
        return img;
    }

    private static _imgBuffer: { [index: string]: HTMLImageElement} = {};

    static imgBuffer(name: string): HTMLImageElement{
        if(!(name in Resources._imgBuffer)) {
            Resources._imgBuffer[name] = Resources.pngImage(name);
        }
        return Resources._imgBuffer[name];
    }

    static get lightOn(): HTMLImageElement{
        return Resources.imgBuffer('light-on')
    }

    static get lightOff(): HTMLImageElement{
        return Resources.imgBuffer('light-off')
    }

    static get cloud1(): HTMLImageElement{
        return Resources.imgBuffer('cloud1')
    }

    static get cloud2(): HTMLImageElement{
        return Resources.imgBuffer('cloud2')
    }

}