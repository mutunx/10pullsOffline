import inquirer from 'inquirer'
import http from './http.js';
import pull from './Pull.js'
import Constants from './Constants.js';
import Utils from './Utils.js';

const pullObj = new pull();;
const choicesMapMethod = {
    "抽!":pulls,
    "统计":statistic,
    "重置":reset,
    "退出":quit,
}

const questions = {
    type: 'list',
    name: 'type',
    message: '',
    choices: Object.keys(choicesMapMethod),
    filter(val) {
        return val.toLowerCase();
    },
}

async function initMessage() {
    questions.message = await getTody();
    menu();
}

async function pulls() {
    
    await pullObj.start();
    const answer = await inquirer.prompt([{
        type: 'list',
        name: 'continue',
        choices: ["继续","回主菜单"],
        message: `\n已花费RMB${(pullObj.cost/180*6).toFixed(2)}是否继续？`
      }]);
    return (answer.continue === "继续") ? pulls() : menu();

}
async function getTody() {
    let res = await http.Get("http://timor.tech/api/holiday/info");
    if (!!!res.data) return "你没联网";
        let obj = res.data;
        if (obj.code === -1) return "接口服务器出错";
        let dayName = obj.type.name;
        let workType = ([0,3].includes(obj.type.type)) ? "上班":"加班";
        let result = `今天是${dayName},${workType}的你惨兮兮`;
        if (obj.holiday && obj.holiday.holiday) {
            result += ",不过按道理来说你今天可以拿到${obj.wage}倍工资"
        }
        return result;
}
async function statistic() {
    console.log(pullObj.history.map(x=>x.map(y => Constants.COLOR_MAP[y.rarity](y.name))).join("\n"));
    
    let staticInfo = [0,1,2,3,4,5].map(x=> getStatisticInfo(pullObj.history.flat(),x)).join(" ");
    let cost = pullObj.cost;
    staticInfo += `总共${pullObj.count}抽,花费${cost}合成玉约合人民币${(cost/180*6).toFixed(2)}元`;
    
    console.log(staticInfo);
    const answer = await inquirer.prompt([{
        type: 'list',
        name: 'continue',
        choices: ["回主菜单"],
        message: ""
      }]);
    if (answer.continue === "回主菜单") {
        menu();
    }
}

function getStatisticInfo(data,rarity) {
    let rarityCount = data.filter(x=>x.rarity === rarity).length ?? 0;
    let rarityProbability = (rarityCount / data.length * 100).toFixed(2) ;
    let statisticInfo = `${rarity+1} ★ :${rarityCount}(${rarityProbability}%) `;
    return Constants.COLOR_MAP[rarity](statisticInfo)
}

function quit() {
    process.exit();
}

async function reset() {
    pullObj.history = [];
    pullObj.count = 1;
    pullObj.cost = 0;
    const answer = await inquirer.prompt([{
        type: 'list',
        name: 'continue',
        choices: ["回主菜单"],
        message: "重置成功"
      }]);
    if (answer.continue === "回主菜单") {
        menu();
    }
}
initMessage();

function menu() {
    inquirer
    .prompt(questions)
    .then((answer) => {
        choicesMapMethod[answer.type]();
    })
}
