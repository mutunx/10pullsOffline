import {Worker, isMainThread, parentPort, workerData} from "worker_threads"
export default class pull {
    testval = [1,2,3,4,5,6,7,8,9,10]
    


    async start() {
        console.clear();
        let result = this.doPull();
        await this.showLoading(2000);
        this.showResult(result);
    }

    doPull() {
        // let index = getRandomNumber();
        return this.testval[6];        
    }

    async showLoading(ms) {
        const worker = new Worker("./work.js");
        let done = true;
        worker.postMessage(ms)
        worker.once("message",(msg) => {
            console.log(msg)
            if (msg !== "done") process.exit();
            done = false;
        })
        worker.on("error", error => {
            console.log(error);
        })
        let index = 0;
        // while(done) {
            
        //     if (index === this.testval.length - 1) index = 0;
        //     console.log(this.testval[index++]);
        //     await this.sleep(1000);
        // }
        await this.sleep(5000);
    }
    showResult(result) {
        console.log(result);
    }
    sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    }
}