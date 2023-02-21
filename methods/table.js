module.exports = function (name = null) {
    if (name && this._selected_database) {
        this._path += '\\' + name;

        if (this._check_available_table(name) && this._check_available_table(name) !== null) {
            this._lint[name] = {
                rows: [],
                length: 0,
            };
            this._save_database();

            this._create_direcotry();
        } else {
            if(!this._check_available_table(name)) {
                this._create_direcotry();
            }
        }

        this._lint = this._lint[name];
        this._selected_table = name;
        this._rows = [...this._lint.rows];
    }

    return this;
}
