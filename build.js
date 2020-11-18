/**
 * @description let Mobilebone can be improted by ES6 export/import
 * @author zhangxinxu(.com) on 2020-11-18
 */

const fs = require('fs');
const fsPromises = fs.promises;

async function createFolder (path) {
    let result = await fsPromises.stat(path).catch(err => {
        if (err.code === "ENOENT") {
            return fsPromises.mkdir(path);
        }
        throw err;
    });

    if (result === false) {
        return fsPromises.mkdir(path);
    }

    return result;
}

// 文件创建
async function buildFiles () {
    await createFolder('./dist');

    // JS文件的处理
    fsPromises.readFile('./src/mobilebone.js', 'utf-8').then((data) => {
        // data就是文件字符内容，进行替换
        let newData = data.replace(/\(function\(root, factory\)[\w\W]+\)\), /, `const Mobilebone = (`).replace(/;\s*$/, `(self, {});

export default Mobilebone;
        `);
        // 重新写入文件
        fs.writeFile('./dist/mobilebone.js', newData, () => {
            console.log('./dist/mobilebone.js生成成功');
        });
    })

    // css文件的处理
    fsPromises.copyFile('./src/mobilebone.css', './dist/mobilebone.css')
        .then(() => console.log('./dist/mobilebone.css生成成功'))
        .catch((err) => console.log('./src/mobilebone.css无法复制，原因是：' + err));
};

buildFiles();

