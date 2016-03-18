angular
  .module('Buschat', [
    'angular-meteor',
    'ionic',
    'angularMoment',
    'accounts.ui'
  ]);

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}

function onReady() {
  angular.bootstrap(document, ['Buschat']);  
}

angular
  .module('Buschat').service('selectRouteOrStop', function() {
  	var data = {type: 0, id: 0, text: ""};

  	var set = function(input){
            data.type = input.type;
            data.id = input.id;
            data.text = input.text;
        };

    var get = function(){
        	return data;
        };

  	return {
        set: set,
        get: get
    };
});
