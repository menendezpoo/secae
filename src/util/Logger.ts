
export class Logger{

    static info(msg: string){
        console.info(msg);
    }

    static time(lbl: string){
        console.time(lbl)
    }

    static timeEnd(lbl: string){
        console.timeEnd(lbl)
    }

}