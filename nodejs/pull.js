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
        let time;
        new Promise((resolve) => {
            setTimeout(resolve, ms,"done");
        }).then(() => {
            time = "done";
        })
        let i = 0;
        while(time!== "done") {

            console.clear();
            console.log(this.testval[i++]);
            this.sleep(200);
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