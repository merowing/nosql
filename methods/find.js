module.exports = function (data) {
    this._rows = [];
    
    if (!this._selected_database || !this._selected_table) {
        return this;
    }

    if (data && typeof data === 'object' && !Array.isArray(data)) {
        const object_data_keys = Object.keys(data);
        const unique_id_name = 'id';
        const len = this._lint.length;
        let file = [];

        if (Object.hasOwn(data, unique_id_name) && data[unique_id_name]) {
            file = [data[unique_id_name]];
        } else {
            file = [...this._lint.rows];
        }

        for (let i = 0; i < len; i++) {
            const path_to_file = `${this._path}\\${file[i]}.json`;

            if (this._file_exists(path_to_file)) {
                let file_info = this._read_file(path_to_file, {encoding: 'utf8', flag: 'r'});

                if (file_info) {
                    file_info = JSON.parse(file_info);
                    let found = false;

                    if (object_data_keys.length > 0) {
                        const regex_data_number = /^\s?([>|<|=]{1,2})?\s?[0-9]+\s?$/;

                        for (let i = 0; i < object_data_keys.length; i++) {
                            const key = object_data_keys[i];
                            if (!Object.hasOwn(file_info, key)) continue;

                            if (data[key] === '') {
                                found = true;
                                continue;
                            }

                            if (!/(<|>|=)\s?[0-9]/.test(data[key]) && key !== 'name' && data[key] !== '') {
                                const regex_condition = `\\b${data[key].replace(/,\s?/g, '|')}\\b`;
                                const regex = new RegExp(regex_condition, 'i');

                                if (file_info[key] !== undefined) {
                                    found = file_info[key].toLowerCase().search(regex) !== -1;
                                } else {
                                    found = false;
                                }
                            }

                            if (key === 'name') {
                                found = file_info[key].toLowerCase().indexOf(data[key].toLowerCase()) !== -1;
                            }

                            if (/(<|>|=)\s?[0-9]/.test(data[key])) {
                                const conditions = data[key].split(/,\s?/);
                                for (let i = 0; i < conditions.length; i++) {
                                    const data_num = conditions[i].match(/[0-9]+/);
                                    
                                    const symbol_str = conditions[i].match(regex_data_number);

                                    const compare = {
                                        '>': function(num1, num2) {
                                            return this._(num1, num2) > 0;
                                        },
                                        '<': function(num1, num2) {
                                            return this._(num1, num2) < 0;
                                        },
                                        '>=': function(num1, num2) {
                                            return this._(num1, num2) >= 0;
                                        },
                                        '<=': function(num1, num2) {
                                            return this._(num1, num2) <= 0;
                                        },
                                        _(num1, num2) {
                                            return parseInt(num1) - parseInt(num2);
                                        }
                                    }

                                    const num1 = file_info[key];
                                    const num2 = data_num;
                                    found = compare[symbol_str[1]](num1, num2);

                                    if (!found) break;
                                }
                            }

                            if (!found) break;
                        }
                    }

                    if (found) {
                        this._rows.push(file[i]);
                    }
                }
            }
        }
    } else {
        this._rows = [...this._lint.rows];
    }

    return this;
}
