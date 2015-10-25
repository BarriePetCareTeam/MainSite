angular.module('SignupModule').controller('SignupController', ['$scope', '$http', 'toastr', function ($scope, $http, toastr) {

    $scope.SignupPanel = {};
    $scope.SignupPanel.submitForm = function () {
        // TODO : TOASTER
        // toastr.error('That email address has already been taken, please try again.', 'Error');
        $http.post('/user', {
            firstName : $scope.SignupPanel.firstName,
            lastName : $scope.SignupPanel.lastName,
            email : $scope.SignupPanel.email,
            password : $scope.SignupPanel.password1
        });
    }

}]);
