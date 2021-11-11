import chalk from 'chalk';
import inquirer from 'inquirer'
import http from './http.js';
import pull from './Pull.js'

const pullObj = new pull();;
const choicesMapMethod = {
    "抽!":pulls,
    "统计":statistic,
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
        type: 'confirm',
        name: 'continue',
        message: `\n已花费cost${pullObj.cost}是否继续？`
      }]);
    return (answer.continue) ? pulls() : menu();

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
    const answer = await inquirer.prompt([{
        type: 'confirm',
        name: 'continue',
        message: pullObj.semanticsResult()
      }]);
    if (answer) {
        menu();
    }
}

function quit() {
    process.exit();
}


initMessage();

function menu() {
    inquirer
    .prompt(questions)
    .then((answer) => {
        choicesMapMethod[answer.type]();
    })
}
