import { readFile } from 'fs/promises';
import utils from '../Utils.js';
const json = JSON.parse(
  await readFile(
    new URL('../../data/Arknights.json', import.meta.url)
  )
);
let data =  json.filter(x=> !x.subProfessionId.includes("notchar") && !x.isNotObtainable);
let result = utils.groupBy(data,"rarity");

let threeBelows = result["3"];
threeBelows.push(...result["2"]);
threeBelows.push(...result["1"]);
threeBelows.push(...result["0"]);
result["3below"] = threeBelows;
result["all"] = data;
// console.log(Object.keys(result));

export default result;