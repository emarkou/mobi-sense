angular
  .module('Buschat')
  .controller('RatingCtrl', RatingCtrl);

 function RatingCtrl ($scope, $ionicModal) {  
  

  $ionicModal.fromTemplateUrl('client/templates/new-good.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal1 = modal;
  });

 
$ionicModal.fromTemplateUrl('client/templates/new-bad.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal2 = modal;
  });

 
$ionicModal.fromTemplateUrl('client/templates/new-idea.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal3 = modal;
  });
  ////////////////
  $scope.ShowModal1 = function (){
         $scope.modal1.show()
    }

    $scope.ShowModal2= function (){
         $scope.modal2.show()
    }

  $scope.ShowModal3= function (){
         $scope.modal3.show()
    }

  }