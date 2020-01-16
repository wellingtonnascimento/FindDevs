const Dev = require("../models/Dev");
const parseStringAsArray = require("../Utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    // Buscar todos os devs num raio de 10km
    // Filtrar por tecnologias
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
        // $in mongo operators
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return response.json({ devs });
  }
};