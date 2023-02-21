const { PATH_TO_DATABASE_FILE } = require("../defaults");

module.exports = function (id = null) {
    try {
        if (id && typeof id === 'string') {
            if (!this._selected_database || !this._selected_table) return false;
            
            const delete_index = this._lint.rows.indexOf(id);

            if (delete_index >= 0) {
                this._lint.rows.splice(delete_index, 1);
                this._lint.length -= 1;
                
                this._save_database();
                this._remove_file(this._path + '//' + id + '.json');
            } else {
                return false;
            }
        } else {
            if (this._selected_database && !this._selected_table) {
                delete this._database[this._selected_database];
            }
            if (this._selected_database && this._selected_table) {
                delete this._database[this._selected_database][this._selected_table];
            }

            if (!this._selected_database) {
                this._remove_file(PATH_TO_DATABASE_FILE);
            } else {
                this._save_database();
            }

            this._remove_folder(this._path);
        }

        return true;
    } catch (err) {
        return false;
    }
}
