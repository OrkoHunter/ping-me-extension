// background.js
setInterval(function() {
        var email;
        var password;

        var decryptAndAlert = function(md5pass, message) {
            jQuery.ajax({
                type: "POST",
                url: "http://ping-me.himanshumishra.in/cryptex/",
                data: "key=" + md5pass.toString() + "&cipher=" + message.toString(),
                success: function(response2) {
                    console.log(response2);
                    if (response2.success == "True") {
                        alert(response2.cipher);
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("some error" + textStatus + "  " + errorThrown);
                }
            });
        };


        chrome.storage.sync.get(function(localData) {
            if (localData.authorized == "True") {
                email = localData.email;
                password = localData.md5pass;
            }
            jQuery.ajax({
                type: "POST",
                url: "http://ping-me.himanshumishra.in/ping/",
                data: "email=" + email + "&password=" + password,
                success: function(response) {
                    if (response.success == "True") {
                        console.log(password);
                        console.log(response.message);
                        decryptAndAlert(password, response.message);
                    }
                }
            });

        });

    }

    , 5000);
