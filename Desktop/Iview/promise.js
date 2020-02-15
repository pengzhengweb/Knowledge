function MyPromise(executor) {
    let self = this
    self.value = undefined
    self.reason = undefined
        // 默认promise状态是pending
    self.status = 'pending'
        // 用来保存then 方法中，第一个参数
    self.onResolvedCallbacks = []
        // 用来保存then 方法中，第二个参数
    self.onRejectedCallbacks = []

    function resolve(value) {
        if (self.status === 'pending') { //保证状态一旦变更，不能再次修改
            self.value = value
            self.status = 'resolved' // 成功状态
            self.onResolvedCallbacks.forEach(fn => {
                fn()
            })
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason
            self.status = 'rejected' //失败状态
            self.onRejectedCallbacks.forEach(fn => {
                fn()
            })
        }
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    let self = this
    if (self.status === 'resolved') {
        onFulfilled(self.value)
    }
    if (self.status === 'rejected') {
        onRejected(self.reason)
    }
    if (self.status === 'pending') {
        // 订阅
        self.onResolvedCallbacks.push(function() {
            onFulfilled(self.value)
        })
        self.onRejectedCallbacks.push(function() {
            onRejected(self.reason)
        })
    }
}