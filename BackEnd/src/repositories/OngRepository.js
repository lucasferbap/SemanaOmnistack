const connection = require('../database/connection')


module.exports = {
    findAll() {
        return connection('ongs').select('*');
    },

    createOng(id, name, email, whatsapp, city, uf) {
        return connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

    }
}