import { workerData, parentPort } from 'worker_threads'



// parentPort.postMessage(sleep(WorkerData.ms))

// function sleep(ms) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms,"done");
//     });
// }



parentPort.postMessage(getFibonacciNumber(workerData.num))

function getFibonacciNumber(num) {
    if (num === 0) {
        return 0;
    }
    else if (num === 1) {
        return 1;
    }
    else {
        return getFibonacciNumber(num - 1) + getFibonacciNumber(num - 2);
    }
}