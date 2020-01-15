var obj = { pwd: "1234" };

Object.defineProperty(obj, 'pwd', {
    set: function(value) {
        document.getElementById('useName').innerText = value;
        console.log("触发了set方法");
    },
    get: function() {
        console.log("触发了get方法");
        return name;

    }
});
document.getElementById('useName').addEventListener('keyup', function(e) {
    obj.pwd = e.target.value;
})

book.name = "asda";
console.log(book.name);