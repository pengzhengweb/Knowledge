function shallowClone(origin, target) {
    var target = target || {};
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (typeof(origin[prop] !== "null") && typeof(origin[prop] == "object")) {

                deepClone(origin[prop], target[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}