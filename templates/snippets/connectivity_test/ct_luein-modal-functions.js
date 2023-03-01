console.warn("ct_luein-modal-functions.js loaded...");


$(".ct_luein-modal-show").click(function(){
    console.warn("ct_luein-modal-show called...");
    ct_luein_modal_open();
});

function ct_luein_modal_open(){
    console.warn("ct_luein-modal-open function called...");
    $(".ct_luein-modal-container").css("display", "flex").hide().fadeIn();
    $(".body-class").addClass("modal-open");
//    ct_luein_modal_content_clear();
    ct_luein_modal_events();
};

function ct_luein_modal_close(){
    $(".ct_luein-modal-container").fadeOut();
    $(".body-class").removeClass("modal-open");
//    ct_luein_modal_content_clear();
    datepickers_container_remove();
//    force_stop
}

function ct_luein_modal_content_clear(){
    $(".ct_luein-modal-content").html("");
}

// ct_luein-datepicker-sam-fix function start
function datepickers_container_remove(){
    if ($(".datepickers-container").length > 0) {
      // Exists.
      $(".datepickers-container").remove();
    }
}
function datepicker_remove(){
    $(".datepicker").remove();
}
// ct_luein-datepicker-sam-fix function end

