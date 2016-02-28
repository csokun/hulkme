var express = require('express'),
    router = express.Router(),
    cloudant = require('./Database'),
    db = cloudant.db,
    baseUrl = cloudant.url;
    
var getFile = function (req, res, next){
    db.get(req.params.fileId, function (err, doc) {
       if (!err) {
            var url = baseUrl + "/" + doc._id + "/" + doc.fileName;
            var request = require('request');
            request.get(url)
            .on('response', function(response) {
                response.headers['content-type'] = doc.fileType;
                response.headers['content-disposition'] = "attachment;  filename=" + doc.fileName;
            })
            .pipe(res);
        } else {
            res.status(404).send({message: 'File not found!'});
        }
    });
};

router.get('/:fileId', getFile);

module.exports = router;