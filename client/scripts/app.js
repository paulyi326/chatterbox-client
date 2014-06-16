// YOUR CODE HERE:
//
var app = {
  // server: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    //init code here
    this.server = 'https://api.parse.com/1/classes/chatterbox';
    this.currentRoom = 1;
    this.allocatedRooms = 1;
    // var gotInput = false;
    // while(!gotInput){
    //   var name = prompt('Enter name');
    //   if( confirm('Confirm your name is ' + name) ){
    //     gotInput = true;
    //   }
    // }
    // this.username = name;
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
    var newMessage  = $('<li>' + message.name + ': ' + message.text + '</li>');
    $('#chats').append(newMessage);
  },

  addRoom: function(roomName) {
    var newRoom = $('<button type="button">' + roomName + '</button>');
    $('#roomSelect').append(newRoom);
  }
};

app.init();
