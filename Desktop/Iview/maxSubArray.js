var maxSubArray = function(nums) {
    var result = nums[0];
    var tmp = 0;
    for (var i = 0; i < nums.length; i++) {
        tmp += nums[i];
        if (tmp > result) {
            result = tmp;
        }
        if (tmp < 0) {
            tmp = 0;
        }
    }
    console.log(result);
    return result;
};

maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4, 7]);

var maxSubArray = function(nums) {
    var result = nums[0];
    var tmp = 0;
    for (var i = 0; i < nums.length; i++) {
        tmp += nums[i];
        if (tmp > result) {
            result = tmp;
        }
        if (tmp < 0) {
            tmp = 0;
        }
    }
    return result;
}