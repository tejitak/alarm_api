var services = angular.module("alarm.services", ["ngResource", "alarm.config"]);

services.factory("Alarm", ["$resource", "appConfig", function($resource, appConfig){
    return $resource("/api/list/:id", {
        id: "@id",
        inputToken: function(){ return appConfig.accessToken}
    });
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