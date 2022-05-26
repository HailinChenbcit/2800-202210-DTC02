/**
 *  I found this code on https://www.w3schools.com.
 *
 * @author contribute@w3schools
 * @see https://www.w3schools.com/howto/howto_js_countdown.asp
 */
// Time counter display with hour, minute and second
function counter() {
  var totalTime = parseInt($("#totalworrytime").text());
  var hrs = Math.floor(totalTime / 60);
  var min = totalTime % 60;

  var yourDateToGo = new Date();
  yourDateToGo.setMinutes(yourDateToGo.getMinutes() + min);
  yourDateToGo.setHours(yourDateToGo.getHours() + hrs);

  var timing = setInterval(function () {
    var currentDate = new Date().getTime();
    var timeLeft = yourDateToGo - currentDate;

    var hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    if (hours < 10) hours = "0" + hours;
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) minutes = "0" + minutes;
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    if (seconds < 10) seconds = "0" + seconds;

    document.getElementById("countdown").innerHTML =
      hours + "h " + minutes + "m " + seconds + "s";
    if (timeLeft <= 0) {
      clearInterval(timing);
      document.getElementById("countdown").innerHTML =
        "Your worry time has ended!";
    }
  }, 1000);
}

// Select and delete all worry entries
$("#selectall").change(function () {
  if ($(this).is(":checked")) {
    $(".form-check-input").each(function () {
      $(this).prop("checked", true);
    });
  } else {
    $(".form-check-input").each(function () {
      $(this).prop("checked", false);
    });
  }
});

// If all worries are checked, will be unchecked
$(".form-check-input").change(function () {
  var allSelected = true;

  $(".form-check-input").each(function () {
    if (!$(this).is(":checked")) {
      $("#selectall").prop("checked", false);
      allSelected = false;
    }
  });

  if (allSelected) $("#selectall").prop("checked", true);
});

// Exiting worry time and exit worrytime and back to home page
async function exitWorryTime() {
  const resp = await fetch(
    location.pathname.replace("duringWorryTime", "finishWorryTime")
  );
  window.location.href = "/home";
}

document
  .querySelector("#confirmExitWorryTime")
  .addEventListener("click", exitWorryTime);

// Deletes selected checboxes and delete all
$(document).ready(function () {
  counter();
  var worryIds = [];
  // Selects each checkbox
  $(document).on("change", ".form-check-input", function () {
    if (this.checked) {
      worryId = $(this).parent().parent().attr("id");
      if (worryIds.includes(worryId)) {
        //pass
      } else {
        worryIds.push(worryId);
      }
    } else {
      if (worryIds.includes(worryId)) {
        worryIds.shift();
      } else {
      }
    }
  });
  // Checks selectall checbox
  $(document).on("change", "#selectall", function () {
    if (this.checked) {
      $(".form-check input:checked").each(function () {
        worryId = $(this).parent().parent().attr("id");
        worryIds.push(worryId);
      });
    } else {
      worryIds = [];
    }
  });

  // Updates selected entries to 'finished'
  $("#deleteWorry").click(function (e) {
    e.preventDefault();
    for (i = 0; i < worryIds.length; i++) {
      // Deletes selected entries in broswer
      $(`#${worryIds[i]}`).remove();
      // Removes entry in DB
      $.ajax({
        url: `/finishWorryEntry/${worryIds[i]}`,
        type: "GET",
        success: function () {
          console.log(`Successful updated id: ${worryIds[i]}`);
        },
      });
    }
  });
});
