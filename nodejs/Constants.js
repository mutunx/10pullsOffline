import chalk from 'chalk';

export default class Constants {
    static COLOR_MAP = {
        0: v=> chalk.white(v),
        1: v=> chalk.green(v),
        2: v=> chalk.blue(v),
        3: v=> chalk.magenta(v),
        4: v=> chalk.yellow(v),
        5: v=> chalk.red(v),
    }
}