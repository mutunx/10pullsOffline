// 五星出率为 8%
// 六星出率为 2%
// 前十次中必定中五星 “及” 以上的干员
// 在所有〔标准寻访〗中，如果连续50次没有获得6星干员，则下一次获得6星干员的概率将从原本的2％
// 提升至4％。如果该次还没有寻访到6星干员，则下一次寻访获得6星的概率由4％提升到6％。依此类推
// ，每次提高2％获得6星干员的概率，直至达到100％时必定获得6星干员。

import Constants from "./Constants.js"
import utils from "./Utils.js";
import pullData from './data/Arknights.js';
let fivePrecent = 8;
let sixPrecent = 2;
let result = {
    0:0,
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
}
function pull(count,data){
    // 50以上
    if (count >= 50 && result[5] == 0) {
        sixPrecent += 2;
    } 
    let num = utils.random(1,100);
    
    let rarity = (num < sixPrecent) ? 5 : (num < fivePrecent) ? 4 : 3;
    if (rarity === 5) {
        sixPrecent = 2;
    }
    result[rarity+""]++;
    // 保底
    if (count == 10 && result[4] == 0 && result[5] == 0) {
        let minimum = utils.random(1,10);
        rarity = (minimum < sixPrecent) ? 5 : 4;
    } 

    let pullArray = data[""+rarity];
    return pullArray[utils.random(0,pullArray.length-1)];
    
}
let count = 0;
console.clear();
for (var i = 0; i < 100; i++ ){
    if (i % 10 === 0) process.stdout.write("\n")
    let obj = pull(count,pullData);
    let colorMap = Constants.COLOR_MAP;
    process.stdout.write(colorMap[obj["rarity"]](obj["name"])+", ");
}
