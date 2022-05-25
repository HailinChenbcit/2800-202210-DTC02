$(document).ready(function () {
  $("#registrationForm").validate({
    rules: {
      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
      confirm_password: {
        required: true,
        minlength: 6,
        equalTo: "#password",
      },
    },
    messages: {
      firstname: "Please enter your first name",
      lastname: "Please enter your last name",
      password: {
        required: "Please provide a password",
        minlength: "Must be at least 6 characters",
      },
      confirm_password: {
        required: "Please provide a password",
        minlength: "Must be at least 6 characters",
        equalTo: "Please enter the same password",
      },
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") == "email") error.appendTo("#email_err");
      else if (element.attr("name") == "firstname")
        error.appendTo("#fname_err");
      else if (element.attr("name") == "lastname") error.appendTo("#lname_err");
      else if (element.attr("name") == "password") error.appendTo("#pwd_err");
      else if (element.attr("name") == "confirm_password")
        error.appendTo("#cpwd_err");
      else error.insertAfter(element);
    },
  });
});
