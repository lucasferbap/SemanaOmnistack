const repository = require('../repositories/ProfileRepository')

module.exports = {
    async index(request, response) {
        return response.json(await repository.findAllIncidentsByOngId(request.headers.authorization))
    }
}