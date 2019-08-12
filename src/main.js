/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-09 15:17:13
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-12 14:36:30
 * Description: 项目入口
 */

import program from 'commander'; // 命令行工具
import { VERSION } from './utils/constants';
import apply from './index';
import chalk from 'chalk';
import symbol from 'log-symbols';

/**
 * koro 命令行配置
 */
let actionMap = {
    init: {
        description: '从模板生成一个新项目',
        usages: [
            '下载的模板名字',
            '文件夹名字'
        ]
    },
    config: {
        alias: 'cfg',
        description: '配置 .kororc',
        usages: [
            'koro 配置设置  <k> <v>',
            'koro 配置获取  <k>',
            'koro 配置删除  <k>'
        ]

    },
    //other commands
}
/**
 * koro命令行 处理/init
 */
Object.keys(actionMap).forEach((action) => {
    let programParams = process.argv.slice(3) // 命令行参数数组
    program.command(action)
        .description(actionMap[action].description)
        .alias(actionMap[action].alias) // 命令别名
        .action(() => {
            // 执行命令的回调
            switch (action) {
                case 'config':
                    //配置
                    apply(action, ...programParams);
                    break;
                case 'init':
                    if (programParams[0]) {
                        apply(action, ...programParams);
                    } else {
                        console.log(symbol.error, chalk.red('项目名是必须的！'));
                    }
                    break;
                default:
                    break;
            }
        });
});

// 帮助信息
function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach((action) => {
        actionMap[action].usages.forEach(usage => {
            console.log('  - ' + usage);
        });
    });
    console.log('\r');
}

// .on 监听事件
program.usage('<command> [options]'); // 帮助信息
program.on('-h', help); // 帮助
program.on('--help', help); // 帮助
// koro -V   VERSION 为 package.json 中的版本号
program.version(VERSION, '-V --version').parse(process.argv); // 查看版本

// koro 不带参数时 即单独输入koro时
if (!process.argv.slice(2).length) {
    program.outputHelp(make_green);
}
function make_green(txt) {
    return chalk.green(txt);
}