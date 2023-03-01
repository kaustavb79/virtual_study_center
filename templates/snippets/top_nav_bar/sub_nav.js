

////////////////////////////////////
// top nav bar active logic start //
////////////////////////////////////

$(document).ready(function() {
    if (wlp.indexOf("/registration/") > -1){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_registration_div .sub_nav_a').addClass('active');
    }
    if (wlp.indexOf("/student/") > -1){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_students_div .sub_nav_a').addClass('active');
    }
    if (wlp.indexOf("/teacher/staff/") > -1){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_staff_div .sub_nav_a').addClass('active');
    }

    if (wlp.indexOf("/take_attendance/") > -1){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_take_attendance_div .sub_nav_a').addClass('active');
    }
    if (wlp.indexOf("/attendance/") > -1){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_attendance_div .sub_nav_a').addClass('active');
    }
    if (wlp.indexOf("/report/") > -1){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_report_div .sub_nav_a').addClass('active');
    }
    if (wlp.indexOf("/classes/") > -1){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_classes_div .sub_nav_a').addClass('active');
    }
    if (wlp.indexOf("/settings/") > -1){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_settings_div .sub_nav_a').addClass('active');
    }
    if (
        (wlp.indexOf("/school_list/") > -1)||
        (wlp.indexOf("/school/") > -1)
    ){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_school_div .sub_nav_a').addClass('active');
    }
    if (
        (wlp.indexOf("/organisation_list/") > -1)
    ){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_school_div .sub_nav_a').addClass('active');
    }
    if (wlp.indexOf("/file_manager/") > -1){
        $('.sub_nav_a').removeClass('active');
        $('.sub_nav_media_div .sub_nav_a').addClass('active');
    }
});
// top nav bar active logic end //

