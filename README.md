

# Service Registry


`npm install --save https://github.com/bigbadweb/service-registry.git`

_services/index.js_
```services/index.js

const services = require('@bigbadweb/service-registry');

// bootstrap services

const DatabaseService = require('@bigbadweb/mysql-database-wrapper');
services.register('db', new DatabaseService(process.env.DATABASE_URL));

const myService = () => {
    someFunc: () => {
        return "something";
    }
}

services.register('myservice', myService);

module.exports = services;
module.exports.db = services.get('db');
module.exports.myservice = services.get('myservice');


```

_someroute.js_
```/someroute.js

const services = require('./services/'); // loads index.js, above by default

router.get('/something', (req, res, next) => {
    let thing = services.myservice.someFunc();
    next();
});

router.get('/a-db-query', async (req, res, next) => {

    let thing = await services.db.query('SELECT * FROM table WHERE id = ? ', [99]).catch(err => {
        return next(err);
    });
    res.render('somepage', {  thing: thing});

});

```


## Circular dependencies - injectServices

If your services depend upon each other, but not during instantiation, use the `injectServices` mechanism after registering your services to inject references to other services in the `this.` scope of the service. e.g. the following makes `this.db` available to the `myservice` Service. 
This is instead of using `services.get('db')` inside the service.


```services/index.js

const services = require('@bigbadweb/service-registry');

// bootstrap services

const DatabaseService = require('@bigbadweb/mysql-database-wrapper');
services.register('db', new DatabaseService(process.env.DATABASE_URL));

const myService = () => {
    someFunc: () => {
        return "something";
    }
}

services.register('myservice', myService);

const myService = () => {
    someFunc: async () => {

        const data = await this.db.query('SELECT * FROM TABLE')
        return "something";
    }
}

services.register('myservice', myService);

// inject services by name of service.
services.injectServices('myservice', ['db]);

module.exports = services;
module.exports.db = services.get('db');
module.exports.myservice = services.get('myservice');


```

