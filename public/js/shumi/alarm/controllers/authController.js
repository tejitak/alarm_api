var controllers = angular.module("alarm.controllers");

controllers.controller('AuthCtrl', ['$scope', '$timeout', 'Facebook', 'appConfig',
    function($scope, $timeout, Facebook, appConfig) {

        // Define user empty data :/
        $scope.user = {};

        // Defining user logged status
        $scope.logged = false;

        // And some fancy flags to display messages upon user status change
        $scope.salutation = false;

        /**
        * Watch for Facebook to be ready.
        * There's also the event that could be used
        */
        $scope.$watch(
            function() {
                return Facebook.isReady();
            },
            function(newVal) {
                if (newVal){
                    $scope.facebookReady = true;
                }
            }
        );

        var userIsConnected = false;

        Facebook.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                userIsConnected = true;
            }
        });

        /**
        * IntentLogin
        */
        $scope.IntentLogin = function() {
            if(!userIsConnected) {
                $scope.login();
            }
        };

        /**
        * Login
        */
        $scope.login = function() {
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    $scope.logged = true;
                    $scope.me();
                }
            });
        };

        /**
        * me 
        */
        $scope.me = function() {
            Facebook.api('/me', function(response) {
                /**
                * Using $scope.$apply since this happens outside angular framework.
                */
                $scope.$apply(function() {
                    $scope.user = appConfig.me = response;
                });
            });
        };

        /**
        * Logout
        */
        $scope.logout = function() {
            Facebook.logout(function() {
                $scope.$apply(function() {
                    $scope.user = appConfig.me = {};
                    $scope.logged = false;  
                });
            });
        };

        /**
        * Taking approach of Events :D
        */
        $scope.$on('Facebook:statusChange', function(ev, data) {
            console.log('Status: ', data);
            if (data.status == 'connected') {
                $scope.$apply(function() {
                    $scope.salutation = true;
                    $scope.logged = true;
                    $scope.me();
                    // store accessToken in global scope
                    appConfig.accessToken = data.authResponse.accessToken;
                });
            } else {
                $scope.$apply(function() {
                    $scope.salutation = false;
                    $scope.user = appConfig.me = {};
                    $scope.logged = false;  
                    appConfig.accessToken = null;
                });
            }
        });
    }
]);