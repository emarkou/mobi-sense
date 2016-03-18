angular
  .module('Buschat')
  .controller('NewsCtrl', NewsCtrl);
 
function NewsCtrl ($scope, $meteor, $ionicScrollDelegate, $ionicModal) {
	//reactiveContext = $reactive(this).attach($scope);

	$meteor.subscribe('newsfeed').then(function(){
		$scope.newsfeeds = $meteor.collection(function() {
            return NewsFeed.find({}, {sort: {created_at: -1}});
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
