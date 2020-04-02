const repository = require('../repositories/SesseionRepository')

module.exports = {
    async create(request, response) {
        const { id } = request.body;
        const ong = await repository.findOngNameById(id);

        if (!ong) {
            return response.status(400).json({
                error: 'No ONG found with this ID: ' + id
            });
        }
        return response.json(ong)
    }
}