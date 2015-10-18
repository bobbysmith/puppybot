var request = require('request');
var requestify = require('requestify');

module.exports = function (req, res, next) {

  var puppyUrl;
  requestify.get('http://www.thepuppyapi.com/puppy').then(function (response) {
    response.getBody();

    var resBody = JSON.parse(response.body);
    puppyUrl = resBody.puppy_url;
    console.log(puppyUrl);
  });

  var username = req.body.user_name;

  var botPayload = { text: 'hello @' + username + ' ' + puppyUrl};

  if (username !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}