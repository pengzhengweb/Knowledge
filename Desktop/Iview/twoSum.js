var twoSum = function(nums, target) {
    var arr = nums;
    var result = [];
    nums.forEach((item, i1) => {
        arr.forEach((j, i2) => {
            if (i1 !== i2 && (item + j == target)) {
                result.push(i1);
                result.push(i2);
            }
        })

    })
    return Array.from(new Set(result));

};
twoSum([2, 7, 11, 15], 9);