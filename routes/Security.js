'use strict';
// https://github.com/auth0/express-jwt
var express = require('express'), 
    jwt = require('jsonwebtoken'),
    ejwt = require('express-jwt'),
    cfenv = require('../cfenv-wrapper'),
    router = express.Router();

// router.get('/auth', jwt({secret: 'shhhhhhared-secret'}), function(req, res) {
//     if (!req.user.admin) return res.sendStatus(401);
//     res.sendStatus(200);
//   });
var authorized = function (req, res, next) {
        
};

router.post('/login', function(req, res, next) {
    var passpharse = req.body.passphrase,
        appEnv = cfenv.getAppEnv(),
        salt = appEnv.getEnvVar('salt') || 'W%GN]e(e$e#{.@|of-01zDRjs+9[DD-6z#A%N7D+Gv]9_kLq-P.Yr[]yQ.cr3/li',
        secret = appEnv.getEnvVar('secret') || 'dem0pwd',
        token = '';

    if (secret != null && passpharse == secret) {
        token = jwt.sign({admin: true}, salt);
        res.send({token: token, user: req.user});
    } else {
        res.sendStatus(401);
    }
});

// router.get('/secret', ejwt({secret:'foo', credentialsRequired: false}),
//  function (req, res, next) {
//     if (!req.user.admin) return res.sendStatus(401);
//     // var appEnv = cfenv.getAppEnv();
//     // res.send({secret: appEnv.getEnvVar('secret') });
//     // next();
// });

module.exports = router;
  