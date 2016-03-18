angular
  .module('Buschat')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
	controller: 'TabsCtrl',
      resolve: {
        user: ['$meteor', function ($meteor) {
          return $meteor.requireUser();
        }]
      }
    })
    .state('tab.messages', {
      url: '/messages',
      views: {
        'tab-messages': {
          templateUrl: 'client/templates/messages.html',
          controller: 'MessagesCtrl'
        }
      }
    })
    .state('tab.replies', {
      url: '/replies/:messageId',
      views: {
        'tab-messages': {
          templateUrl: 'client/templates/replies.html',
          controller: 'RepliesCtrl'
        }
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'client/templates/login.html',
      controller: 'LoginCtrl'
    })

 
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'client/templates/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('tab.activity', {
      url: '/activity',
      views: {
        'tab-activity': {
          templateUrl: 'client/templates/activity.html',
          controller: 'ActivityCtrl'
        }
      }
    })
    .state('tab.routes', {
      url: '/routes',
      views: {
        'tab-routes': {
          templateUrl: 'client/templates/routes.html',
          controller: 'RoutesCtrl'
        }
      }
    })
	.state('tab.news', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'client/templates/news.html',
          controller: 'NewsCtrl'
        }
      }
    })

    .state('tab.rating', {
      url: '/rating',
      views: {
        'tab-rating': {
          templateUrl: 'client/templates/rating.html',
          controller: 'RatingCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/tab/messages');
}

