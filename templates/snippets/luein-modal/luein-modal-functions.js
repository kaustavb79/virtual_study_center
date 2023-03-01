console.log("luein-modal-functions.js loaded...");
$(".luein-modal-show").click(function(){
    console.log("luein-modal-show called...");
    luein_modal_open();
});

function luein_modal_open(){
    console.log("luein-modal-open function called...");
    $(".luein-modal-container").css("display", "flex").hide().fadeIn();
    $(".body-class").addClass("modal-open");
    luein_modal_content_clear();
};

function luein_modal_close(){
    $(".luein-modal-container").fadeOut();
    $(".body-class").removeClass("modal-open");
    luein_modal_content_clear();
    datepickers_container_remove();
}

function luein_modal_content_clear(){
    $(".luein-modal-content").html("");
}

// luein-datepicker-sam-fix function start
function datepickers_container_remove(){
    if ($(".datepickers-container").length > 0) {
      // Exists.
      $(".datepickers-container").remove();
    }
}
function datepicker_remove(){
    $(".datepicker").remove();
}
// luein-datepicker-sam-fix function end

