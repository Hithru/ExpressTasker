const { sort } = require("fast-sort");
const router = require("express").Router();
const ServiceProvider = require("../models/serviceprovider.model");

router.route("/service-provider").post((req, res) => {
  const service_provider = req.body.service_provider;
  ServiceProvider.find({
    username: { $regex: service_provider, $options: "i" },
  }).then((data) => res.send(data));
});

module.exports = router;

router.route("/service").post((req, res) => {
  const service = req.body.service;
  const location = req.body.location;
  let service_providers = [];
  ServiceProvider.find({
    skills: { $regex: service, $options: "i" },
  }).then((data) => {
    service_providers = data;
    // console.log(service_providers);
    area_service_providers = getAreaServiceProviders(
      service_providers,
      location
    );
    const desc_rating_list = sort(area_service_providers).desc(
      (service_provider) => service_provider.rating
    );
    console.log(desc_rating_list);
    res.send(desc_rating_list);
  });
  const getAreaServiceProviders = (service_providers, location) => {
    area_providers = service_providers.filter((service_provider) => {
      return service_provider.location == location;
    });
    return area_providers;
  };
});

module.exports = router;
