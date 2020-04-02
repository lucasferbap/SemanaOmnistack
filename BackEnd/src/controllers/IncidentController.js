 const repository = require('../repositories/IncidentRepository')
 const connection = require('../database/connection')
 module.exports = {

     async index(request, response) {
         const [count] = await repository.countRecords();
         const incidents = await repository.findAllPaged(request.query ? 1 : request.query.page);
         response.header('X-Total-Count', count['count(*)']);
         response.header('X-Total-Page', Math.ceil((count['count(*)'] / 5)));
         return response.json(incidents)

     },

     async create(request, response) {
         const [id] = await repository.createRecord(
             request.body.title,
             request.body.description,
             request.body.value,
             request.headers.authorization // ong_id
         );
         return response.json({ id })
     },

     async delete(request, response) {
         const { id } = request.params;
         const ong_id = request.headers.authorization;

         const incident = await repository.findById(id)
         if (incident.ong_id != ong_id) {
             return response.status(401).json({ error: 'Operation not permitted.' })
         }

         await repository.deleteRecord(id)
         return response.status(204).send();
     }
 }