// SET default time in timepicker
$.fn.setNow = function (onlyBlank) {
  var now = new Date($.now()),
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    formattedDateTime;

  // Converting the date to string
  year = now.getFullYear();
  month =
    now.getMonth().toString().length === 1
      ? "0" + (now.getMonth() + 1).toString()
      : now.getMonth() + 1;
  date =
    now.getDate().toString().length === 1
      ? "0" + now.getDate().toString()
      : now.getDate();
  hours =
    now.getHours().toString().length === 1
      ? "0" + now.getHours().toString()
      : now.getHours();
  minutes =
    now.getMinutes().toString().length === 1
      ? "0" + now.getMinutes().toString()
      : now.getMinutes();
  seconds =
    now.getSeconds().toString().length === 1
      ? "0" + now.getSeconds().toString()
      : now.getSeconds();

  // Format for date time
  formattedDateTime =
    year +
    "-" +
    month +
    "-" +
    date +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  if (onlyBlank === true && $(this).val()) {
    return this;
  }

  $(this).val(formattedDateTime);

  return this;
};

$(function () {
  $('input[type="datetime-local"]').setNow();
});

// Global variable
var timer = 0;

var textarea = document.getElementById("worryDescription");

// Detect what is being inputted in the worryDescription textarea
document.getElementById("worryDescription").onkeyup = function () {
  var text_value = document.getElementById("worryDescription").value;

  // Triggers the "I love myself" Easter Egg if phrase is detected
  if (text_value.includes("I love myself") === true) {
    var repeater = setInterval(function () {
      const container = document.querySelector(".worryInputContainer");
      const generate = document.createElement("div");
      generate.classList.add("emoji");
      generate.innerHTML = "💜";
      container.appendChild(generate);
      timer++;
      generate.style.left = Math.random() * 100 + "vw";
      generate.style.animationDuration = Math.random() * 3 + 4 + "s";
      container.appendChild(generate);
      setTimeout(() => {
        generate.remove();
      }, 3000);

      // Stop appending emojis, when ten are created on the page
      if (timer >= 10) {
        window.clearInterval(repeater);
      }
    });
    // Triggers the "It is my birthday" Easter Egg if phrase is detected and "I love myself" Easter Egg is not active
  } else if (text_value.includes("It is my birthday") === true) {
    var repeater = setInterval(function () {
      const container = document.querySelector(".worryInputContainer");
      const generate = document.createElement("div");
      generate.classList.add("emoji");
      generate.innerHTML = "✨";
      container.appendChild(generate);
      timer++;
      generate.style.left = Math.random() * 100 + "vw";
      generate.style.animationDuration = Math.random() * 3 + 4 + "s";
      container.appendChild(generate);
      setTimeout(() => {
        generate.remove();
      }, 3000);

      // Stop appending emojis, when ten are created on the page
      if (timer >= 10) {
        window.clearInterval(repeater);
      }
    });
  }
};
