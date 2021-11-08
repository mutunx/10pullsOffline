import {Worker, isMainThread, parentPort, workerData} from "worker_threads"
export default class pull {
    testval = [1,2,3,4,5,6,7,8,9,10]
    


    start() {
        console.clear();
        let result = this.doPull();
        this.showLoading(2000);
        this.showResult(result);
    }

    doPull() {
        // let index = getRandomNumber();
        return this.testval[6];        
    }

    async showLoading(ms) {
        const worker = new Worker("./work.js",{WorkerData:{"ms":ms}});
        let done = true;
        if (isMainThread) {
            worker.once("message",(msg) => {
                console.log(msg)
                if (msg !== "done") process.exit();
                done = false;
            })
            let index = 0;
            while(done) {
                if (index === this.testval.length - 1) index = 0;
                console.log(this.testval[index++]);
                this.sleep(2000);
            }
        } 


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