// // 输入: [2,2,1,1,1,2,2]
// // 输出: 2
var majorityElement = function(nums) {
    let result = nums[0],
        count = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] == result) count++;
        else count == 0 ? result = nums[i] : count--;
    }
    console.log(result);
    return result;
};

// var majorityElement = function(nums) {
//     var count = 0;
//     var index = 1;
//     var length = nums.length;
//     var result = nums[0];

//     while (index <= length) {
//         if (nums[index] == result) {
//             count++;
//         } else {
//             if (count == 0) {
//                 result = nums[index];
//             } else {
//                 count--;
//             }
//         }
//         index++
//     }
//     console.log(result);
//     return result;
// };
majorityElement([2, 2, 1, 1, 1, 2, 2]);