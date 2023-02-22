const fs = require('fs');
const { PATH_TO_DATABASE_FILE, PATH_TO_DATABASE_FOLDER } = require('./defaults.js');
const { select, table, insert, remove, find, clean, all, get, sortby } = require('./methods');

const db = {
    _selected_database: null,
    _selected_table: null,
    _lint: {},
    _database: {},
    _path: PATH_TO_DATABASE_FOLDER,
    _rows: [],
    _sortby: [],
    
    _check_available_database(name) {
        return this._database[name] === undefined;
    },
    
    _check_available_table(name) {
        if (!this._selected_database) return null;
        return this._database[this._selected_database][name] === undefined;
    },
    
    _save_database() {
        fs.writeFileSync(PATH_TO_DATABASE_FILE, JSON.stringify(this._database), {encoding: 'utf8'});
    },
    
    _read_database() {
        this._reset_default();
        
        if (!fs.existsSync(PATH_TO_DATABASE_FILE)) {
            this._save_database();
        }

        const file = this._read_file(PATH_TO_DATABASE_FILE, {encoding: 'utf8', flag: 'r'});

        this._database = (typeof file === 'object' && !Array.isArray(file))
            ? JSON.parse(file)
            : {};
    },
    
    _create_direcotry() {
        if (!fs.existsSync(PATH_TO_DATABASE_FOLDER)) {
            fs.mkdirSync(PATH_TO_DATABASE_FOLDER);
        }
        if (!fs.existsSync(this._path)) {
            fs.mkdirSync(this._path);
        }
    },
    
    _write_file(path, {filename, data}) {
        const path_to_file = `${path}\\${filename}.json`;

        fs.writeFileSync(path_to_file, JSON.stringify(data));
    },
    
    _reset_default() {
        this._selected_database = null;
        this._selected_table = null;
        this._path = PATH_TO_DATABASE_FOLDER;
        this._lint = {};
        this._rows = [];
        this._sortby = [];
    },
    
    _read_file(path, options = {}) {
        if(fs.existsSync(path)) {
            return fs.readFileSync(path, options);
        }

        return false;
    },

    _remove_file(path) {
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    },

    _remove_folder(path) {
        if (fs.existsSync(path)) {
            fs.rmSync(path, { recursive: true, force: true });
        }
    },
}

db.select = select;
db.table = table;
db.insert = insert;
db.find = find;
db.remove = remove;
db.clean = clean;
db.all = all;
db.get = get;
db.sortby = sortby;

module.exports = db;
