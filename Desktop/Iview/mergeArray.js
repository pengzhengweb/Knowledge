var mergeArray = function(arr1, arr2) {
    var index1 = 0;
    var index2 = 0;
    var result = [];
    var len1 = arr1.length;
    var len2 = arr2.length;
    while (index1 < len1 && index2 < len2) {
        if (arr1[index1] <= arr2[index2]) {
            result.push(arr1.slice(index1, index1 + 1)[0]);
            index1++;
        } else {
            result.push(arr2.slice(index2, index2 + 1)[0]);
            index2++;
        }
    }
    while (index1 < len1) {
        result.push(arr1.slice(index1, index1 + 1)[0]);
        index1++;
    }
    while (index2 < len2) {
        result.push(arr2.slice(index2, index2 + 1)[0]);
        index2++;
    }
    console.log(result);
    return result;
};
mergeArray([1, 23, 56, 79, 100], [1, 2, 6, 7, 9, 24, 57, 80, 120]);