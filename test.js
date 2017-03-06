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