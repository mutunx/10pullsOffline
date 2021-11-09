import {Worker} from "worker_threads";
import chalk from 'chalk';
import loadingContents  from "./printJson.js";
let number = 42;
const worker = new Worker("./work.js", {workerData: {num: number}});
let aa = "";
worker.once("message", result => {
    console.log(`${number}th Fibonacci No: ${result}`);
    aa = result;
});
worker.on("error", error => {
    console.log(error);
});

worker.on("exit", exitCode => {
    console.log(`It exited with code ${exitCode}`);
})
const colorMap = {
    0: v=> chalk.white(v),
    1: v=> chalk.green(v),
    2: v=> chalk.blue(v),
    3: v=> chalk.magenta(v),
    4: v=> chalk.yellow(v),
    5: v=> chalk.red(v),
}
console.log("Execution in main thread");
let index = 0;
let flag = true;
setInterval(function() {
    if (index === loadingContents.length-1) index = 0;
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);  // move cursor to beginning of line
    let obj = loadingContents[index++];
    process.stdout.write(colorMap[obj[1]](obj[0]));  // write text
    if (aa !="") clearInterval(this);
  }, 120);

  
// while (flag) {
//     if (index === loadingContents.length-1) index = 0;
//     // console.clear();
//     // console.log(loadingContents[index++]);
//     setInterval(function() {
//         process.stdout.clearLine();  // clear current text
//         process.stdout.cursorTo(0);  // move cursor to beginning of line
//         process.stdout.write(loadingContents[index++]);  // write text
//       }, 300);
//     if (aa !="") flag = false;
//     // await sleep(100);
// }
console.log(aa)
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms,"done");
    });
}