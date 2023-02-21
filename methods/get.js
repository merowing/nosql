module.exports = function(count = 0, len = 0) {
    let rows = this._rows;
    let max_items = rows.length;

    if(len > 0) {
        rows = rows.slice(count, count + len);
    }
    if(!this._selected_database || !this._selected_table) {
        rows = [];
    }

    let data = [];
    if(Array.isArray(rows) && rows.length > 0) {
        data = rows.reduce((all_info, item) => {
            const filename = `${item}.json`;
            const path_to_file = `${this._path}\\${filename}`;
            let file = this._read_file(path_to_file);
            if(file) {
                file = JSON.parse(file);
                all_info.push(file);
            }

            return all_info;
        }, []);
    }

    return {
        data,
        count,
        max_items,
    };
}
