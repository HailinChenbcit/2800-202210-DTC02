// Embedded timezone in login page
function setup() {
    const loginForm = document.querySelector("#loginForm");
    loginForm.onsubmit = function() {
        loginForm.timezoneOffset.value = new Date().getTimezoneOffset();
        return true;
    };
}

document.addEventListener("DOMContentLoaded", setup);