function secondExample() {
  for (;;) {
    var c = prompt("Enter number of minutes");
    c = parseInt(c);
    if (c >= 0 && c < 60) break;
    else alert("Enter number between 0 and 60");
  }

  var yourDateToGo3 = new Date();
  yourDateToGo3.setMinutes(yourDateToGo3.getMinutes() + c);

  var timing3 = setInterval(function () {
    var currentDate3 = new Date().getTime();
    var timeLeft3 = yourDateToGo3 - currentDate3;

    var minutes3 = Math.floor((timeLeft3 % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes3 < 10) minutes3 = "0" + minutes3;
    var seconds3 = Math.floor((timeLeft3 % (1000 * 60)) / 1000);
    if (seconds3 < 10) seconds3 = "0" + seconds3;

    document.getElementById("countdown3").innerHTML =
      minutes3 + "m " + seconds3 + "s";
    if (timeLeft3 <= 0) {
      clearInterval(timing3);
      document.getElementById("countdown3").innerHTML =
        "Your worry time has ended!";
    }
  }, 1000);
}

document.getElementById("btnId2").addEventListener("click", secondExample);
