const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../Utils/parseStringAsArray");
const findGithub = require("../Utils/FindGithub.js");

// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await findGithub(github_username);

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  },

  async update(request, response) {
    const { techs } = request.body;

    const dev = await Dev.findOne({ _id: request.params.id });

    const techsArray = parseStringAsArray(techs);

    const apiResponse = await findGithub(dev.github_username);

    const { name = login, avatar_url, bio } = apiResponse.data;

    dev.techs = techsArray;
    dev.name = name;
    dev.avatar_url = avatar_url;
    dev.bio = bio;

    dev.save();

    return response.json(dev);
  },

  async destroy(request, response) {
    await Dev.findByIdAndDelete({ _id: request.params.id });

    return response.json({ message: "usuário removido com sucesso" });
  }
};