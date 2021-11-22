import { readFile } from 'fs/promises';
import utils from '../Utils.js';

const json = JSON.parse(
  await readFile(
    new URL('../../data/Arknights.json', import.meta.url)
  )
);

let data =  json.filter(x=> !x.subProfessionId.includes("notchar") && !x.isNotObtainable);

let result = utils.groupBy(data,"rarity");

let canBePull = [...result["3"]];
canBePull.push(...result["2"]);
canBePull.push(...result["1"]);
result["canBePull"] = canBePull;
result["loading"] = data;
// console.log(Object.keys(result));

export default result;