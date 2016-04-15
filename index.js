var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var request = require('request');

<<<<<<< HEAD
var token = "EAAHYY2fZBGAgBAL60bln9uZAZCRHZClVkEMi0ubNZCWjhOSUBNZBaljZCTDduc0dq7pMNcv7umxuisfZClAnsLTZAaVdYouDzxmm5L3nK4GYUVPtf15OQIdww0cNgt3RZACvJoROkAzpESerwuFqXKDnh2VGvoMUDkq7E04kNqXSKwcgZDZD";
=======
var token = "EAAHYY2fZBGAgBACbLIB9YSjzu2qpZA0oiMOyIZCzIpLAvjVIiilKQ8YaNPhTs0pqKE1MLQxZAgyW5euVahH9VkrpbZCThVlp23Sg2jEST1qTs2LwozQZBaBo83ZCoCZBpmktHSVW7dZBgN75DkH8cYmMZCzKT09UbwCRrGHoqdcxlrvgZDZD";
>>>>>>> origin/master

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/webhook/', jsonParser, function (req, res) {
  console.log(req.query);
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    
          if (event.message && event.message.text) {
            text = event.message.text;
            // Your Logic Replaces the following Line
            if (text.toLowerCase() == 'hello' || text.toLowerCase() == 'hey' || text.toLowerCase() == 'hi'){
	            var msg = "Hello! Welcome to Ish7anly. I am happy to help you today. Please type 'Help' in order to see what I can do for you.";
				sendTextMessage(sender, msg);
            }
            else if (text.toLowerCase() =='help'){
	            var msg = 'You can choose any of the following: \n     • Recharge Cards\n     • About us\n     • Contact us\n     ';
	            sendTextMessage(sender, msg);
            }
            else if (text.toLowerCase() == 'Recharge Cards'){
	            var msg = 'What is the name of your carrier? (Zain, Orange, Umniah)';
	            sendTextMessage(sender, msg);
            }
            else if (text.toLowerCase() == 'about us'){
	            var msg = 'You already know who we are....BITCH';
	            sendTextMessage(sender, msg);
            }
            else if (text.toLowerCase() == 'contact us'){
	            var msg = 'Tel : +962799108892';
	            sendTextMessage(sender, msg);
	          
            }
            else if (text.toLowerCase() == 'Zain'){
	            var msg = 'Please choose your denomination (1JD, 3JD, 5JD, 9JD, 12JD';
	            sendTextMessage(sender, msg); 
            }
            else if (text.toLowerCase() == 'show pic'){
	            map(sender);
            }
            else {
	            sendTextMessage(sender, "I'm sorry I didn't catch that. Type in 'Help' for assistance.");
            }
        }
    }
    res.sendStatus(200);
});

app.get('/webhook/', jsonParser, function (req, res) {
  //TODO Remove hardcoded token from .js file
  if (req.query['hub.verify_token'] === 'nassib') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function sendTextMessage(sender, text) {
  messageData = {
    text:text
  };

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}


function map(sender) {
  messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "First card",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
          "buttons": [{
            "type": "web_url",
            "url": "http://ursmarthouse.com/jarvis/iframe.html",
            "title": "Web url"
          }, {
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for first element in a generic bubble",
          }],
        }]      }
    }
  };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}
