document.body.onload = function() {

    try {
        chrome.storage.sync.get(["email", "authorized"], function(items) {
            if (!chrome.runtime.error) {
                document.getElementById("set_email").innerHTML = items.email;
                document.getElementById("set_authorization").innerHTML = items.authorized;
            }
        });
    } catch (e) {
        chrome.extension.getBackgroundPage().console.log(e);
    }

}

document.getElementById("set").onclick = function() {

    document.getElementById("waiting").innerHTML = "Please wait...";
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var md5pass = CryptoJS.MD5(pass).toString();
    chrome.extension.getBackgroundPage().console.log("outside");
    try {
        chrome.extension.getBackgroundPage().console.log("inside try block");

        jQuery.ajax({
            type: "POST",
            url: "http://ping-me.himanshumishra.in/authenticate/",
            data: "email=" + email + "&password=" + md5pass,
            success: function(data) {
                if (data.success == "False") {
                    alert("Sorry, wrong credentials !");
                } else if (data.success == "True") {
                    alert("Congratualtions ! You are now logged in as " + email + ".");
                }
                chrome.storage.sync.set({
                    "email": email,
                    "md5pass": md5pass
                }, function() {
                    if (chrome.runtime.error) {
                        chrome.extension.getBackgroundPage().console.log("Runtime error.");
                    }
                });
                if (data.success == "False") {
                    chrome.storage.sync.set({
                        "authorized": "False"
                    }, function() {
                        if (chrome.runtime.error) {
                            chrome.extension.getBackgroundPage().console.log("Runtime error.");
                        }
                    });
                } else if (data.success == "True") {
                    chrome.storage.sync.set({
                        "authorized": "True"
                    }, function() {
                        if (chrome.runtime.error) {
                            chrome.extension.getBackgroundPage().console.log("Runtime error.");
                        }
                    });
                }
                window.close();
            },

            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error, status = " + textStatus + ", " + "error thrown: " + errorThrown);
            }
        });

    } catch (e) {
        chrome.extension.getBackgroundPage().console.log("Exception caught");
        chrome.extension.getBackgroundPage().console.log(e);
    }

}
