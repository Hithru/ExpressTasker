const { sort } = require("fast-sort");
const router = require("express").Router();
const ServiceProvider = require("../models/serviceprovider.model");

/////////////////////////////////////////////// Search related /////////////////////////////////////////////

//service-provider search
router.route("/service-provider").post((req, res) => {
  const service_provider = req.body.service_provider;
  ServiceProvider.find({
    username: { $regex: service_provider, $options: "i" },
  }).then((data) => res.send(data));
});

//search service based on the location and ratings of the service providers
router.route("/service").post((req, res) => {
  const service = req.body.service;
  const location = req.body.location;
  let service_providers = [];
  ServiceProvider.find({
    $or: [
      { skills: { $regex: service, $options: "i" } },
      { description: { $regex: service, $options: "i" } },
    ],
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

///////////////////////////////////////////////// Top  rated providers get //////////////////////////////////

//get top 10 rated services among all
router.route("/service-provider/top-rated").get((req, res) => {
  let service_providers = [];
  ServiceProvider.find({}).then((data) => {
    service_providers = data;
    const top_rating_list = sort(service_providers).desc(
      (service_provider) => service_provider.rating
    );
    res.send(top_rating_list.slice(0, 10));
  });
});

module.exports = router;
