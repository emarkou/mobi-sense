angular
  .module('Buschat')
  .controller('TabsCtrl', TabsCtrl);

function TabsCtrl($scope, $state, $meteor, $ionicPopup, $timeout) {


  $scope.data = {}

  // Triggered on a button click, or some other target
  $scope.showPopup = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Οδηγίες',
      template: 'Κάνε click σε μια διαδρομή ή στάση  για να την επιλέξεις και διπλό click σε μια διαδρομή για να δεις τις στάσεις της!'
    });
    alertPopup.then(function(res) {
     // console.log('Thank you for not eating my delicious ice cream cone');
    });
  };
};
