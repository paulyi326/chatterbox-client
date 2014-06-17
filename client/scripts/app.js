// YOUR CODE HERE:
//
var app = {
  // server: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    //init code here
    $('#chatInput').submit(function(evt){
      var message = {
        text: $('#chatInput').val(),
        username: app.username,
        roomname: app.currentRoom
      };
      app.send(message);
    });

    this.server = 'https://api.parse.com/1/classes/chatterbox';
    this.currentRoom = 'lobby';
    // var gotInput = false;
    // while(!gotInput){
    //   var name = prompt('Enter name');
    //   if( confirm('Confirm your name is ' + name) ){
    //     gotInput = true;
    //   }
    // }
    this.username = 'Paul';
    this._refresh();

    setInterval( this._refresh.bind(this), 5000);
  },

  send: function(message){
    //send code here
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      success: function(data){
        console.log('chatterbox: Message sent');
      },
      error: function(data){
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  fetch: function(callback){
    //fetch code here
    $.ajax({
      url: this.server,
      type: "GET",
      dataType: 'json',
      success: function(data){
        callback(data);
      },
      error: function(xhr,status){
        console.log(xhr.statusText);
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  addMessage: function(message) {
    var newMessage  = $('<li>' + _.escape(message.username) + ': ' + _.escape(message.text) + '</li>');
    $('#chats').append(newMessage);
  },

  addRoom: function(roomName) {
    var newRoom = $('<button type="button">' + roomName + '</button>');
    newRoom.data("roomName", roomName);
    newRoom.on("click", function(event) {
      app.currentRoom = roomName;
      app.clearMessages();
      app.fetch(function(messages) {
        messages = _.filter(messages, function(message) {
          return message.roomname === roomName;
        });
        _.each(messages, function(message) {
          app.addMessage(message);
        });
      });
    });
    $('#roomSelect').append(newRoom);
  },

  _refresh: function() {
    app.clearMessages();

    app.fetch(function(messages) {
      messages = messages.results;

      messages = _.filter(messages,function(message){
        return message.roomname === app.currentRoom;
      });

      _.each(messages, function(message) {
        app.addMessage(message);
      });
    });
  }
};

app.init();
