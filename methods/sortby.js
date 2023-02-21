module.exports = function(name = '', type = 'asc') {
    if(name && typeof name === 'string') {
        this._sortby = [name, type];
    }

    return this;
}
