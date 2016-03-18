angular
  .module('Buschat')
  .controller('MessagesCtrl', MessagesCtrl);

function MessagesCtrl ($scope, $ionicModal) {  
  $scope.messages = $scope.$meteorCollection(Messages, false);
  
  $ionicModal.fromTemplateUrl('client/templates/new-message.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $scope.openNewMessageModal = openNewMessageModal;
  
  ////////////

  function openNewMessageModal () {
    $scope.modal.show();
  }

}