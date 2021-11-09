import { readFile } from 'fs/promises';
const json = JSON.parse(
  await readFile(
    new URL('../data/Arknights.json', import.meta.url)
  )
);
let result = Object.values(json).filter(x=> !x.subProfessionId.includes("notchar") && !x.isNotObtainable).map(x=>[x.name,x.rarity])
// console.log(result);

export default result;