var express = require('express');
var local_settings = require('../local_settings').settings;
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: "Alarm",
        config: local_settings
    });
});

module.exports = router;
