angular
  .module('Buschat')
  .controller('NewBadCtrl', NewBadCtrl);

function NewBadCtrl($scope, $state, $meteor) {

    $scope.$meteorSubscribe('users').then(function () {
    $scope.users = $scope.$meteorCollection(function () {
      return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
    }, false);
  });

$scope.hideModal = hideModal;
$scope.data = {};
$scope.sendMessage = sendMessage;

function hideModal() {
    $scope.modal2.hide();
//	delete $scope.routeOrStop;
        delete $scope.routeOrStop.text;
        delete $scope.routeOrStop.type;
	delete $scope.data.field;
	delete $scope.routeOrStop;
  }


 function sendMessage() {
   // if (_.isEmpty($scope.data.line)) {
     // return;
    //}
    console.log('prin meteor call');
////
	var text = "";

    if ($scope.routeOrStop.type == 1){
      $scope.routeOrStopLabel = "Διαδρομή";
      $scope.routeOrStopText = $scope.routeOrStop.text;
      text = 'Για τη γραμμή ' +  $scope.routeOrStop.text + ' αναφέρθηκε ότι ' + $scope.data.field +'.';

    }
    else if ($scope.routeOrStop.type == 2){
      $scope.routeOrStopLabel = "Στάση";
      $scope.routeOrStopText = $scope.routeOrStop.text;
      text = 'Για τη στάση  ' + $scope.routeOrStop.text + ' αναφέρθηκε ότι ' + $scope.data.field +'.';
    }
    else{
          text = 'Αναφέρθηκε ότι ' + $scope.data.field;

    }


////
    $meteor.call('newActivity', {
      text: text,
      type: 'text',
  classed: 'bad'     
    });
    console.log('new activity added');
///clear form
	$scope.modal2.hide();
        delete $scope.routeOrStop;
        delete $scope.routeOrStop.text;
	delete $scope.routeOrStop.type;
	delete $scope.data.field;
	delete $scope.routeOrStopLabel;
	delete $scope.routeOrStopText;
//    delete $scope.data.mean;
    //delete $scope.data.field;
  //  delete $scope.data.line;  
   // $scope.modal2.hide();
  }

  function inputUp () {
    console.log("input up");
    if (isIOS) {
      $scope.data.keyboardHeight = 216;      
    }

    $timeout(function() {
      $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
  }


   function inputDown () {
    console.log("input down");
    if (isIOS) {
      $scope.data.keyboardHeight = 0;
    }

    $ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }
}
