let count = 0;
query().then(res => {
    console.log(res); //{state:1,data:{}}
}, (res) => {
    const interval = 3000;

    let loop = () => {
        setTimeout(() => {
            query()
        }, interval)
    };

    if (res.state === 0) {
        count++;
        count === 100 ? Promise.reject(res.reason) : loop();
    } else if (res.state === 1) {
        Promise.resolve(res);
    } else {
        throw new Error('something bad happened');
    }
})