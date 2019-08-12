/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-09 14:08:37
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-12 15:02:31
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
        inquirer.prompt([
            {
                type: 'checkbox',
                message: '这是message',
                name: '名字',
                choices: [
                    new inquirer.Separator(' = 可以自定义分隔符 = '),    // 可以自定义分隔符
                    {
                        name: 'Mozzarella',
                        checked: true                                 // 表示默认选中项
                    },
                    {
                        name: 'Cheddar'
                    },
                    {
                        name: 'Parmesan'
                    },
                    new inquirer.Separator(' = The usual ='),
                    {
                        name: 'Mushroom'
                    },
                    {
                        name: 'Tomato',
                        disabled: 'out of stock'                      // 可以设禁用
                    },
                ],
                validate: function (answer) {
                    console.log('answer222', answer)
                    if (answer.length < 1) {
                        return '你必须至少选择一个.';
                    }
                    return true;
                }
            },
            {                                
                type: 'list',
                name: 'theme',                  // answer的key
                message: 'What do you want to do?',
                choices: [
                  'Order a pizza',
                  'Make a reservation',
                  new inquirer.Separator('哈哈哈哈。。。。。'),     // choices里可以有分隔符
                  'Ask for opening hours',
                  {
                    name: 'Contact support',    // 可以是对象，name就是显示的字符串
                    disabled: 'Unavailable at this time'
                  },
                  'Talk to the receptionist'
                ]
              },
              {                                
                type: 'rawlist',
                name: 'theme2',                  // answer的key
                message: 'What do you want to do?',
                choices: [
                  'Order a pizza',
                  'Make a reservation',
                  new inquirer.Separator('啦啦啦啦...'),     // choices里可以有分隔符
                  'Ask for opening hours',
                  {
                    name: 'Contact support',    // 可以是对象，name就是显示的字符串
                    disabled: 'Unavailable at this time'
                  },
                  'Talk to the receptionist'
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