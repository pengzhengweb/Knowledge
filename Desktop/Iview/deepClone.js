function deepClone(origin, target) {
    var target = target || {};
    var toStr = Object.prototype.toString();
    var arrStr = "[object Array]";
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (typeof(origin[prop] !== "null") && typeof(origin[prop] == "object")) {
                if (toStr.call(origin[prop]) == arrStr) {
                    target[prop] = [];
                } else {
                    target[prop] = {};
                }
                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}