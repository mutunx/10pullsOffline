import chalk from 'chalk';
import inquirer from 'inquirer'
import pull from './pull.js'


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

function initMessage() {
    
    questions.message = "What size do you need?"
}

async function pulls() {
    let pullObj = new pull();
    pullObj.start();
}

function statistic() {
    console.log("statistic");
}

function quit() {
    console.log("quit")
}


initMessage();
inquirer
    .prompt(questions)
    .then((answer) => {
        choicesMapMethod[answer.type]();
    })
