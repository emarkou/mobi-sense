angular
  .module('Buschat')
  .controller('NewGoodCtrl', NewGoodCtrl);

function NewGoodCtrl($scope, $state, $meteor, selectRouteOrStop) {

    $scope.$meteorSubscribe('users').then(function () {
    $scope.users = $scope.$meteorCollection(function () {
      return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
    }, false);
  });

$scope.hideModal = hideModal;
$scope.data = {};
$scope.sendMessage = sendMessage;

function hideModal() {
    $scope.modal1.hide();
//	delete $scope.routeOrStop;
        delete $scope.routeOrStop.text;
        delete $scope.routeOrStop.type;
	delete $scope.routeOrStop;
	delete $scope.data.field; 
 }


function sendMessage() {
   // if (_.isEmpty($scope.data.line)) {
     // return;
    //}
    console.log('prin meteor call');
    var text = "";

    if ($scope.routeOrStop.type == 1){
      $scope.routeOrStopLabel = "Γραμμή";
      $scope.routeOrStopText = $scope.routeOrStop.text;
      text = 'Για την γραμμή ' + $scope.routeOrStop.text + ' αναφέρθηκε ότι  ' + $scope.data.field +'.';
    }
    else if ($scope.routeOrStop.type == 2){
      $scope.routeOrStopLabel = "Στάση";
      $scope.routeOrStopText = $scope.routeOrStop.text;
      text = 'Για τη στάση ' + $scope.routeOrStop.text + ' αναφέρθηκε ότι ' + $scope.data.field +'.';
    }
    else{
     text = 'Αναφέρθηκε ότι ' + $scope.data.field;
    }

    $meteor.call('newActivity', {
      text: text,
      type: 'text',
      classed: 'good'     
    });
    console.log('new activity added');

///clear form
//	delete $scope.routeOrStop;
	$scope.modal1.hide();
	delete $scope.routeOrStop.text;
	delete $scope.routeOrStop.type;
	delete $scope.routeOrStop;
	delete $scope.data.field;
	delete $scope.routeOrStopLabel;
	delete $scope.routeOrStopText;
////

//    delete $scope.data.mean;
    //delete $scope.data.field;
  //  delete $scope.data.line;  
//    $scope.modal1.hide();
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
}
