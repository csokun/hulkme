'use strict';
// https://github.com/auth0/express-jwt
var express = require('express'), 
    jwt = require('express-jwt'),
    cfenv = require('cfenv'),
    appEnv = cfenv.getAppEnv(),
    router = express.Router();

// router.get('/auth', jwt({secret: 'shhhhhhared-secret'}), function(req, res) {
//     if (!req.user.admin) return res.sendStatus(401);
//     res.sendStatus(200);
//   });

router.get('/secret', function (req, res, next) {
    res.send({secret: appEnv.getEnvVar('secret') });
    next();
});

module.exports = router;
  