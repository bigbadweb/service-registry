class Services {
	private services: { [key: string]: any };

	constructor() {
		this.services = {};
	}

	get(serviceName: string): any {
		return this.services[serviceName];
	}

	register(serviceName: string, service: any): any {
		return (this.services[serviceName] = service);
	}

	injectService(serviceName: string, injectedServiceName: string): void {
		this.services[serviceName][injectedServiceName] = this.get(
			injectedServiceName
		);
	}

	injectServices(serviceName: string, injectedServiceNames: string[] = []): void {
		for (let injectedServiceName of injectedServiceNames) {
			this.injectService(serviceName, injectedServiceName);
		}
	}
}

const servicesInstance = new Services() as Services & { Services: typeof Services };
servicesInstance.Services = Services;

// For CommonJS: module.exports = new Services() with Services property
// For TypeScript: export = instance with Services class attached
export = servicesInstance;
