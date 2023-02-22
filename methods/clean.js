module.exports = function () {
    try {
        if(!this._selected_database && !this._selected_table) return false;

        if (this._selected_database && !this._selected_table) {
            this._database[this._selected_database] = {};
        }

        if (this._selected_database && this._selected_table) {
            this._database[this._selected_database][this._selected_table] = {
                rows: [],
                length: 0,
            };
        }

        this._save_database();

        const rows = this._lint.rows;
        rows.forEach(file => {
            const path = `${this._path}\\${file}.json`;
            this._remove_file(path);
        });

        return true;
    } catch (err) {
        return false;
    }
};
