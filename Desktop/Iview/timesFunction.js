var func = function(fun, times, interval) {
    //var count = 0;
    for (var i = 0, len = times.length; i < len; i++) {
        (function(i) {
            setTimeout(() => {
                fun.apply(this, arguments);
            }, interval)
        })(i)
    }
}