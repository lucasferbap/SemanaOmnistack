const crypto = require('crypto')
const repository = require('../repositories/OngRepository')


module.exports = {

    async index(request, response) {
        return response.json(await repository.findAll());
    },

    async create(request, response) {
        const id = crypto.randomBytes(4).toString('HEX');
        await repository.createOng(
            id,
            request.body.name,
            request.body.email,
            request.body.whatsapp,
            request.body.city,
            request.body.uf
        );
        return response.json({ id });
    }
}