/*
 * Author: OBKoro1
 * Github: https://github.com/OBKoro1
 * Date: 2019-08-09 14:08:37
 * LastEditors: OBKoro1
 * LastEditTime: 2019-08-15 16:32:54
 * Description: 从远程下载模板
 */
// download-git-repo 支持从 Github、Gitlab 下载远程仓库到本地
import { getAll } from './rc';
import downloadGit from 'download-git-repo';

export const downloadLocal = async (projectName) => {
    // download-git-repo 下载仓库
    // GitHub - github: owner / name or simply owner / name
    // GitLab - gitlab: owner / name
    // Bitbucket - bitbucket: owner / name
    let config = await getAll();
    let repoSite = `${config.registry}/${config.templateName}`;
    console.log('仓库地址、项目名', repoSite, projectName)
    return new Promise((resolve, reject) => {
        // downloadGit 下载命令行
        downloadGit(repoSite, projectName, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}