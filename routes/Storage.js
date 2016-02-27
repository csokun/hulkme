'use strict';
var express = require('express'),
    router = express.Router(),
    path = require('path'), 
    fs = require('fs'),
    multipart = require('connect-multiparty'),
    multiparty = multipart(),
    cloudant = require('./Database'),
    db = cloudant.db,
    baseUrl = cloudant.url;

var uploadFile = function (req, res, next) {
    console.log('upload file invoked');
    console.log('Request: ' + JSON.stringify(req.headers));
    
    var file = req.files.file;
    var rec = {
        type: 'document',
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        create_date: new Date(),
        description: '',
        published: false
    };
    
    // file , d:record return from server {id:'', rev:''}
    var insertAtt = function (file, d) {
        // fb: file content
        fs.readFile(file.path, function (err, fb) {
            if (!err) {
                if (file) {
                    db.attachment.insert(d.id, file.name, fb, file.type, {rev: d.rev}, function(err, document) {
                        if (!err) {
                            rec['fileId'] = d.id;
                            res.write( JSON.stringify(rec) );
                            res.end();
                            return;                           
                        }
                    })
                }
            }        
        });
    };
    
    db.insert(rec, '', function(err, d) {
        if (!err) {
            insertAtt(file, d, res);
        } else {
            console.log(err);
        }
    });
    
    //next();
};

var getFile = function (req, res, next) {
	var id = req.body.id;
	console.log("ID: " + id);
	// db.get(id, { revs_info: true }, function(err, doc) {
	// 	if (!err) {
    //         // download file        
	// 	}
	// });
    next();
};

var deleteFile = function (req, res, next) {
    var id = req.params.fileId;	
    console.log("--> [DEL] #" + id);
    
	db.get(id, { revs_info: true }, function(err, doc) {
		if (!err) {

			db.destroy(doc._id, doc._rev, function (err, data) {
			     // Handle response
				 if(err) {
					 console.log(err);
					 res.status(500).send({message: 'Unable to delete the file'});
				 } else {
					 res.status(200).send({message: 'File deleted'});;
				 }
			});
		} else {
            res.status(404).send({message: 'File not found'});
        }
	});

};

var getFiles = function (req, response, next) { 
    console.log('Get all files');
    
	var docList = [];
	var i = 0;
    
	db.list(function(err, body) {
		if (!err) {
			var len = body.rows.length;
            if (len == 0) {
                response.send([]);
            } else {

				body.rows.forEach(function(document) {
					
					db.get(document.id, { revs_info: true }, function(err, doc) {
						if (!err) {
							if(doc.type == 'document' && (req.published === undefined || doc.published == true)) {
							
                                var responseData = {};
								// var attachments = [];
								// 
                                // for(var attribute in doc['_attachments']){
								// 
								// 	if(doc['_attachments'][attribute] && doc['_attachments'][attribute]['content_type']) {
								// 		attachments.push({"key": attribute, "type": doc['_attachments'][attribute]['content_type']});
								// 	}
								// 	//console.log(attribute+": "+JSON.stringify(doc['_attachments'][attribute]));
								// }
                                
                                responseData = {
                                    fileId: doc._id,
								    fileName: doc.fileName,
									fileType: doc.fileType,
								    fileSize: doc.fileSize,
                                    description: doc.description,
                                    published: (doc.published === undefined ? false : doc.published)
                                };

                                docList.push(responseData);
							} 
                            
							i++;
							if(i >= len) {
								response.write(JSON.stringify(docList));
								console.log('ending response...');
								response.end();
							}
						} else {
							console.log(err);
						}
					});
					
				});
			}
			
		} else {
			console.log(err);
            response.status(500).send({message: 'Server error!'})
		}
	});

};

var published = function (req, res, next) {
    req.published = true;
    next();
};

var updateFile = function (req, res, next) {
    var id = req.params.fileId;	
    console.log("--> [UPDATE] #" + id);

    db.get(id, { revs_info: true }, function (err, doc) {
        if (!err) {
            doc.published = req.body.published;
            doc.description = req.body.description;

            db.insert(doc, doc.id, function(err) {
                res.status(200);
                res.send({message: 'Update successfully'});
            });
        } else {
            res.status(404);
            res.send({message: 'File not found'});
        }
    });
};

router.post('/upload', multiparty, uploadFile);
router.get('/published', published, getFiles);
router.get('/files', getFiles);

router.get('/file/:fileId', getFile);
router.post('/file/:fileId', updateFile);
router.delete('/file/:fileId', deleteFile);

module.exports = router;



