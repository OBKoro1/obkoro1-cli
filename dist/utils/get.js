'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.downloadLocal = undefined;

var _rc = require('./rc');

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-09 14:08:37
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-12 15:00:01
 * Description: 从远程下载模板
 */
// download-git-repo 支持从 Github、Gitlab 下载远程仓库到本地
const downloadLocal = exports.downloadLocal = async projectName => {
    // download-git-repo 下载仓库
    // GitHub - github: owner / name or simply owner / name
    // GitLab - gitlab: owner / name
    // Bitbucket - bitbucket: owner / name
    let config = await (0, _rc.getAll)();
    let repoSite = `${config.registry}/${config.templateName}`;
    console.log('repoSite', repoSite, projectName);
    return new Promise((resolve, reject) => {
        // downloadGit 下载命令行
        (0, _downloadGitRepo2.default)(repoSite, projectName, err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};