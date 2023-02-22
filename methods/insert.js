module.exports = function (data) {
    let u_id = data.id;
    if (!u_id) {
        const last_index = this._lint.rows.slice(-1);
        u_id = (!last_index[0])
            ? '1'
            : parseInt(last_index[0]) + 1;
        
        data = {id: u_id.toString(), ...data};
    }
    u_id = u_id.toString();

    this._write_file(this._path, {filename: u_id, data});

    if (this._lint.rows.indexOf(u_id) === -1) {
        this._lint.rows.push(u_id);
        this._lint.length += 1;
        this._save_database();
    }

    this._path = __dirname;
}
