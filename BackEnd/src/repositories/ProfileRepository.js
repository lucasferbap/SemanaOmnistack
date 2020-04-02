const connection = require('../database/connection')

module.exports = {
    async findAllIncidentsByOngId(id) {
        return await connection('incident').where('ong_id', id).select('*');
    }
}