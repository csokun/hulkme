'use strict';
// https://github.com/auth0/express-jwt
var express = require('express'), 
    jwt = require('express-jwt'),
    cfenv = require('cfenv'),
    router = express.Router();

router.get('/auth', jwt({secret: 'shhhhhhared-secret'}), function(req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  });
  
module.exports = router;
  