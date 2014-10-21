var controllers = angular.module("alarm.controllers", ["ngMaterial", "alarm.config"]);

controllers.controller('SidebarCtrl', ["$scope", "$timeout", "$mdSidenav", function($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle();
    };
    $scope.close = function() {
        $mdSidenav('left').close();
    };
}]);

controllers.controller("TopCtrl", ["$scope", function(){

}]);

controllers.controller('ListCtrl', ["$scope", "appConfig", "MultiAlarmLoader", "$mdDialog", function($scope, appConfig, MultiAlarmLoader, $mdDialog) {
    $scope.appConfig = appConfig;
    $scope.$watch("appConfig.accessToken", function(val){
        console.log("accessToken watcher:" + val);
        if(val){
            MultiAlarmLoader().then(function(alarms){ $scope.alarms = alarms; });
            $mdDialog.hide();
        }else{
            $scope.alarms = [];
            $mdDialog.show({templateUrl: '/js/shumi/alarm/views/dialog/login.html'});
        }
    });
}]);

controllers.controller("CalendarCtrl", ["$scope", function(){

}]);

controllers.controller("NewCtrl", ["$scope", function(){

}]);