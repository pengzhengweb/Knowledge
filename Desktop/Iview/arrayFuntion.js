//实现数组的map方法
Array.prototype.newMap = function(fn) {
    var newArr = [];
    for (var i = 0; i < this.length; i++) {
        newArr.push(fn(this[i], i, this))
    }
    return newArr;
}
var arr = [1, 2, 3, 4];
arr.newMap(item => item + 1);

// Array.prototype.newwMap = function(fn) {
//     this.reduce((perv, curr, i, this) => perv.push(fn(curr, i, this)), []);
// }
// var arr = [1, 2, 3, 4];
// arr.newMap(item => item + 1);

//filter
Array.prototype.newfilter = function(fn) {
    var newArr = [];
    for (var i = 0; i < this.length; i++) {
        if (fn(this[i], i, this)) {
            newArr.push(this[i]);
        }
    }
    return newArr;
}
var arr = [1, 2, 3, 4];
arr.newfilter(item => item < 3);

//reduce
Array.prototype.newReduce = function(fn, initValue) {
    var result = initValue || this[0];
    var indexF = initValue ? 0 : 1;
    for (var i = indexF; i < this.length; i++) {
        const curr = this[i];
        result = fn(result, curr, i, this);
    }
    return result;
}
var arr = [1, 2, 3, 4];
arr.newReduce(((perv, curr, index, array) => perv + curr), 9);