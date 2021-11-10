import {Worker, isMainThread, parentPort, workerData} from "worker_threads"
import pullData from './data/Arknights.js';
import utils from "./Utils.js";
import Constants from "./Constants.js"
import stdout from "./Stdout.js";
export default class pull {
    colorMap = Constants.COLOR_MAP;
    pullResults = [];
    async start() {
        console.clear();
        for (let i = 0; i < 10; i++) {
            let result = this.doPull();
            await this.showLoading(1000);
            this.showResult(result);
        }
    }

    doPull() {
        let index = utils.random(0,pullData.length-1);
        return pullData[index];        
    }

    async showLoading(ms) {
        const {colorMap} = this;
        const that = this;
        const worker = new Worker("./Sleep.js",{workerData:{ms:ms}});
        let done = false;
        worker.once("message",(msg) => {
            if (msg !== "done") process.exit();
            done = true;
        })
        worker.on("error", error => {
            console.log(error);
        })
        let tickId = setTimeout(function load() {
            if (done) {
                clearTimeout(tickId);
                return ;
            }
            stdout.cursorTo(utils.bytes(that.pullResults.map(x=>x[0]).join(", ")));
            let obj = pullData[utils.random(0,pullData.length-1)];
            let name = obj[0];
            while (utils.bytes(name) != 10) name += " ";
            stdout.write(" "+ colorMap[obj[1]](name));
            tickId = setTimeout(load,40)
          }, 40);
        await utils.sleep(ms);
    }
    showResult(result) {
        const {colorMap} = this;
        if (!!result){
            this.pullResults.push(result);
        }
        stdout.clear();
        stdout.write(this.pullResults.map(x=> colorMap[x[1]](x[0])).join(', '));
    }
    
}