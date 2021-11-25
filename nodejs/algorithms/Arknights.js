import utils from "../Utils.js";
import data from '../data/Arknights.js';

export default class Arknights {
    static rarityProbability = {
        fivePrecent: 8,
        sixPrecent: 2,
    }
    static result = {
        0:[],
        1:[],
        2:[],
        3:[],
        4:[],
        5:[]
    }
    static pull(pullInfo){
        const {result,rarityProbability} = this;
        let {fivePrecent,sixPrecent} = rarityProbability;
        // 50以上
        if (pullInfo.count >= 50 && result[5] == 0) {
            sixPrecent += 2;
        } 
        let num = utils.random(1,100);
        
        let rarity = (num < sixPrecent) ? 5 : (num < fivePrecent) ? 4 : 3;
        if (rarity === 5) {
            sixPrecent = 2;
        }
        // 保底
        if (pullInfo.count == 10 && result[4] == 0 && result[5] == 0) {
            let minimum = utils.random(1,10);
            rarity = (minimum < sixPrecent) ? 5 : 4;
        } 
        let pullRarity = rarity === 3 ? "canBePull":rarity.toString();
        let pullArray = data[pullRarity];
        let obj = pullArray[utils.random(0,pullArray.length-1)];

        // 保存
        result[rarity].push(obj);
        pullInfo.cost += 600;
        pullInfo.count++;
        return obj;
        
    }
    
}