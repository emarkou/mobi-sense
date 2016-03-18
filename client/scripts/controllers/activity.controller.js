angular
  .module('Buschat')
  .controller('ActivityCtrl', ActivityCtrl);
 
function ActivityCtrl ($scope, $meteor, $ionicScrollDelegate, $ionicModal) {
	//reactiveContext = $reactive(this).attach($scope);

	$meteor.subscribe('activity').then(function(){
		$scope.activities = $meteor.collection(function() {
            return Activity.find({}, {sort: {created_at: -1}});
        });        
	});

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
