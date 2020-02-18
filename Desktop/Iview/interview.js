let count = 0;
const interval = 3000;
let loop = () => {
    query().then(res => {
        console.log(res); //{state:1,data:{}}
    }, (res) => {
        console.log(res); //{state:0,data:{}}
        timer && clearTimeout(timer);
        if (res.state === 0) {
            count++;
            if (count === 100) {
                Promise.reject(res.reason)
            } else {
                timer && clearTimeout(timer);
                let timer = setTimeout(loop(), interval);
            }
        } else if (res.state === 1) {
            Promise.resolve(res);
        } else {
            throw new Error('something bad happened');
        }
    })
};
loop();