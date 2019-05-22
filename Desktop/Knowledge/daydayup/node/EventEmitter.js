
//调用events模块，获取events.EventEmitter对象
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

ee.on('some_events',function(foo,bar) {
    console.log("第一个监听时间，参数foo=" + foo + ",bar="+bar);
});

//EventEmitter.on(event,listener) 为事件注册一个监听
//参数1:event 字符串，事件名 ；参数二：回调函数

console.log("第一轮");
ee.emit('some_events','zp','xiaohong');

console.log("第二轮");
ee.emit('some_events','pz','xiaoming');