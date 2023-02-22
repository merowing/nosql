module.exports = function(count = 0, len = 0) {
    let rows = this._rows;
    const max_items = rows.length;

    if (!this._selected_database || !this._selected_table) {
        rows = [];
    }

    if (this._sortby.length) {
        const [ param, type ] = this._sortby;

        const temp_rows = rows.reduce((sorted_rows, item) => {
            const path_to_file = `${this._path}\\${item}.json`;
            const file = this._read_file(path_to_file);
            
            if (file) {
                const json = JSON.parse(file);
                const val = json[param];

                if (val) {
                    sorted_rows.push([val, item]);
                }
            }

            return sorted_rows;
        }, []);

        temp_rows.sort((a, b) => {
            return (type === 'desc')
                ? b[0] - a[0]
                : a[0] - b[0];
        });

        rows = temp_rows.map(item => item[1]);
    }

    if (len > 0) {
        rows = rows.slice(count, count + len);
    }

    let data = [];
    if (Array.isArray(rows) && rows.length > 0) {
        data = rows.reduce((all_info, item) => {
            const filename = `${item}.json`;
            const path_to_file = `${this._path}\\${filename}`;
            let file = this._read_file(path_to_file);
            if (file) {
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
