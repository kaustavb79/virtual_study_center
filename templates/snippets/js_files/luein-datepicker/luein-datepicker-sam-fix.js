
// luein-datepicker-sam-fix js START
//$('.datepicker-here').datepicker({
////    toggleSelected: false,
//    onShow: function(dp, animationCompleted){
//        if (!animationCompleted) {
//            $(".luein-modal-body").addClass("oh");
//            $(".datepickers-container").addClass("zi1 bgba");
////            console.log('start showing')
//        } else {
////            console.log('finished showing')
//        }
//    },
//    onHide: function(dp, animationCompleted){
//        if (!animationCompleted) {
//            $(".luein-modal-body").removeClass("oh");
//            $(".datepickers-container").removeClass("zi1 bgba");
////            console.log('start hiding')
//        } else {
////            console.log('finished hiding')
//        }
//    }
//})
// luein-datepicker-sam-fix js END

//$(".datepicker-here")
//.focusin(function() {
////    if(!$(".datepicker").hasClass('active')){
//        $(".luein-modal-body").addClass("oh");
//        $(".datepickers-container").addClass("zi1 bgba");
////    }
//})
//.focusout(function() {
////    if($(".datepicker").hasClass('active')){
//        $(".luein-modal-body").removeClass("oh");
//        $(".datepickers-container").removeClass("zi1 bgba");
////    }
//});


// disable - open keyboard in mobile phone on choosing date from date picker start
function ldp_media_query(x) {
  if (x.matches) { // If media query matches
    $('.datepicker-here').attr("readonly", "readonly");
  } else {
    $('.datepicker-here').removeAttr("multiple");
  }
}
var ldp_x = window.matchMedia("(max-width: 768px)")
ldp_media_query(ldp_x) // Call listener function at run time
ldp_x.addListener(ldp_media_query) // Attach listener function on state changes
// disable - open keyboard in mobile phone on choosing date from date picker end

