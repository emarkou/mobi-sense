angular
  .module('Buschat')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl($scope, $meteor, $state) {
  
  $scope.$meteorSubscribe('users').then(function () {
    $scope.users = $scope.$meteor.collection(function () {
      return Meteor.user.find({ _id: { $ne: Meteor.userId() } });
    }, false);
  });

// account_name = Meteor.user().services.twitter.screenName

  //$meteor.subscribe('newsfeed').then(function(){
	//	$scope.newsfeeds = $meteor.collection(function() {
      //      return NewsFeed.find({}, {sort: {created_at: -1}});
       // });        
	//});

//$meteor.subscribe('newsfeed').then(function(){
//		$scope.newsfeeds = $meteor.collection(function() {
  //          return NewsFeed.find({}, {sort: {created_at: -1}});
    //    });        
	//});
function imageUrl(){
  return Meteor.user().services.twitter.profile_image_url;
};


  $scope.logout = logout;
  //$meteor.call('ProfilePicture');
  //var user = Meteor.user();
  //var account_name = Meteor.user().services.twitter.screenName
  //this.account_name = account_name;
 // var user = Meteor.user();
  //var name = user && user.profile ? user.profile.name : '';



  ////////////

  function logout() {
    $meteor.logout().then(function () {
      $state.go('login');
    });
  }
}