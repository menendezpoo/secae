export class ResLoader {
    private static png(name: string){
        if(String(document.location).indexOf('localhost') >= 0) {
            return `/secae/res/imgs/${name}.png`;
        }else{
            return `/res/imgs/${name}.png`;
        }

    }

    static pngImage(name: string): HTMLImageElement{
        const img = document.createElement('img');
        img.src = ResLoader.png(name);
        return img;
    }

    private static _imgBuffer: { [index: string]: HTMLImageElement} = {};

    static imgBuffer(name: string): HTMLImageElement{
        if(!(name in ResLoader._imgBuffer)) {
            ResLoader._imgBuffer[name] = ResLoader.pngImage(name);
        }
        return ResLoader._imgBuffer[name];
    }
}