var mongoose = require('mongoose');
var Alarm = require('./alarm');

module.exports.init = function(url, db) {
    // if you uses multiple connection, use createConnection()
    mongoose.connect(url + '/' + db);
}

module.exports.destroy = function(completed) {
    mongoose.disconnect(completed);
}

module.exports.Alarm = Alarm;