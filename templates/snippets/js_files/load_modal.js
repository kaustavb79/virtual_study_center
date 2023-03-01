//// MODAL on Page Load ////
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-modal")[0];


// When the user clicks the button, open the modal
function showModal() {
    if (typeof(modal) != 'undefined' && modal != null)
    {
      // Exists.
      modal.style.display = "block";
    }
}
showModal();

function close_luein_modal(){
    if(sessionStorage['modalSrc']){
        window.location = sessionStorage.modalSrc;
        sessionStorage.removeItem("modalSrc");
    }
    else{
        window.history.go(-1);
    }
}

// When the user clicks on <span> (x), close the modal
if (typeof(span) != 'undefined' && span != null)
{
    span.onclick = function() {
        close_luein_modal();
    }
}

//When the user clicks on cancel button
$(document).ready(function(){
    $("#modalcancel").click(function(){
        close_luein_modal();
    });
});


// When the user clicks anywhere outside of the modal, CLOSE OPTION LIST OF REGISTER BTN
var modal_content = document.getElementById("modal-content");
var create_account = document.getElementById("create-account");
var create_account_options_div = document.getElementById("create-account-options-div");
window.onclick = function(event) {
  if (event.target != create_account && event.target != create_account_options_div) {
    $("#create-account-options-div").addClass("dn");
    $(".create-account").removeClass("createa");
  }
}
$(".create-account").click(function(){
    $("#create-account-options-div").toggleClass("dn");
    $(".create-account").toggleClass("createa");
})