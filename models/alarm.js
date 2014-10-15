var mongoose = require('mongoose');

var alarmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        id: {
            type: String,
            index: true
        },
        name: String
    }],
    alarmTime: String,
    timezone: String,
    administrator: {
        type: String,
        required: true
    }
});

alarmSchema.statics.findByMemberId = function(id, completed) {
    Alarm.find({'members.id': id}).exec(completed);
};

alarmSchema.statics.findByAlarmId = function(memberId, alarmId, completed) {
    Alarm.find({'members.id': memberId, '_id': alarmId}).exec(completed);
}

alarmSchema.statics.findOneByAlarmId = function(memberId, alarmId, completed) {
    Alarm.findOne({'members.id': memberId, '_id': alarmId}, completed);
}

var save = function(alarm, completed) {
    alarm.save(function(err, alarm) {
        if (err) cosole.log(err);
        if (completed) {
            completed(err, alarm);
        }
    });
}

alarmSchema.statics.updateAlarmByJSON = function(userId, alarm, completed) {
    if (!alarm._id) {
        Alarm.createAlarm(userId, alarm, completed);
    } else {
        Alarm.update({'members.id': userId, '_id': alarm._id}, alarm, {upsert: true}, function(err) {
            if (err) console.log(err);
            if (completed) {
                completed(err);
            }
        });
    }
};

alarmSchema.statics.createAlarm = function(adminId, alarm, completed) {
    Alarm.create({
        'name': alarm.name,
        'members': alarm.members,
        'administrator': adminId,
        'lunchTime':'12:00',
        'timezone':'Asia/Tokyo'
    }, completed);
}

alarmSchema.statics.removeAlarm = function(adminId, alarmId, completed) {
    Alarm.remove({'_id':alarmId, 'administrator':adminId}, function(err, num) {
        if (err) console.log(err);
        if (completed) {
            completed(err);
        }
    });
}

var Alarm = mongoose.model('Alarm', alarmSchema);

module.exports = Alarm;