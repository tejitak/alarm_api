var express = require('express');
var fs = require('fs');
var request = require('request');
var url = require('url');
var fbAuth = require('./modules/fbAuth');
var router = express.Router();
var apiKeys = {};

var models = require('../models');
var Alarm = models.Alarm;

// read apikey.json
fs.readFile('apikey.json', 'UTF-8', function (err, data) {
    if (err){ console.warn('Please create a file "apikey.json"'); throw err; }
    apiKeys = JSON.parse(data);
    // set FB client_secret
    fbAuth.init(apiKeys["fb_client_id"], apiKeys["fb_client_secret"]);
});


/**
 * @api {GET} /list Get alarms which an authenticated user joins
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"name":"test124","members":[{"id":"10152160532855662","name":"Takuya Tejima"}],"shops":[],"_id":"SeJUQcbMTmTHJAIH"}]
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "404 Unauthorized"
 *     }
 */
router.get('/list', function(req, res) {
    var callback = function(err, authResponse){
        if (err) {
            res.contentType('application/json');
            res.send('{"error":' + err.message + '}')
            return;
        }
        res.contentType('application/json');
        res.send([
            {
                face : '/img/list/60.jpeg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands",
                enabled: true
            },
            {
                face : '/img/list/60.jpeg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands",
                enabled: true
            },
            {
                face : '/img/list/60.jpeg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands",
                enabled: false
            },
            {
                face : '/img/list/60.jpeg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands",
                enabled: false
            },
            {
                face : '/img/list/60.jpeg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands",
                enabled: true
            }
        ]);
    };
    fbAuth.checkAccessToken(req.query.inputToken, callback);
});

module.exports = router;
