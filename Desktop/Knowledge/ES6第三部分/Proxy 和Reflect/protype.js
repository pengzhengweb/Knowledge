// const log = console.log.bind(console);
let obj = {};
//let tmp = "asd";


Object.defineProperty(obj,"key",{
    get(){
        return tmp;
    },
    set(value){
        tmp = value + "asdfasdf";

    }
})
 obj.key = "xiaohong";
// tmp = "qwewr";

console.log(obj.key);