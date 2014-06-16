// YOUR CODE HERE:
//
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    //init code here
  },
  send: function(message){
    //send code here
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      success: function(data){
        console.log('chatterbox: Message sent');
      },
      error: function(data){
        console.error('chatterbox: Failed to send message');      }
    });
  },
  fetch: function(callback){
    //fetch code here
    $.ajax({
      url: app.server,
      type: "GET",
      dataType: 'json',
      success: function(data){
        callback(data);
      },
      error: function(xhr,status){
        console.log(xhr.statusText);
      }
    });
  }
};

app.init();
