angular.module('SignupModule').controller('SignupController', ['$scope', '$http', function ($scope, $http) {

    $scope.SignupPanel = {};
    $scope.SignupPanel.signup = function () {
        console.log("YO");
        $http.post('/user', {
            firstName : $scope.SignupPanel.firstName,
            lastName : $scope.SignupPanel.lastName,
            email : $scope.SignupPanel.email,
            password : $scope.SignupPanel.password1
        });
    }

}]);
