// background.js

//setInterval(send_request(), 5000);
/*
setInterval(function() {

    var email;
    var md5pass;
    chrome.storage.sync.get(["email", "authorized", "md5pass"], function(items) {
            if (!chrome.runtime.error) {
                if (items.authorized == "True") {
                    email = items.email;
                    md5pass = items.md5pass;
                }
            }
        });

    console.log("Doing a check");
    console.log("email = " + email);
    console.log("md5pass = " + md5pass);
        jQuery.ajax({
            type: "POST",
            url: "http://ping-me.himanshumishra.in/authenticate/",
            data: "email=" + email + "&password=" + md5pass,
            success: function(data) {
                    console.log(data.success);
                    if (data.success == "True") {
                        alert(data.message);
                    };
                }
        });
    }

, 5000);

*/