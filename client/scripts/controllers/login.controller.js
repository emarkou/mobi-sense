angular
  .module('Buschat')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $state, $ionicLoading, $ionicPopup, $log) {
  $scope.data = {};
  $scope.login = login;

  ////////////

  function login() {
    
  }

  function handleError(err) {
  
  }
}