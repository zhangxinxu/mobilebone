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
            console.log('./dist/mobilebone.esm.js build success!');
        });
    })

    // copy mobilebone.js
    fsPromises.copyFile('./src/mobilebone.js', './dist/mobilebone.js')
        .then(() => console.log('./dist/mobilebone.js copy success!'))
        .catch((err) => console.log('./src/mobilebone.js copy fail: ' + err));

    // copy mobilebone.css
    fsPromises.copyFile('./src/mobilebone.css', './dist/mobilebone.css')
        .then(() => console.log('./dist/mobilebone.css copy success!'))
        .catch((err) => console.log('./src/mobilebone.css copy fail: ' + err));
};

buildFiles();

// min file，you should install uglifyjs first： npm install uglify-js -g
const { exec } = require('child_process');
exec('uglifyjs ./src/mobilebone.js --comments -m -o ./dist/mobilebone.min.js', (err, stdout, stderr) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('success min js file to ./dist/mobilebone.min.js');
});
