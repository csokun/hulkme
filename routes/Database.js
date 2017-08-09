'use strict';
var dbCredentials = {
	dbName : 'my_sample_db'
};

if(process.env.VCAP_SERVICES) {
    var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
    if(vcapServices.cloudantNoSQLDB) {
        dbCredentials.host = vcapServices.cloudantNoSQLDB[0].credentials.host;
        dbCredentials.port = vcapServices.cloudantNoSQLDB[0].credentials.port;
        dbCredentials.user = vcapServices.cloudantNoSQLDB[0].credentials.username;
        dbCredentials.password = vcapServices.cloudantNoSQLDB[0].credentials.password;
        dbCredentials.url = vcapServices.cloudantNoSQLDB[0].credentials.url;			
    } else {
        console.warn('Could not find Cloudant credentials in VCAP_SERVICES environment variable - data will be unavailable to the UI');
    }
} else{
    var config = require('../config.json');
    dbCredentials.host = config.cloudant.host;
    dbCredentials.port = 443;
    dbCredentials.user = config.cloudant.user;
    dbCredentials.password = config.cloudant.password;
    dbCredentials.url = config.cloudant.url;
}

var cloudant = require('cloudant')(dbCredentials.url);

// check if DB exists if not create
// cloudant.db.create(dbCredentials.dbName, function (err, res) {
//     if (err) { 
//         console.log('could not create db ', err); 
//     }
// });
var db = cloudant.use(dbCredentials.dbName);

// create a sample document
// db.insert({ crazy: true }, 'rabbit', function(err, body, header) {
//     if (err) {
//         return console.log('[db.insert] ', err.message);
//     }
// 
//     console.log('You have inserted the rabbit.');
//     console.log(body);
// });
// console.log(JSON.stringify(db));
module.exports = {
    db: db,
    url: dbCredentials.url + "/" + dbCredentials.dbName
};
