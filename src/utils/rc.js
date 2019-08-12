/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-09 14:08:37
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-12 13:32:56
 * Description: .kororc 文件的增删改查
 */

import { RC, DEFAULTS } from './constants';
import { decode, encode } from 'ini'; // 格式转换
import { promisify } from 'util';
import chalk from 'chalk';
import fs from 'fs';

const exits = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

//RC 是配置文件
//DEFAULTS 是默认的配置
export const get = async (key) => {
    const exit = await exits(RC);
    let opts;
    if (exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        return opts[key];
    }
    return '';
}

export const getAll = async () => {
    const exit = await exits(RC);
    let opts;
    if (exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        return opts;
    }
    return {};
}

export const set = async (key, value) => {
    const exit = await exits(RC);
    let opts;
    let newOption = {}
    if (key && value) {
        newOption = {
            [key]: value
        }
    }

    if (exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        if (!key) {
            console.log(chalk.red(chalk.bold('Error:')), chalk.red('key is required'));
            return;
        }
        if (!value) {
            console.log(chalk.red(chalk.bold('Error:')), chalk.red('value is required'));
            return;
        }
        opts = Object.assign(opts, newOption);
    } else {
        opts = Object.assign(DEFAULTS, newOption);
    }
    // npm install 之后会执行 package的 postinstall的：config set
    // 写文件 没有文件会创建文件
    await writeFile(RC, encode(opts), 'utf8');
}

export const remove = async (key) => {
    const exit = await exits(RC);
    let opts;
    if (exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        delete opts[key];
        await writeFile(RC, encode(opts), 'utf8');
    }
}

