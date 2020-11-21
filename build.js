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

// create ./dist folder
async function buildFiles () {
    await createFolder('./dist');

    // make mobilebone.js can be used by ES6 module
    fsPromises.readFile('./src/mobilebone.js', 'utf-8').then((data) => {
        // replace data
        let newData = data.replace(/\(function\(root, factory\)[\w\W]+\)\), /, `const Mobilebone = (`).replace(/;\s*$/, `(self, {});

export default Mobilebone;
        `);
        // write mobilebone.esm.js
        fs.writeFile('./dist/mobilebone.esm.js', newData, () => {
            console.log('./dist/mobilebone.esm.js生成成功');
        });
    })

    // copy mobilebone.js
    fsPromises.copyFile('./src/mobilebone.js', './dist/mobilebone.js')
        .then(() => console.log('./dist/mobilebone.js复制成功'))
        .catch((err) => console.log('./src/mobilebone.js无法复制，原因是：' + err));

    // copy mobilebone.css
    fsPromises.copyFile('./src/mobilebone.css', './dist/mobilebone.css')
        .then(() => console.log('./dist/mobilebone.css复制成功'))
        .catch((err) => console.log('./src/mobilebone.css无法复制，原因是：' + err));
};

buildFiles();

// 文件压缩，需要先安装uglifyjs： npm install uglify-js -g
const { exec } = require('child_process');
exec('uglifyjs ./src/mobilebone.js -m -o ./dist/mobilebone.min.js', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('success min js file to ./dist/mobilebone.min.js');
});


