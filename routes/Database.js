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
    dbCredentials.host = config.cloudant.host;// "df4edac6-909a-488f-b010-4d90648cd343-bluemix.cloudant.com";
    dbCredentials.port = 443;
    dbCredentials.user = config.cloudant.user;//"df4edac6-909a-488f-b010-4d90648cd343-bluemix";
    dbCredentials.password = config.cloudant.password;// "784cc43f09ec3981ebff5f01f2ae4a5ea54795ce2557d8c7a0cee2f8671ded6f";
    dbCredentials.url = config.cloudant.url;// "https://df4edac6-909a-488f-b010-4d90648cd343-bluemix:784cc43f09ec3981ebff5f01f2ae4a5ea54795ce2557d8c7a0cee2f8671ded6f@df4edac6-909a-488f-b010-4d90648cd343-bluemix.cloudant.com";
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