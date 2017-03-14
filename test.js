<<<<<<< HEAD
let window;
window.fbAsyncInit = function() {
    FB.init({
        appId: "1227898667329148",
        status: true,
        cookie: true
    });

    // Additional initialization code here
};

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

function invite() {
    FB.ui({
        method: "apprequests",
        message: "Check out my great app"
    }, inviteCallback);
}

function inviteCallback(response) {
    console.log(response);
}
=======
var http = require('http');
var p='EAACEdEose0cBANv15ZA6Qq3ZBg1Nwh8A2XeNMicV2L5l5w20KcJZCv9j1w3KjwazUIb8hHcYAQHg4BaUSn3PId1RIQzFp1pjDPkO7U3zcsKvZCsYI1W1ZAyiZAHEENrXkU8gXr8GloxMGZATOU01eX9nOPkFvZBjaxZBccPEk0A1xF2K6eP5awTE0EIJ6esC7nAEZD'
exports.getFbData = function(accessToken, apiPath, callback) {
    var options = {
        host: 'graph.facebook.com',
        port: 443,
        path: apiPath + '?access_token=' + accessToken, //apiPath example: '/me/friends'
        method: 'GET'
    };

    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = http.get(options, function(result){
        result.setEncoding('utf8');
        result.on('data', function(chunk){
            buffer += chunk;
        });

        result.on('end', function(){
            callback(buffer);
        });
    });

    request.on('error', function(e){
        console.log('error from facebook.getFbData: ' + e.message)
    });

    request.end();
}(p, 'me?fields=friends', function(data){
    console.log(data);
});
>>>>>>> fc1eede8485e2ab858d4019a9494e54f59832692
