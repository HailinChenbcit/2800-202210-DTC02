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

var timer = 0;

var textarea = document.getElementById('worryDescription');

document.getElementById('worryDescription').onkeyup = function(){
  
  var text_value = document.getElementById('worryDescription').value;
  
  if (text_value.includes("Today is my birthday") === true) {
    var repeater = setInterval(function() {
      const container = document.querySelector('.worryInputContainer');
      const generate = document.createElement('form');
      generate.classList.add('emoji');
      generate.innerHTML = '🎂';
      container.appendChild(generate);
      timer++;
      console.log(timer)
      generate.style.left = Math.random() * 100 + 'vw';
      generate.style.animationDuration = Math.random() * 3 + 4 + "s";
      container.appendChild(generate)
        setTimeout(() => {
        generate.remove();
      }, 3000); 
    
      if (timer == 100) {
        window.clearInterval(repeater)
        timer = 0;
      }
    })
  }
};