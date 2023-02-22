module.exports = function (name = null) {
    this._read_database();
    if (name) {
        this._path += `\\${name}`;
    }

    if (name && this._check_available_database(name)) {
        this._database[name] = {};
        this._save_database();
        this._create_direcotry();
    }

    this._selected_database = name;
    this._selected_table = null;
    this._lint = this._database[name];

    return this;
}
