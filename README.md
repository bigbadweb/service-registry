

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