// YOUR CODE HERE:
//
var app = {
  init: function(){
    //init code here
  },
  send: function(message){
    //send code here
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      success: function(data){
        console.log('chatterbox: Message sent');
      },
      error: function(data){
        console.error('chatterbox: Failed to send message');      }
    });
  },
  fetch: function(){
    //fetch code here
  }
};

