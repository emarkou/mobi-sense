Meteor.methods({
  newMessage: function (message) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

    check(message, Match.OneOf(
      {
        text: String,
        type: String,
	classed: String     
      },
      {
        picture: String,
        type: String,
	classed: String
      }    

    ));

    message.timestamp = new Date();
    message.userId = this.userId;

    var messageId = Messages.insert(message);

    console.log("going to insert newsfeed");
    newsfeed_item = {text: message.text, created_at: message.timestamp, user_id: message.userId, type: "text_message", account_name: Meteor.user().services.twitter.screenName};
    var newsfeedId = NewsFeed.insert(newsfeed_item);

    return messageId;
  },

  ProfilePicture: function(){
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }
  var user = Meteor.user();
  var account_name = Meteor.user().services.twitter.screenName
  //this.account_name = account_name;
  return account_name;
  },

    newActivity: function (message) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

    check(message, Match.OneOf(
      {
        text: String,
        type: String,
  classed: String     
      },
      {
        picture: String,
        type: String,
  classed: String
      }
    ));

    message.timestamp = new Date();
    message.userId = this.userId;

    var messageId = Messages.insert(message);

    console.log("going to insert activities");
    activity_item = {text: message.text, created_at: message.timestamp, user_id: message.userId, type: "text_message", account_name: Meteor.user().services.twitter.screenName};
    var activityId = Activity.insert(activity_item);
    console.log('new Activity works just fine')

    return messageId;
   
  },

 
newIdea: function (idea) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to submit an idea.');
    }

    check(idea, Match.OneOf(
      {
        text: String,
        type: String      
      },
      {
        picture: String,
        type: String
      }
    ));

    idea.timestamp = new Date();
    idea.userId = this.userId;

    var ideaId = Ideas.insert(idea);
	activity_item = {text: idea.text, created_at: idea.timestamp, user_id: idea.userId, type: "text_message", account_name: Meteor.user().services.twitter.screenName};
    var activityId = Activity.insert(activity_item);
    return ideaId;
  },
updateName: function (name) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }

    check(name, String);
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must proive user name');
    }

    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },
  newReply: function (reply) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }
        
    check(reply, Match.OneOf(
      {
        text: String,
        type: String,
        messageId: String      
      },
      {
        picture: String,
        type: String,
        messageId: String
      }
    ));

    reply.timestamp = new Date();
    reply.userId = this.userId;

    var replyId = Replies.insert(reply);

    return replyId;
  },  
  // removeChat: function (chatId) {
  //   if (! this.userId) {
  //     throw new Meteor.Error('not-logged-in',
  //       'Must be logged to create a chat.');
  //   }

  //   check(chatId, String);

  //   var chat = Chats.findOne(chatId);
  //   if (! chat || ! _.include(chat.userIds, this.userId)) {
  //     throw new Meteor.Error('chat-not-exists',
  //       'Chat not exists');
  //   }

  //   Messages.remove({ chatId: chatId });

  //   return Chats.remove({ _id: chatId });
  // },
  updatePicture: function (data) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his picture.');
    }

    check(data, String);

    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
});
