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
                    if (response2.success == "True") {
                        notifyMe(response2.cipher);
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    notifyMe("some error" + textStatus + "  " + errorThrown);
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
                        decryptAndAlert(password, response.message);
                    }
                }
            });

        });

    }

    , 60000);

function notifyMe(message) {
    try
      {if (!Notification) {
              alert('Desktop notifications not available in your browser. Try Chromium.');
              return;
            }

            if (Notification.permission !== "granted")
              Notification.requestPermission();
            else {
              var notification = new Notification('ping-me', {
                icon: 'icon.png',
                body: message,
              });

              notification.onclick = function () {
                // do nothing
              };

            }}
        catch (e) {console.log(e);}

}
