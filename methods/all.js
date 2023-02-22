const { PATH_TO_DATABASE_FILE, PATH_TO_DATABASE_FOLDER } = require('./../defaults');

module.exports = function () {
    const json_database = this._read_file(PATH_TO_DATABASE_FILE, {encoding: 'utf8', flag: 'r'});
    let data = [];

    if (json_database && !Array.isArray(json_database) && typeof json_database === 'object') {
        data = recursive_object( JSON.parse(json_database) )
            .filter(item => item.value)
            .filter(item => item.path.indexOf('length') === -1)
            .reduce((paths, current) => {
                current.value.forEach(row => {
                    const split_path = current.path.split('\\');
                    const database = split_path[0];
                    const table = split_path[1];
                    const path = `${database}\\${table}\\${row}.json`;

                    let file_data = this._read_file(`${PATH_TO_DATABASE_FOLDER}\\${path}`);

                    file_data = (file_data)
                        ? JSON.parse(file)
                        : [];

                    paths.push({
                        database,
                        table,
                        row,
                        data: file_data,
                    });
                });

                return paths;
            }, []);
    }

    return data;
}

function recursive_object(o, arr = [], n = 0, chain = []) {
    const keys = Object.keys(o);
    chain.push(keys[n]);
  
    if (typeof o[keys[n]] === 'object' && !Array.isArray(o[keys[n]])) {
        rec(o[keys[n]], arr, 0, chain);
    } else {
        arr.push({
            path: chain.join('\\'),
            value: o[keys[n]]
        });
    }

    if (n < keys.length - 1) {
        chain.splice(-1);
        n++;
        rec(o, arr, n, chain);
    } else {
        chain.splice(-1);
    }

    return arr;
}
