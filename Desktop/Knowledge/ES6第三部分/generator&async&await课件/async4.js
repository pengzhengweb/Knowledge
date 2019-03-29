const fs = require('fs');

//简单封装  fs封装成一个promise
const readFile = function (fileName){
    return new Promise((resolve, reject) =>{
        fs.readFile(fileName, (err, data) =>{
            if(err) reject(err);
            resolve(data);
        });
    });
}


//async
async function fn(){
    let [a,b,c] = await Promise.all([
        readFile('data/a.txt'),
        readFile('data/b.txt'),
        readFile('data/c.txt'),
    ]);

    console.log(a.toString());
    console.log(b.toString());
    console.log(c.toString());
}
fn();
