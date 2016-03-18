angular
  .module('Buschat')
  .run(run);

function run($rootScope, $state) {
  
  Meteor.subscribe("userData");
  Meteor.subscribe("messages");
  Meteor.subscribe("users");
  Meteor.subscribe("replies");
 // Meteor.subscribe("activity");
  //Meteor.subscribe("routes");
  routeSubs = new SubsManager({cacheLimit: 9999, expireIn: 9999});

  Accounts.onLogin(function () {
    if ($state.is('login')) {
      $state.go('tab.messages');
    }
  });

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });

  $rootScope.userImg = function(userId) {       
       return Meteor.users.find({ _id: userId }).fetch()[0].services.twitter.profile_image_url;
     };  
}