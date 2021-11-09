import { workerData, parentPort } from 'worker_threads'

// console.log(workerData)


// parentPort.once("message",message => {
//     console.log("sdfsd",message)
//     await sleep(message);
//     parentPort.postMessage("done");
// })

function sleep ( n ) { 
    var start = new Date().getTime() ;
    while ( true ) {
        if ( new Date( ).getTime( ) - start > n ) {
            // 使用  break  实现；
            break;
        }
    }
}



parentPort.postMessage(getFibonacciNumber(workerData.num))

function getFibonacciNumber(num) {
    sleep(50000);
    return "done";
}