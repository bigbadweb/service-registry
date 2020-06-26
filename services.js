
class Services {

  constructor() {
    this.services = {};
  }

  get(serviceName) {
    return this.services[serviceName];
  }

  register(serviceName, service) {
    console.log(`registering ${serviceName}`)
    this.services[serviceName] = service;
  }

}

module.exports.Services = Services;
module.exports = new Services();
