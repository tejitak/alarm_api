var controllers = angular.module("alarm.controllers", ["ngMaterial"]);

controllers.controller('SidebarCtrl', ["$scope", "$timeout", "$mdSidenav", function($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle();
    };
    $scope.close = function() {
        $mdSidenav('left').close();
    };
}]);

controllers.controller('ListCtrl', ["$scope", function($scope) {
    $scope.todos = [
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
    ];
}]);

controllers.controller("NewCtrl", ["$scope", function(){

}]);