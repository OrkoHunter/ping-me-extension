document.body.onload = function() {
  chrome.storage.sync.get(["email", "password"], function(items) {
    if (!chrome.runtime.error) {
      document.getElementById("set_email").innerHTML = items.email;
      document.getElementById("set_password").innerHTML = items.password;
    }
  });
}

document.getElementById("set").onclick = function() {

    chrome.extension.getBackgroundPage().console.log("clicked!")

    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    //chrome.extension.getBackgroundPage().console.log("email=" + email);
    //chrome.extension.getBackgroundPage().console.log("pass=" + pass);

    chrome.extension.getBackgroundPage().console.log("outside")
    try {
      chrome.extension.getBackgroundPage().console.log("inside try block")
      /*
      jQuery.post("http://ping-me.himanshumishra.in/ping/", "email=himanshu&password=dsd", function(data) {
        var s = data.success;
        chrome.extension.getBackgroundPage().alert("data.success");
        var r = data.reason;
        chrome.extension.getBackgroundPage().console.log("r and s = " + data.success + " " + data.reason + " " + data);
        });
      */
      jQuery.ajax({
        type: "POST",
        url: "http://ping-me.himanshumishra.in/ping/",
        data: "email=himanshu&password=dsd",
        success: function(data) {alert("success"); var b = data.success; alert(b);},
        error:   function(jqXHR, textStatus, errorThrown) {
          alert("Error, status = " + textStatus + ", " +
            "error thrown: " + errorThrown
      );
      }});


      alert("Done");
    } catch (e) {
      chrome.extension.getBackgroundPage().console.log("Exception caught")
      chrome.extension.getBackgroundPage().console.log(e)
    }

    chrome.storage.sync.set({ "email" : email , "password" : pass }, function() {
      if (chrome.runtime.error) {
        chrome.extension.getBackgroundPage().console.log("Runtime error.");
      }
    });
    window.close();
  }
