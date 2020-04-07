const connection = require('../database/connection')

module.exports = {

    findAllPaged(page) {
        return connection('incident')
            .join('ongs', 'ongs.id', '=', 'incident.ong_id')
            .limit(5)
            .offset((parseInt(page) - 1) * 5)
            .select(
                [
                    'incident.*',
                    'ongs.name',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf'
                ])
    },

    findById(id) {
        return connection('incident')
            .where('id', id)
            .select('ong_id')
            .first();
    },

    countRecords() {
        return connection('incident').count();
    },

    createRecord(title, description, value, ong_id) {
        return connection('incident').insert({
            title,
            description,
            value,
            ong_id,
        });

    },

    deleteRecord(id) {
        return connection('incident').where('id', id).delete();
    }




}