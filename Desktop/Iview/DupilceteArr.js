var func = function(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                len--;
                j--;
            }
        }
    }
    return arr;
}

var func = function(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) == index;
    })
};
var func = function(arr) {
    var obj = {};
    return arr.filter(item => {
        return obj.hasOwnProperty(item) ? false : obj[item] = true;
    })
};
func([1, 1, 1, 2, 45, 46, 45]);
var func = [...new Set(arr)];