import {Worker, isMainThread, parentPort, workerData} from "worker_threads"
import pullData from './data/Arknights.js';
import utils from "./Utils.js";
import Constants from "./Constants.js"
import stdout from "./Stdout.js";
import Arknights from "./algorithms/Arknights.js";
export default class pull {
    colorMap = Constants.COLOR_MAP;
    cost = 0;
    count = 0;
    pullResults = [];
    async start() {
        
        this.reset();
        this.cost += 6400;
        for (let i = 0; i < 10; i++) {
            let result = this.doPull();
            await this.showLoading(200);
            this.showResult(result);
        }
    }

    reset() {
        stdout.clear();
        this.pullResults = [];
    }

    doPull() {
        return Arknights.pullOne(this.count++);
    }

    async showLoading(ms) {
        const {colorMap} = this;
        const that = this;
        const worker = new Worker("./Sleep.js",{workerData:{ms:ms-40}});
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
            stdout.cursorTo(utils.bytes(that.pullResults.map(x=>x.name).join(", ")));
            let obj = pullData["all"][utils.random(0,pullData["all"].length-1)];
            let name = obj.name;
            while (utils.bytes(name) != 10) name += " ";
            stdout.write(" "+ colorMap[obj.rarity](name));
            tickId = setTimeout(load,40)
          }, 40);
        await utils.sleep(ms);
    }
    showResult(result) {
        if (!!result){
            this.pullResults.push(result);
        }
        stdout.clear();
        stdout.write(this.semanticsResult());
    }

    semanticsResult(result = this.pullResults) {
        const {colorMap} = this;
        return result.map(x=> colorMap[x.rarity](x.name)).join(', ');
    }
    
}