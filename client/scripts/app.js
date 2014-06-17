// YOUR CODE HERE:
//
var app = {
  // server: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    //init code here
    $('#chatInput').on("submit", function(event){
      event.preventDefault();
      // console.log('insdie chat input');
      console.log($('#formInput').val());
      var message = {
        text: $('#formInput').val(),
        username: app.username,
        roomname: app.currentRoom
      };
      app.send(message);
    });
    // List of HTML entities for escaping.
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };

    // Regex containing the keys listed immediately above.
    var htmlEscaper = /[&<>"'\/]/g;

    // Escape a string for HTML interpolation.
    this._escape = function(string) {
      return ('' + string).replace(htmlEscaper, function(match) {
        return htmlEscapes[match];
      });
    };

    this.server = 'https://api.parse.com/1/classes/chatterbox';
    this.currentRoom = 'lobby';
    this.username = 'Paul';
    this._refresh();

    setInterval( this._refresh.bind(this), 1000);
  },

  send: function(message){
    //send code here
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
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
      url: this.server + '?order=-createdAt',
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
    var newName = app._escape(message.username);
    var newText = app._escape(message.text);
    var createdAt = app._escape(message.createdAt);
    var newMessage  = $('<li>' + newName + ': ' + newText + '  createdAt: ' + createdAt + '</li>');
    // var newMessage  = $('<li>' + message.username + ': ' + message.text + '</li>');
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

    app.fetch(function(messages) {
      messages = messages.results;

      messages = _.filter(messages,function(message){
        return message.roomname === app.currentRoom;
      });
      messages = messages.slice(0, 30);
      app.clearMessages();

      _.each(messages, function(message) {
        app.addMessage(message);
      });
    });
  }
};

app.init();
