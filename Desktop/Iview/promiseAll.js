function promiseall(promises) {
    return new Promise(function(resolve, reject) {
        if (!isArray(promises)) {
            return reject(new TypeError('arguments must be an array!'));
        }
        var resolveCount = 0;
        var promiseLength = promises.length;
        var resloveValues = new Array(promiseLength);
        for (var i = 0; i < promiseLength; i++) {
            (function(i) {
                Promise.resolve(promise[i]).then(function(value) {
                    resolveCount++;
                    resloveValues[i] = value;
                    if (resolveCount == promiseLength) {
                        return resolve(resloveValues);
                    }
                }, function(reason) {
                    return reject(reason);
                })
            })(i)
        }
    })
}