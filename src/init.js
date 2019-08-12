/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-09 14:08:37
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-12 17:12:03
 * Description: 模板 init 
 */
import { downloadLocal } from './utils/get';
import ora from 'ora'; // loading 动画
import inquirer from 'inquirer'; // 向用户提出问题，接收用户的输入并作出相应的处理
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';

/**
 * 下载模板
 * @param {string} templateName 哪个模板项目
 * @param {string} projectName 模板的文件夹名
 */
let init = async (projectName) => {
    //项目不存在
    if (!fs.existsSync(projectName)) {
        //命令行交互
        // 更多示例：https://blog.csdn.net/qq_26733915/article/details/80461257
        inquirer.prompt([
            {
                type: 'checkbox',
                message: '这是message', // title
                name: 'checkboxList', // key
                choices: [
                    new inquirer.Separator(' = 自定义分隔符 = '),    // 可以自定义分隔符
                    {
                        name: 'Router', // 选项
                        checked: true // 默认选中
                    },
                    {
                        name: 'Vuex',
                    },
                    {
                        name: 'TypeScript'
                    },
                    new inquirer.Separator(' = 又是一个分隔符 ='),
                    {
                        name: 'axios'
                    },
                    {
                        name: 'ESLint'
                    },
                    {
                        name: 'CSS预处理器' // 选择css预处理器
                    }
                ],
                validate(answer) {
                    if (answer.length < 1) {
                        return '你必须至少选择一个.';
                    }
                    return true;
                }
            },
            {
                type: 'list',
                name: 'cssValue',
                message: '你选择哪个Css预处理器？',
                choices: [
                    new inquirer.Separator('在你选了CSS预处理器才有该选项'),
                    'SCSS/SASS',
                    'LESS'
                ],
                // 当选了某个选项后 才显示这个
                when: (answer) => {
                    let checkboxList = answer.checkboxList
                    return checkboxList.includes('CSS预处理器')
                }
            },
            {
                type: 'rawlist',
                name: 'eslintValue',                  // answer的key
                message: '选择Eslint代码验证规则',
                choices: [
                    'ESLint + Airbnb config',
                    'ESLint + Standard config',
                    'ESLint + Prettier'
                ]
            },
            {
                name: 'description',
                message: '请输入项目描述: '
            },
            {
                name: 'author',
                message: '输入作者名: '
            }
        ]).then(async (answer) => {
            console.log('你的选项：', answer) // 根据选项对项目进行操作
            //下载模板 选择模板
            //通过配置文件，获取模板信息
            let loading = ora('下载模板 ...');
            loading.start();
            downloadLocal(projectName).then((res) => {
                // 下载完成 do something
                loading.succeed();
                // const fileName = `${projectName}/package.json`;
                // // 修改package.json
                // if (fs.existsSync(fileName)) {
                //     const data = fs.readFileSync(fileName).toString();
                //     let json = JSON.parse(data);
                //     json.name = projectName;
                //     json.author = answer.author;
                //     json.description = answer.description;
                //     //修改项目文件夹中 package.json 文件
                //     fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                //     console.log(symbol.success, chalk.green('项目初始化完成!'));
                // }
            }, (err) => {
                // console.log('报错：', err)
                loading.fail();
            });
        });
    } else {
        //项目已经存在
        console.log(symbol.error, chalk.red('The project already exists'));
    }
}

module.exports = init;