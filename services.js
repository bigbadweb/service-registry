class Services {
	constructor() {
		this.services = {};
	}

	get(serviceName) {
		return this.services[serviceName];
	}

	register(serviceName, service) {
		return (this.services[serviceName] = service);
	}

	injectService(serviceName, injectedServiceName) {
		this.services[serviceName][injectedServiceName] = this.get(
			injectedServiceName
		);
	}
	injectServices(serviceName, injectedServiceNames = []) {
		for (let injectedServiceName of injectedServiceNames) {
			this.injectService(serviceName, injectedServiceName);
		}
	}
}

module.exports.Services = Services;
module.exports = new Services();
