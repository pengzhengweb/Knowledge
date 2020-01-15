Object.prototype.a = "Object";
Function.prototype.a = "Function";

function Person() {};

var child = new Person();

console.log(Person.a);
console.log(child.a);
console.log(child._proto__);

setTimeout(() => {
    console.log('timeout');
}, 0)

setImmediate(() => {
    console.log('Immediate');
}, 0)