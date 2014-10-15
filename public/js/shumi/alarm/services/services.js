var services = angular.module("alarm.services", ["ngResource"]);

services.factory("Alarm", ["$resource", function($resource){
    return $resource("/api/alarm/:id", {id: "@id"});
}]);

services.factory("MultiAlarmLoader", ["Alarm", "$q", function(Alarm, $q){
    return function(){
        var delay = $q.defer();
        Alarm.query(function(alarms){
            delay.resolve(alarms);
        }, function(){
            delay.reject("An error occurs");
        });
        return delay.promise;
    }
}])

services.factory("AlarmLoader", ["Alarm", "$route", "$q", function(Alarm, $route, $q){
    return function(){
        var delay = $q.defer();
        Alarm.query({id: $route.current.params.alarmId}, function(alarm){
            delay.resolve(alarm);
        }, function(){
            delay.reject("An error occurs: " + $routes.current.params.alarmId);
        });
        return delay.promise;
    }
}])