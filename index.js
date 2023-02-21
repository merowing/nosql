const fs = require('fs');
const { PATH_TO_DATABASE_FILE, PATH_TO_DATABASE_FOLDER } = require('./defaults.js');
const { select, table, insert, remove, find, clean, all, get, sortby } = require('./methods');

const db = {
    _selected_database: null,
    _selected_table: null,
    _lint: null,
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
        if (!this._file_exists(PATH_TO_DATABASE_FILE)) {
            this._save_database();
        }

        const file = fs.readFileSync(PATH_TO_DATABASE_FILE, {encoding: 'utf8', flag: 'r'});

        this._database = file
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
        this._lint = null;
        this._rows = [];
        this._sortby = [];
    },
    
    _file_exists(path) {
        return fs.existsSync(path);
    },
    
    _read_file(path, options = {}) {
        return fs.readFileSync(path, options);
    },

    _remove_file(path) {
        if (this._file_exists(path)) {
            fs.unlinkSync(path);
        }
    },

    _remove_folder(path) {
        if (this._file_exists(path)) {
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
