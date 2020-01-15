function throttle(fn, interval = 300) {
    var canRun = true;
    return function() {
        if (!canRun) { return; }
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, interval)
    }
}

function debonuce(fn, interval = 300) {
    let timeout = null;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    }
}