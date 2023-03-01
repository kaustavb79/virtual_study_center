
$(document).ready(function(){
  $("#employer-signup-form").on("submit", function(){
        dynamic_loader_start();
  });
});

///////////////////////////////////
//      USERNAME check start     //
///////////////////////////////////
var user_spcl = "valid";        //this line bypass spcl check
var user_len = "invalid";
//var user_spcl = "invalid";
var user_avl = "invalid";
{% if candidate_user_form.username.errors %}
    user_len = "invalid";
//    user_spcl = "invalid";
    user_avl = "invalid";
//    document.getElementById("id_username").focus();
{% else %}
    user_len = "valid";
//    user_spcl = "valid";
    user_avl = "valid";
{% endif %}
var username = "";

document.getElementById("id_username").addEventListener("focusout", function (evt) {
username = document.getElementById("id_username").value;
    if(username.length>0){
        user_len = "valid";
    } else {
        user_len = "invalid";
    }
//    var specialchar;
//    specialchar = (username.match(/^[a-zA-Z0-9]+$/)) ? true : false;
//    if(specialchar==false)
//    {
//        user_spcl = "invalid";
//    }
//    else{
//        user_spcl = "valid";
//    }
    check_username();
});

function check_username(){
    if(user_len=="valid"){
        $(".username-len").addClass("dnone");
    }
    else{
        $(".username-len").text("*Please fill in this field.");
        $(".username-len").removeClass("dnone");
        $(".username-valid-avl").addClass("dnone");
        $("#username-check-ul").removeClass("dnone");
        document.getElementById("username-check-ul").style.color = "red";
        $(".usererror").remove();
//        document.getElementById("id_username").focus();
    }
    if(user_spcl=="valid"){
        $(".username-spcl").addClass("dnone");
        }
        else{
          $(".username-spcl").text("Enter a valid username. This value may contain only letters, numbers.");
          $(".username-spcl").removeClass("dnone");
          $(".username-valid-avl").addClass("dnone");
          $("#username-check-ul").removeClass("dnone");
          document.getElementById("username-check-ul").style.color = "red";
          $(".usererror").remove();
        }
    if(user_len=="valid" && user_spcl=="valid"){
        valid_user_available();
    }
}

document.getElementById("id_username").addEventListener("focusout", function (evt) {
    if(user_len=="invalid" || user_spcl=="invalid"|| user_avl=="invalid"){
//          document.getElementById("id_username").focus();
    }
});

function valid_user_available() {
  $.ajax({
    type: "POST",
    url: '{% url "app_root:validate_username" %}?username='+username,
    data: {
      'username': username,
      'csrfmiddlewaretoken': '{{ csrf_token }}'
    },
    dataType: 'json',
    success: function (data) {
      if (data.is_taken) {
        $(".username-valid-avl").text("A user with this username already exists.");
        user_avl = "invalid";
//        document.getElementById("id_username").focus();
        document.getElementById("username-check-ul").style.color = "red";
      }
      else{
        $(".username-valid-avl").text("Username available");
        user_avl = "valid";
        document.getElementById("username-check-ul").style.color = "green";
      }
        $(".username-valid-avl").removeClass("dnone");
        $("#username-check-ul").removeClass("dnone");
        $(".usererror").addClass("dnone");
    }
  });
};
// USERNAME check end //


///////////////////////////////////
//      EMAIL ID check start     //
///////////////////////////////////
//emp-job-inv-cnd  invite new candidate
var pass_val = "invalid";
var pass_val = "invalid";

var email_avl = "invalid";
{% if candidate_user_form.username.errors %}
    email_val = "invalid";
    email_avl = "invalid";
//    document.getElementById("id_email").focus();
{% else %}
    email_val = "valid";
    email_avl =  "valid";
{% endif %}
var email = "";

document.getElementById("id_email").addEventListener("focusout", function (evt) {
email = document.getElementById("id_email").value;
    if (isEmail($('#id_email').val())){
        email_val = "valid";
    }
    else{
//        document.getElementById("id_email").focus();
        email_val = "invalid";
    }
    function isEmail(email) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    }
    check_email();
});

function check_email(){
    if(email_val=="valid"){
        $(".email-val").addClass("dnone");
    }
    else{
        $(".email-val").text("Enter a valid email.");
        $(".email-val").removeClass("dnone");
        $(".email-valid-avl").addClass("dnone");
        $("#email-check-ul").removeClass("dnone");
        document.getElementById("email-check-ul").style.color = "red";
        $(".usererror").remove();
//        document.getElementById("id_email").focus();
    }
    if(email_val=="valid"){
        valid_email_available();
    }
}

document.getElementById("id_email").addEventListener("focusout", function (evt) {
    if(email_val=="invalid" || email_avl=="invalid"){
//          document.getElementById("id_email").focus();
    }
});

function valid_email_available() {
  $.ajax({
    type: "POST",
    url: '{% url "app_root:validate_email" %}?email='+email,
    data: {
      'email': email,
      'csrfmiddlewaretoken': '{{ csrf_token }}'
    },
    dataType: 'json',
    success: function (data) {
      if (data.is_taken) {
        $(".email-valid-avl").text("A user with this email already exists.");
        email_avl = "invalid";
//        document.getElementById("id_email").focus();
        document.getElementById("email-check-ul").style.color = "red";
      }
      else{
        $(".email-valid-avl").text("Email available");
        email_avl = "valid";
        document.getElementById("email-check-ul").style.color = "green";
      }
        $(".email-valid-avl").removeClass("dnone");
        $("#email-check-ul").removeClass("dnone");
        $(".emailerror").addClass("dnone");
    }
  });
};
// candidate signup page EMAIL ID check end //



