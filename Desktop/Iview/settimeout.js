// console.log("begin");
// setTimeout(() => {
//         console.log('setTimeout1');
//         Promise.resolve(1).then(() => {
//             console.log('Promise1');
//             setTimeout(() => {
//                 console.log("Promise1 && Promise2");
//             }, 0)
//         }).then(() => {
//             console.log("Promise2");
//         })
//     }, 0)
console.log("end");
//console.log(global);
setTimeout(() => console.log(1), 0);
console.log(2);
new Promise((resolve, reject) => {
    console.log(3);
    setTimeout(() => {
        console.log(6);
        resolve();
    }, 0)

})