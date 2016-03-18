angular
  .module('Buschat')
  .controller('RepliesCtrl', RepliesCtrl);

function RepliesCtrl ($scope, $stateParams, $ionicScrollDelegate, $timeout, $meteor, $ionicPopup, $log) {
  var messageId = $stateParams.messageId;
  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();  
  
  $scope.messages = $scope.$meteorCollection(function () {
    return Messages.find({_id: messageId});
  }, false);
  
  $scope.replies = $scope.$meteorCollection(function () {
    return Replies.find({ messageId: messageId });
  }, false);

  $scope.$watchCollection('replies', function (oldVal, newVal) {
    var animate = oldVal.length !== newVal.length;
    $ionicScrollDelegate.$getByHandle('replyScroll').scrollBottom(animate);
  });

  $scope.data = {};
  $scope.sendReply = sendReply;
  $scope.inputUp = inputUp;
  $scope.inputDown = inputDown;
  $scope.closeKeyboard = closeKeyboard;
  $scope.sendPicture = sendPicture;
 
  ///

  function sendPicture () {
    MeteorCameraUI.getPicture({}, function (err, data) {
      if (err && err.error == 'cancel') {
        return;
      }

      if (err) {
        return handleError(err);
      }

      $meteor.call('newReply', {
        picture: data,
        type: 'picture',
        messageId: messageId
      });
    });
  }

  function handleError (err) {
    $log.error('profile save error ', err);
    $ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }

  function sendReply () {
    if (_.isEmpty($scope.data.reply)) {
      return;
    }
    console.log("about to send reply " + $scope.data.reply);
    $meteor.call('newReply', {
      text: $scope.data.reply,
      type: 'text',
      messageId: messageId
    });

    delete $scope.data.reply;
  }

  function inputUp () {
    if (isIOS) {
      $scope.data.keyboardHeight = 216;
    }

    $timeout(function() {
      $ionicScrollDelegate.$getByHandle('replyScroll').scrollBottom(true);
    }, 300);
  }

  function inputDown () {
    if (isIOS) {
      $scope.data.keyboardHeight = 0;
    }

    $ionicScrollDelegate.$getByHandle('replyScroll').resize();
  }

  function closeKeyboard () {
    // cordova.plugins.Keyboard.close();
  }
}