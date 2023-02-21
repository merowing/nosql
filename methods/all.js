const { PATH_TO_DATABASE_FILE } = require('./../defaults');

module.exports = function () {
    let data = [];
    let json_database;
    
    if(this._file_exists(PATH_TO_DATABASE_FILE)) {
        json_database = this._read_file(PATH_TO_DATABASE_FILE, {encoding: 'utf8', flag: 'r'});
    }

    if (json_database) {
        data = rec( JSON.parse(json_database) )
            .filter(item => item.value)
            .filter(item => item.path.indexOf('length') === -1)
            .reduce((paths, current) => {
                current.value.forEach(filename => {
                    const split_path = current.path.split('\\');
                    const database = split_path[0];
                    const table = split_path[1];
                    const row = `${filename}.json`;
                    const path = `${database}\\${table}\\${row}`;

                    paths.push({
                        database,
                        table,
                        row,
                        path
                    });
                });

                return paths;
            }, []);
    }

    return data;
}

function rec(o, arr = [], n = 0, chain = []) {
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
