import { workerData, parentPort } from 'worker_threads'

function sleep ( n ) { 
    var start = new Date().getTime() ;
    while ( true ) {
        if ( new Date( ).getTime( ) - start > n ) {
            break;
        }
    }
}

parentPort.postMessage(doSleep(workerData.ms))

function doSleep(ms) {
    sleep(ms);
    return "done";
}