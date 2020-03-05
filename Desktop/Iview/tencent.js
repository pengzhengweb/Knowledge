function itemTimes(arr) {
    var result = {};

    for (var i = 0; i < arr.length; i++) {
        var tmp = arr[i];

        if (result[tmp]) {
            result[tmp]++;
        } else {
            result[tmp] = 1;
        }

    }
    return result;
}

var arr = [1, 2, 2, 3, 3, 3, 3, 3, 4];
console.log(itemTimes(arr));