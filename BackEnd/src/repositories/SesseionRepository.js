const connection = require('../database/connection')

module.exports = {

    findOngNameById(id) {
        return connection('ongs')
            .where('id', id)
            .select('name')
            .first();
    }

}