Meteor.startup(function () {
  
  Accounts.loginServiceConfiguration.remove({
      service : 'twitter'
    });

    Accounts.loginServiceConfiguration.insert({
      service     : 'twitter',
      consumerKey : 'wZnGpbYNA81BduNDk4hp98KDp',
      secret      : 'sM5uBya3s27S6U1vPfGb9jHv54BolRju5Dqn5AOfQ9ILW6YeMx'
    });

  // console.log(GTFS);
  // GTFS.importFromZip('oasa', '/vagrant/buschat/packages/oasa.gtfs.zip');
  
  GTFS.getRoutesByAgency('oasa', function(err, routes) {
      console.log("routes");
      //jquery.each(routes, function(route){console.log(route)});
      //console.log(routes);
      console.log(err);
  });

  if (false){  
      var Fiber = Npm.require('fibers');  
      
      Fiber(function() {
          var fiber = Fiber.current;
          routes = Routes.find({agency_key : "oasa"});
          var StopsByRoute = {};
          routes.forEach(function(route){    
              console.log(route.route_id);              
              GTFS.getStopsByRoute('oasa', route.route_id, undefined, function(err, stops) {                
                StopsByRoute[route.route_id] = JSON.stringify(stops);
                fiber.run();
              });              
              Fiber.yield();          
          });
          var keys = [];
          for(var k in StopsByRoute){        
            keys.push(k);
            var json = JSON.parse(StopsByRoute[k]);
            var stopsNumber = json.length;        
            Routes.update({
               "route_id" : k, "agency_key" : 'oasa'
             }, {
               $set: {"stops": json, "stopsNumber" : stopsNumber}
             }, function(error) {
                if(error)
                   console.log(error);
              });
          }      
      }).run();
  }

  var T = new Twit({
      consumer_key:         'wZnGpbYNA81BduNDk4hp98KDp'
    , consumer_secret:      'sM5uBya3s27S6U1vPfGb9jHv54BolRju5Dqn5AOfQ9ILW6YeMx'
    , access_token:         '15039487-d4oaCEMAecx50eWDiGIQIVpPnEsaoOYyJgCBF2Skd'
    , access_token_secret:  '48JWaxYH2ikcBQDtYKix4jesqNht7H0VLAu7NXy0NIQ94'
  });

  var tweets = T.get('statuses/user_timeline', { user_id: '19676048' }, function (err, data, response) {
    var Fiber = Npm.require('fibers');  
      
    Fiber(function() {
     NewsFeed.remove({});
      var fiber = Fiber.current;
      for (var i = 0; i < data.length; i++) {
          // console.log("new twit");
          // console.log(data[i].text);
          //console.log(data[i].user.screen_name);
          // console.log(data[i].user.id);
          timeline_item = {user_id: data[i].user.id, text: data[i].text, created_at: new Date(Date.parse(data[i].created_at.replace(/( +)/, ' UTC$1'))), type: "tweet", account_name: data[i].user.screen_name};
          NewsFeed.insert(timeline_item);
      }
    }).run();    
  });

  var stream = T.stream('statuses/filter', { follow: '19676048' });

  // stream.on('tweet', function (tweet) {
  //   console.log(tweet)
  // });
});