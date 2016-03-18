angular
  .module('Buschat')
  .controller('RoutesCtrl', RoutesCtrl);
 
function RoutesCtrl ($scope, $meteor, $ionicScrollDelegate, $ionicModal, $reactive, selectRouteOrStop) {
	$reactive($scope).attach($scope);
	//https://github.com/Urigo/angular-meteor/issues/1237

	$scope.search = {text: ''};
	$scope.search_focus = false;	
	$scope.route = {id: '237-20'};
	$scope.selectedRoute = -1;
	$scope.selectedStop = -1;
	$scope.routeOrStopLabel = "";
	$scope.routeOrStopText = "";

	$scope.routeOrStop = selectRouteOrStop.get();
	console.log($scope.routeOrStop);

	$scope.subscribe('all-routes', function (){return []}, function(){
		$scope.routes = $meteor.collection(function() {
            return Routes.find({$or: [{route_short_name: { '$regex' : '.*' + $scope.getReactively("search.text")}}, 
				{route_long_name: { '$regex' : '.*' + $scope.getReactively("search.text") }}]
			});
        });
		var delegate = $ionicScrollDelegate.$getByHandle('myScroll');
        delegate.resize();
	});		

	$scope.subscribe('get-stops', function(){
		return [{route_id: $scope.getReactively("route.id")}];
	}, function(){		
		selected_route = $scope.$meteorCollection(function() {
        	return Routes.find({route_id: $scope.getReactively("route.id")});
        });
        $scope.stops = selected_route[0].stops;
        $scope.route = selected_route[0];
        var delegate = $ionicScrollDelegate.$getByHandle('myScroll');
        delegate.scrollTop();
        delegate.resize();
	});

	$scope.toggle_search_focus = function(route_id){
		$scope.selectedRoute = -1;
		$scope.selectedStop = -1;
		console.log("toggle " + route_id);				
		if (route_id != undefined){
			$scope.route.id = route_id;
		}
		$scope.search_focus = !$scope.search_focus;			
	}

	$scope.routeClicked = function(index, route){
		console.log(index);
		console.log(route);
		$scope.selectedRoute = index;
		selectRouteOrStop.set({type: 1, id: route.route_id, text: route.route_id + " " + route.route_long_name});
		console.log(selectRouteOrStop.get());
	}

	$scope.stopClicked = function(index, route, stop){
		console.log(index);
		console.log(route);
		console.log(stop);
		$scope.selectedStop = index;
		selectRouteOrStop.set({type: 2, id: stop.stop_id, text: stop.stop_name + " " + route.route_id + " " + route.route_long_name});
	}	

	$scope.$on('$ionicView.enter', function () {
		$scope.selectedRoute = -1;
		$scope.selectedStop = -1;		
	});

	function updateStopOrRoute(){
		if ($scope.routeOrStop.type == 1){
		  $scope.routeOrStopLabel = "Διαδρομή";
		  $scope.routeOrStopText = $scope.routeOrStop.text;
		}
		else if ($scope.routeOrStop.type == 2){
		  $scope.routeOrStopLabel = "Στάση";
		  $scope.routeOrStopText = $scope.routeOrStop.text;
		}
		else{
		  //nothing for now
		}
	}

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

	$scope.ShowModal1 = function (){
  		updateStopOrRoute();
        $scope.modal1.show();
        var delegate = $ionicScrollDelegate.$getByHandle('myScroll');
    	delegate.resize();
    }

    $scope.ShowModal2= function (){
    	updateStopOrRoute();
        $scope.modal2.show();
	 var delegate = $ionicScrollDelegate.$getByHandle('myScroll');
        delegate.resize();

    }

	$scope.ShowModal3= function (){
  		updateStopOrRoute();
        $scope.modal3.show();
    }
	  

}
