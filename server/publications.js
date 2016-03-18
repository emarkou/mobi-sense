Meteor.publish('userData', function () {
  return Meteor.users.find({_id: this.userId}, { fields: { profile: 1, 'services.twitter': 1 } });
});

Meteor.publishComposite('replies', function () {
  if (! this.userId) {
    return;
  }

  return {
    find: function () {
      return Replies.find();
    }    
  }
});

Meteor.publishComposite('messages', function () {
  return {
    find: function () {
      return Messages.find();
    },
    children: [
      {
        find: function (message) {
          var query = { _id: message.userId };
          var options = { fields: { 'services.twitter.profile_image_url': 1 } };
          return Meteor.users.find(query, options);
        }
      }
    ]
  }
});



Meteor.publish('routes', function (query) {
    
  //return Routes.find({route_id: "Μ1-20", agency_key: "oasa2"});
  console.log("entered routes");
  console.log(query);
  return Routes.find({route_id: query.route_id, agency_key: query.agency_key});
  //return Feeds.find({route_id: {$in: feeds}});    
});

Meteor.publish('all-routes', function () {    
  console.log("entered all-routes");  
  return Routes.find({agency_key: 'oasa'}, { fields: { route_id: true, route_short_name: true, route_long_name: true, stopsNumber: true } });
});

Meteor.publish('get-stops', function (options) {    
  console.log("entered get-stops");  
  console.log(options);
  route = Routes.find({agency_key: 'oasa', route_id: options.route_id}, { fields: { route_id: true, route_short_name: true, route_long_name: true, stops: true, stopsNumber: true } });  
  return route;
});

Meteor.publish('search-routes', function (query) {
  console.log(query.searchString);
  if (!query.searchString || query.searchString == null) {
    query.searchString = '';
  }
  selector = {agency_key: "oasa",
   $or: [{route_short_name: { '$regex' : '.*' + query.searchString }}, 
    {route_long_name: { '$regex' : '.*' + query.searchString }}]
  };
  console.log(selector);
  routes = Routes.find(selector,
    {route_short_name: 1, route_long_name: 1, route_id: 1, stops: 1});
  console.log(routes.count());
  return routes;
    
});
  
Meteor.publish('activity', function () {    
  console.log("entered activity");  
  return Activity.find({}, {sort: {created_at: -1}}, {limit : 10});
});

Meteor.publish('newsfeed', function () {    
  console.log("entered newsfeed");  
  return NewsFeed.find({}, {sort: {created_at: -1}}, {limit : 10});
});


