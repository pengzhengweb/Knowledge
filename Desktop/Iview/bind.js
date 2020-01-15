Function.prototype.mybind = function(arg) {
    var self = this;
    return function() {
        return self.apply(arg)
    }
}