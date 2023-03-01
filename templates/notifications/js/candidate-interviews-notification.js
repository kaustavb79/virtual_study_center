
//var scheduleJSON = {
//	"time_zone": "-12",
//	"slots": ["2020-02-01 12:00am", "2020-02-01 12:15am", "2020-02-01 12:30am"],
//	"selected_slot": "",
//  "schedule_status": "no_response, accept , reject, reschedule",
//};
// add infor icon in the employer-job-detail view - candidate - live_assessment
var info_fafa = '<svg x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#440055"><path d="M86,21.5c-35.62237,0 -64.5,28.87763 -64.5,64.5c0,35.62237 28.87763,64.5 64.5,64.5c35.62237,0 64.5,-28.87763 64.5,-64.5c0,-35.62237 -28.87763,-64.5 -64.5,-64.5z" opacity="0.3"></path><path d="M93.16667,121.83333h-14.33333v-43h14.33333zM93.16667,64.5h-14.33333v-14.33333h14.33333z"></path><path d="M86,157.66667c-39.41667,0 -71.66667,-32.25 -71.66667,-71.66667c0,-39.41667 32.25,-71.66667 71.66667,-71.66667c39.41667,0 71.66667,32.25 71.66667,71.66667c0,39.41667 -32.25,71.66667 -71.66667,71.66667zM86,28.66667c-31.53333,0 -57.33333,25.8 -57.33333,57.33333c0,31.53333 25.8,57.33333 57.33333,57.33333c31.53333,0 57.33333,-25.8 57.33333,-57.33333c0,-31.53333 -25.8,-57.33333 -57.33333,-57.33333z"></path></g></g></svg>';
$(".info-fafa").html(info_fafa);

var info_fafa_small = '<svg x="0px" y="0px" width="16" height="16" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#440055"><path d="M86,21.5c-35.62237,0 -64.5,28.87763 -64.5,64.5c0,35.62237 28.87763,64.5 64.5,64.5c35.62237,0 64.5,-28.87763 64.5,-64.5c0,-35.62237 -28.87763,-64.5 -64.5,-64.5z" opacity="0.3"></path><path d="M93.16667,121.83333h-14.33333v-43h14.33333zM93.16667,64.5h-14.33333v-14.33333h14.33333z"></path><path d="M86,157.66667c-39.41667,0 -71.66667,-32.25 -71.66667,-71.66667c0,-39.41667 32.25,-71.66667 71.66667,-71.66667c39.41667,0 71.66667,32.25 71.66667,71.66667c0,39.41667 -32.25,71.66667 -71.66667,71.66667zM86,28.66667c-31.53333,0 -57.33333,25.8 -57.33333,57.33333c0,31.53333 25.8,57.33333 57.33333,57.33333c31.53333,0 57.33333,-25.8 57.33333,-57.33333c0,-31.53333 -25.8,-57.33333 -57.33333,-57.33333z"></path></g></g></svg>';
$(".info-fafa-small").html(info_fafa_small);

$(".info-fafa").click(function(){
    var info_div_id = $(this).data('id');
})
var live_filters_active = [];





var tzInts = [
    {"label":"(GMT-12:00) International Date Line West","value":"-12"},
    {"label":"(GMT-11:00) Midway Island, Samoa","value":"-11"},
    {"label":"(GMT-10:00) Hawaii","value":"-10"},
    {"label":"(GMT-09:00) Alaska","value":"-9"},
    {"label":"(GMT-08:00) Pacific Time (US & Canada)","value":"-8"},
    {"label":"(GMT-08:00) Tijuana, Baja California","value":"-8"},
    {"label":"(GMT-07:00) Arizona","value":"-7"},
    {"label":"(GMT-07:00) Chihuahua, La Paz, Mazatlan","value":"-7"},
    {"label":"(GMT-07:00) Mountain Time (US & Canada)","value":"-7"},
    {"label":"(GMT-06:00) Central America","value":"-6"},
    {"label":"(GMT-06:00) Central Time (US & Canada)","value":"-6"},
    {"label":"(GMT-05:00) Bogota, Lima, Quito, Rio Branco","value":"-5"},
    {"label":"(GMT-05:00) Eastern Time (US & Canada)","value":"-5"},
    {"label":"(GMT-05:00) Indiana (East)","value":"-5"},
    {"label":"(GMT-04:00) Atlantic Time (Canada)","value":"-4"},
    {"label":"(GMT-04:00) Caracas, La Paz","value":"-4"},
    {"label":"(GMT-04:00) Manaus","value":"-4"},
    {"label":"(GMT-04:00) Santiago","value":"-4"},
    {"label":"(GMT-03:30) Newfoundland","value":"-3.5"},
    {"label":"(GMT-03:00) Brasilia","value":"-3"},
    {"label":"(GMT-03:00) Buenos Aires, Georgetown","value":"-3"},
    {"label":"(GMT-03:00) Greenland","value":"-3"},
    {"label":"(GMT-03:00) Montevideo","value":"-3"},
    {"label":"(GMT-02:00) Mid-Atlantic","value":"-2"},
    {"label":"(GMT-01:00) Cape Verde Is.","value":"-1"},
    {"label":"(GMT-01:00) Azores","value":"-1"},
    {"label":"(GMT+00:00) Casablanca, Monrovia, Reykjavik","value":"0"},
    {"label":"(GMT+00:00) Dublin, Edinburgh, Lisbon, London","value":"0"},
    {"label":"(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna","value":"1"},
    {"label":"(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague","value":"1"},
    {"label":"(GMT+01:00) Brussels, Copenhagen, Madrid, Paris","value":"1"},
    {"label":"(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb","value":"1"},
    {"label":"(GMT+01:00) West Central Africa","value":"1"},
    {"label":"(GMT+02:00) Amman","value":"2"},
    {"label":"(GMT+02:00) Athens, Bucharest, Istanbul","value":"2"},
    {"label":"(GMT+02:00) Beirut","value":"2"},
    {"label":"(GMT+02:00) Cairo","value":"2"},
    {"label":"(GMT+02:00) Harare, Pretoria","value":"2"},
    {"label":"(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius","value":"2"},
    {"label":"(GMT+02:00) Jerusalem","value":"2"},
    {"label":"(GMT+02:00) Minsk","value":"2"},
    {"label":"(GMT+02:00) Windhoek","value":"2"},
    {"label":"(GMT+03:00) Kuwait, Riyadh, Baghdad","value":"3"},
    {"label":"(GMT+03:00) Moscow, St. Petersburg, Volgograd","value":"3"},
    {"label":"(GMT+03:00) Nairobi","value":"3"},
    {"label":"(GMT+03:00) Tbilisi","value":"3"},
    {"label":"(GMT+03:30) Tehran","value":"3.5"},
    {"label":"(GMT+04:00) Abu Dhabi, Muscat","value":"4"},
    {"label":"(GMT+04:00) Baku","value":"4"},
    {"label":"(GMT+04:00) Yerevan","value":"4"},
    {"label":"(GMT+04:30) Kabul","value":"4.5"},
    {"label":"(GMT+05:00) Yekaterinburg","value":"5"},
    {"label":"(GMT+05:00) Islamabad, Karachi, Tashkent","value":"5"},
    {"label":"(GMT+05:30) Sri Jayawardenapura","value":"5.5"},
    {"label":"(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi","value":"5.5"},
    {"label":"(GMT+05:45) Kathmandu","value":"5.75"},
    {"label":"(GMT+06:00) Almaty, Novosibirsk","value":"6"},{"label":"(GMT+06:00) Astana, Dhaka","value":"6"},
    {"label":"(GMT+06:30) Yangon (Rangoon)","value":"6.5"},
    {"label":"(GMT+07:00) Bangkok, Hanoi, Jakarta","value":"7"},
    {"label":"(GMT+07:00) Krasnoyarsk","value":"7"},
    {"label":"(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi","value":"8"},
    {"label":"(GMT+08:00) Kuala Lumpur, Singapore","value":"8"},
    {"label":"(GMT+08:00) Irkutsk, Ulaan Bataar","value":"8"},
    {"label":"(GMT+08:00) Perth","value":"8"},
    {"label":"(GMT+08:00) Taipei","value":"8"},
    {"label":"(GMT+09:00) Osaka, Sapporo, Tokyo","value":"9"},
    {"label":"(GMT+09:00) Seoul","value":"9"},
    {"label":"(GMT+09:00) Yakutsk","value":"9"},
    {"label":"(GMT+09:30) Adelaide","value":"9.5"},
    {"label":"(GMT+09:30) Darwin","value":"9.5"},
    {"label":"(GMT+10:00) Brisbane","value":"10"},
    {"label":"(GMT+10:00) Canberra, Melbourne, Sydney","value":"10"},
    {"label":"(GMT+10:00) Hobart","value":"10"},
    {"label":"(GMT+10:00) Guam, Port Moresby","value":"10"},
    {"label":"(GMT+10:00) Vladivostok","value":"10"},
    {"label":"(GMT+11:00) Magadan, Solomon Is., New Caledonia","value":"11"},
    {"label":"(GMT+12:00) Auckland, Wellington","value":"12"},
    {"label":"(GMT+12:00) Fiji, Kamchatka, Marshall Is.","value":"12"},
    {"label":"(GMT+13:00) Nuku'alofa","value":"13"}
]


function invite_cnd_fn(){
    $(".cnd-filter-content").addClass('dnone');
    $(".live-assessment-sub-filters").addClass('dn');

    location.hash = 'invite';

    $("#invite-table-div").removeClass('dnone');

    $(".cnd-filters").removeClass('active-cnd-fltr');
    $(".invited").addClass('active-cnd-fltr');

    $(".sub-menu-content-container .cnd-filters").removeClass("active");
    $(".sub-menu-content-container .sub-nav-invited").addClass("active");
    $(".sub-menu-title").text("Invite");
}
function applied_cnd_fn(){
    $(".cnd-filter-content").addClass('dnone');
    $(".live-assessment-sub-filters").addClass('dn');

    location.hash = 'applied';

    $("#applied-table-div").removeClass('dnone');

    $(".cnd-filters").removeClass('active-cnd-fltr');
    $(".applied").addClass('active-cnd-fltr');

    $(".sub-menu-content-container .cnd-filters").removeClass("active");
    $(".sub-menu-content-container .sub-nav-applied").addClass("active");
    $(".sub-menu-title").text("Applied");
}
function pre_assessment_cnd_fn(){
    $(".cnd-filter-content").addClass('dnone');
    $(".live-assessment-sub-filters").addClass('dn');

    location.hash = 'pre-assessment';

    $("#pre-assessment-table-div").removeClass('dnone');

    $(".cnd-filters").removeClass('active-cnd-fltr');
    $(".pre-assessment").addClass('active-cnd-fltr');

    $(".sub-menu-content-container .cnd-filters").removeClass("active");
    $(".sub-menu-content-container .sub-nav-pre-assessment").addClass("active");
    $(".sub-menu-title").text("On-demand");
}
function live_assessment_cnd_fn(){
    $(".cnd-filter-content").addClass('dnone');
    $(".live-assessment-sub-filters").removeClass('dn');

    location.hash = 'live-assessment';

    $("#live-assessment-table-div").removeClass('dnone');

    $(".cnd-filters").removeClass('active-cnd-fltr');
    $(".live-assessment").addClass('active-cnd-fltr');

    $(".sub-menu-content-container .cnd-filters").removeClass("active");
    $(".sub-menu-content-container .sub-nav-live-assessment").addClass("active");
    $(".sub-menu-title").text("Live assessment");
}
function hired_cnd_fn(){
    $(".cnd-filter-content").addClass('dnone');
    $(".live-assessment-sub-filters").addClass('dn');

    location.hash = 'hired';

    $("#hired-table-div").removeClass('dnone');

    $(".cnd-filters").removeClass('active-cnd-fltr');
    $(".hired").addClass('active-cnd-fltr');

    $(".sub-menu-content-container .cnd-filters").removeClass("active");
    $(".sub-menu-content-container .sub-nav-hired").addClass("active");
    $(".sub-menu-title").text("Hired");
}
function rejected_cnd_fn(){
    $(".cnd-filter-content").addClass('dnone');
    $(".live-assessment-sub-filters").addClass('dn');

    location.hash = 'rejected';

    $("#rejected-table-div").removeClass('dnone');

    $(".cnd-filters").removeClass('active-cnd-fltr');
    $(".rejected").addClass('active-cnd-fltr');

    $(".sub-menu-content-container .cnd-filters").removeClass("active");
    $(".sub-menu-content-container .sub-nav-rejected").addClass("active");
    $(".sub-menu-title").text("Rejected");
}
function shortlisted_cnd_fn(){
    $(".cnd-filter-content").addClass('dnone');
    $(".live-assessment-sub-filters").addClass('dn');

    location.hash = 'shortlisted';

    $("#shortlisted-table-div").removeClass('dnone');

    $(".cnd-filters").removeClass('active-cnd-fltr');
    $(".shortlisted").addClass('active-cnd-fltr');

    $(".sub-menu-content-container .cnd-filters").removeClass("active");
    $(".sub-menu-content-container .sub-nav-shortlisted").addClass("active");
    $(".sub-menu-title").text("Shortlisted");
}

const settab_hash_map = {
    "invited":"invited",
    "applied":"applied",
    "shortlisted":"shortlisted",
    "pre-assessment":"pre-assessment",
    "live-assessment":"live-assessment",
    "hired":"hired",
    "rejected":"rejected"
}

$(".cnd-filters").click(function(){

    if($(this).hasClass('invited')){
        sessionStorage.empjobdetailcndtab="invited";
//        invite_resize_button_fn();
    }
    if($(this).hasClass('applied')){
        sessionStorage.empjobdetailcndtab="applied";
//        applied_resize_button_fn();
    }
    if($(this).hasClass('shortlisted')){
        sessionStorage.empjobdetailcndtab="shortlisted";
    }
    if($(this).hasClass('pre-assessment')){
        sessionStorage.empjobdetailcndtab="pre-assessment";
    }
    if($(this).hasClass('live-assessment')){
        sessionStorage.empjobdetailcndtab="live-assessment";
    }
    if($(this).hasClass('hired')){
        sessionStorage.empjobdetailcndtab="hired";
    }
    if($(this).hasClass('rejected')){
        sessionStorage.empjobdetailcndtab="rejected";
    }
    location.hash = settab_hash_map[sessionStorage.empjobdetailcndtab];
    render_cnd_interview();
})

function render_cnd_interview(){
    var settab_hash = location.hash.replace('#','');
    if(settab_hash != ''){
        if(settab_hash=='invited'){
            invite_cnd_fn();
        }
        else if(settab_hash=='applied'){
            applied_cnd_fn();
        }
//        else if(settab_hash=='shortlisted'){
//            shortlisted_cnd_fn();
//        }
        else if(settab_hash=='pre-assessment'){
            pre_assessment_cnd_fn();
        }
        else if(settab_hash=='live-assessment'){
            live_assessment_cnd_fn();
        }
        else if(settab_hash=='hired'){
            hired_cnd_fn();
        }
        else if(settab_hash=='rejected'){
            rejected_cnd_fn();
        }
        else{
            invite_cnd_fn();
        }
    }
    else{
        if(sessionStorage.empjobdetailcndtab=="invite"){
            invite_cnd_fn();
        }
        else if(sessionStorage.empjobdetailcndtab=="applied"){
            applied_cnd_fn();
        }
        else if(sessionStorage.empjobdetailcndtab=="shortlisted"){
            shortlisted_cnd_fn();
        }
        else if(sessionStorage.empjobdetailcndtab=="pre-assessment"){
            pre_assessment_cnd_fn();
        }
        else if(sessionStorage.empjobdetailcndtab=="live-assessment"){
            live_assessment_cnd_fn();
        }
        else if(sessionStorage.empjobdetailcndtab=="hired"){
            hired_cnd_fn();
        }
        else if(sessionStorage.empjobdetailcndtab=="rejected"){
            rejected_cnd_fn();
        }
        else{
            invite_cnd_fn();
        }
    }
}
render_cnd_interview();



function startInterview(instruction_url, job_id, intr_id, job_type, twid){
    if(job_type=='live'){
        sessionStorage.cndjobid=job_id;
        sessionStorage.intr_id=intr_id;
        sessionStorage.jobtype=job_type;
        sessionStorage.twid = twid;
    }
    else{
        sessionStorage.removeItem("camcheck");
        sessionStorage.removeItem("tac");
        sessionStorage.cndjobid=job_id;
        sessionStorage.jobtype='oneway';
        sessionStorage.cndjoburl=instruction_url;
    }

    window.location=instruction_url;
}

var q_id_arr = [];
/////////////////////////////////////////
///   check practice or interview  //////
/////////////////////////////////////////
if(sessionStorage.cndjobid=="practice-test"){
    $("#practice-test-instruction").removeClass('dn')
    $("#interview-instruction").remove();

    $("#practice-test-agree-form").submit(function(){
        event.preventDefault()
        sessionStorage.tac = "yes";
        window.location = "#";
    });

    $("#feedback-submit").click(function(){
        updatefeedback_data();
    });


    //// AJAX for updating feedback of practice test
    function updatefeedback_data(){
        var cnd_feedback_data = {'csrfmiddlewaretoken': '{{ csrf_token }}'};
        cnd_feedback_data['feedback_id'] = sessionStorage.feedback_id;
        cnd_feedback_data['ease_of_user_interface'] = $("[name='first']:checked").val();
        cnd_feedback_data['video_quality'] = $("[name='second']:checked").val();
        cnd_feedback_data['sign_up_process'] = $("[name='third']:checked").val();
        cnd_feedback_data['interview_question'] = $("[name='forth']:checked").val();
        cnd_feedback_data['communication_from_hiring_team'] = $("[name='fifth']:checked").val();
        cnd_feedback_data['overall_experience'] = $("[name='sixth']:checked").val();
        cnd_feedback_data['overall_feedback'] = $(".overall-feedback").val();
        cnd_feedback_data['question_ids'] = JSON.stringify(q_id_arr);
        cnd_feedback_data['skills'] = sessionStorage.skills;
        sessionStorage.clear();
        updatefeedback(cnd_feedback_data);
    }
    function updatefeedback(cnd_feedback_data){
        $.ajax({
            type: "POST",
            url: "#",
            data: cnd_feedback_data,
            dataType: 'json',
            success: function(data) {
                window.location = "#";
                },
            error:function(data) {
            }
        });
    };

    $.ajax({
        type: "POST",
        url: "#", //The URL you defined in urls.py
        data: {
                'csrfmiddlewaretoken': '{{ csrf_token }}',
                'selected_skills_arr':  sessionStorage.skills,
            },
        dataType: 'json',
        success: function(data) {
                q_id_arr = data;
                $(".total-int-que").html(q_id_arr.length);
                $("#totalquecount").html(q_id_arr.length);
            },
        error:function(data) {
           alert("An error occurred. Please try again later.");
        }
    });
//    alert(q_id_arr);
}
else{
    var i = 0;
    {% for q in question_list %}
        q_id_arr[i] = "{{ q }}";
        i++;
    {% endfor %}
//    alert(q_id_arr);

    $(".total-int-que").html(q_id_arr.length);

    $("#practice-test-instruction").remove();
    $("#interview-instruction").removeClass('dn');

    $("#instruction-agree-form").submit(function(){
        event.preventDefault()
        sessionStorage.tac = "yes";
        window.location = "#";
    });

    $("#feedback-submit").click(function(){
        updatefeedback_data();
        window.location = "#";
    });


    //// AJAX for creating feedback interview
    function updatefeedback_data(){
        var cnd_feedback_data = {'csrfmiddlewaretoken': '{{ csrf_token }}'};
        cnd_feedback_data['feedback_id'] = sessionStorage.feedback_id;
        cnd_feedback_data['ease_of_user_interface'] = $("[name='first']:checked").val();
        cnd_feedback_data['video_quality'] = $("[name='second']:checked").val();
        cnd_feedback_data['sign_up_process'] = $("[name='third']:checked").val();
        cnd_feedback_data['interview_question'] = $("[name='forth']:checked").val();
        cnd_feedback_data['communication_from_hiring_team'] = $("[name='fifth']:checked").val();
        cnd_feedback_data['overall_experience'] = $("[name='sixth']:checked").val();
        cnd_feedback_data['overall_feedback'] = $(".overall-feedback").val();
        cnd_feedback_data['question_ids'] = JSON.stringify(q_id_arr);
        sessionStorage.clear();
        updatefeedback(cnd_feedback_data);
    }
    function updatefeedback(cnd_feedback_data){
        $.ajax({
            type: "POST",
            url: "#",
            data: cnd_feedback_data,
            dataType: 'json',
            success: function(data) {
                },
            error:function(data) {
            }
        });
    };
}
//////////  end //////////////

var i = 0;
var qid = "";
$("#next-question").click(function(){
    $(this).html("Next question");
    $(this).hide();
    //alert("nexxt");
    if(i<q_id_arr.length){
        qid = q_id_arr[i];
        sessionStorage.cnd_q_id = qid;
//        $("#totalque").html(i+1+"/"+q_id_arr.length);
        $("#q_id").val(qid);
        i++;
        $("#q-id-frm").submit();
        document.getElementById("btn-record-ans").disabled = false;
        document.getElementById('btn-record-ans').style.cursor = "pointer";
    }
    else{
        $("#ovr-lay-intr-instruction").hide();
        $("#ovr-lay-intr-instruction-container").show();
        $("#cnd-ow-intr-vdo-div").hide();
        $("#feedback-div").show();

        $(".vdo-not-rec-fafa-div").addClass('dn');
        $(".vdo-rec-fafa-div").addClass('dn');
        $(".ow-question-meta-content").html("");
        $("#que-res-type-div").html("");
        $(".ow-footer").html("");
        a_v_permission_start('STOP');
    }
});








function viewjd(jd, jid){
var jd_d = jd+"d";  //job description
var jd_t = jd+"t";  //job title
var jd_c = jd+"c";  //job company
var jd_lo = jd+"lo";  //job logo
var jd_l = jd+"l";  //job location
var jd_s = jd+"s";  //job start
var jd_p = jd+"p";  //job posted on
var jd_a = jd+"a";  //job apply by
var jd_ed = jd+"ed";  //job employer description
var logo = '<svg height="100" style=" fill:#000000;" viewBox="0 0 172 172" width="100" x="0px" y="0px"> <g fill="none" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none" stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none"> <path d="M0,172v-172h172v172z" fill="none"></path> <g> <path d="M163.9375,5.375h-94.0625v43h-17.46875l-34.9375,13.4375v108.84375h61.8125v-4.03125h84.65625z" fill="#ffffff"></path> <path d="M163.9375,170.65625c-2.28438,0 -4.03125,-1.74687 -4.03125,-4.03125v-157.21875h-86v157.21875c0,2.28438 -1.74688,4.03125 -4.03125,4.03125c-2.28437,0 -4.03125,-1.74687 -4.03125,-4.03125v-161.25c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125h94.0625c2.28438,0 4.03125,1.74687 4.03125,4.03125v161.25c0,2.28438 -1.74687,4.03125 -4.03125,4.03125z" fill="#444b54"></path> <path d="M120.9375,170.65625h-8.0625c-2.28437,0 -4.03125,-1.74687 -4.03125,-4.03125v-24.1875c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125h8.0625c2.28437,0 4.03125,1.74687 4.03125,4.03125v24.1875c0,2.28438 -1.74688,4.03125 -4.03125,4.03125zM48.375,170.65625h-8.0625c-2.28437,0 -4.03125,-1.74687 -4.03125,-4.03125v-24.1875c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125h8.0625c2.28438,0 4.03125,1.74687 4.03125,4.03125v24.1875c0,2.28438 -1.74687,4.03125 -4.03125,4.03125zM17.46875,170.65625c-2.28437,0 -4.03125,-1.74687 -4.03125,-4.03125v-104.8125c0,-1.6125 1.075,-3.225 2.55312,-3.7625l34.9375,-13.4375c2.01563,-0.80625 4.43437,0.26875 5.24062,2.28438c0.80625,2.01563 -0.26875,4.43437 -2.28438,5.24062l-32.38437,12.49688v101.99063c0,2.28438 -1.74687,4.03125 -4.03125,4.03125z" fill="#444b54"></path> <path d="M139.75,65.84375c-0.26875,0 -0.5375,0 -0.80625,-0.13438c-0.26875,0 -0.5375,-0.13437 -0.80625,-0.26875c-0.26875,-0.13438 -0.40312,-0.26875 -0.67187,-0.40313c-0.26875,-0.13437 -0.40312,-0.26875 -0.67187,-0.5375c-0.80625,-0.80625 -1.20938,-1.74687 -1.20938,-2.82187c0,-0.26875 0,-0.5375 0.13438,-0.80625c0,-0.26875 0.13438,-0.5375 0.26875,-0.80625c0.13437,-0.26875 0.26875,-0.40312 0.40312,-0.67187c0.13438,-0.26875 0.26875,-0.40312 0.5375,-0.67187c0.26875,-0.26875 0.40313,-0.40312 0.67188,-0.5375c0.26875,-0.13437 0.40313,-0.26875 0.67188,-0.40312c0.26875,-0.13437 0.5375,-0.13437 0.80625,-0.26875c1.34375,-0.26875 2.6875,0.13438 3.62813,1.075c0.13437,0.13438 0.40312,0.40312 0.5375,0.67188c0.13438,0.26875 0.26875,0.40312 0.40312,0.67188c0.13438,0.26875 0.13438,0.5375 0.26875,0.80625c0,0.26875 0.13438,0.5375 0.13438,0.80625c0,1.075 -0.40313,2.15 -1.20938,2.82187c-0.13437,0.13438 -0.40312,0.40313 -0.5375,0.5375c-0.26875,0.13437 -0.40312,0.26875 -0.67187,0.40312c-0.26875,0.13438 -0.5375,0.13438 -0.80625,0.26875c-0.5375,0.26875 -0.80625,0.26875 -1.075,0.26875zM112.875,61.8125c0,-2.28438 1.74688,-4.03125 4.03125,-4.03125v0c2.28437,0 4.03125,1.74687 4.03125,4.03125v0c0,2.28437 -1.74688,4.03125 -4.03125,4.03125v0c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125zM94.0625,65.84375c-1.075,0 -2.15,-0.40313 -2.82187,-1.20937c-0.80625,-0.67188 -1.20938,-1.74688 -1.20938,-2.82188c0,-0.26875 0,-0.5375 0.13437,-0.80625c0,-0.26875 0.13437,-0.5375 0.26875,-0.80625c0.13437,-0.26875 0.26875,-0.40312 0.40312,-0.67187c0.13437,-0.26875 0.26875,-0.40312 0.5375,-0.67187c0.94062,-0.94063 2.28437,-1.34375 3.62812,-1.075c0.26875,0 0.5375,0.13437 0.80625,0.26875c0.26875,0.13437 0.5375,0.26875 0.67188,0.40312c0.26875,0.13437 0.40312,0.26875 0.5375,0.5375c0.13438,0.13437 0.40313,0.40312 0.5375,0.67188c0.13437,0.26875 0.26875,0.40312 0.40313,0.67188c0.13437,0.26875 0.13437,0.5375 0.26875,0.80625c0,0.26875 0.13437,0.5375 0.13437,0.80625c0,1.075 -0.40312,2.15 -1.20937,2.82187c-0.13438,0.13438 -0.40313,0.40313 -0.5375,0.5375c-0.26875,0.13437 -0.40313,0.26875 -0.67187,0.40312c-0.26875,0.13438 -0.5375,0.13438 -0.80625,0.26875c-0.5375,-0.13438 -0.80625,-0.13438 -1.075,-0.13438zM139.75,45.6875c-0.26875,0 -0.5375,0 -0.80625,-0.13437c-0.26875,0 -0.5375,-0.13438 -0.80625,-0.26875c-0.26875,-0.13438 -0.40312,-0.26875 -0.67187,-0.40312c-0.26875,-0.13438 -0.40312,-0.26875 -0.67187,-0.5375c-0.13438,-0.13437 -0.40312,-0.40312 -0.5375,-0.67187c-0.13437,-0.26875 -0.26875,-0.40312 -0.40312,-0.67187c-0.13437,-0.26875 -0.13437,-0.5375 -0.26875,-0.80625c0,-0.26875 -0.13437,-0.5375 -0.13437,-0.80625c0,-0.26875 0,-0.5375 0.13437,-0.80625c0,-0.26875 0.13438,-0.5375 0.26875,-0.80625c0.13438,-0.26875 0.26875,-0.40313 0.40312,-0.67187c0.13438,-0.26875 0.26875,-0.40313 0.5375,-0.67187c0.26875,-0.26875 0.40312,-0.40313 0.67188,-0.5375c0.26875,-0.13438 0.40312,-0.26875 0.67188,-0.40313c0.26875,-0.13438 0.5375,-0.13438 0.80625,-0.26875c1.34375,-0.26875 2.6875,0.13437 3.62813,1.075c0.80625,0.80625 1.20938,1.74688 1.20938,2.82188c0,0.26875 0,0.5375 -0.13438,0.80625c0,0.26875 -0.13437,0.5375 -0.26875,0.80625c-0.13437,0.26875 -0.26875,0.5375 -0.40312,0.67187c-0.13437,0.26875 -0.26875,0.40312 -0.5375,0.67188c-0.13438,0.13438 -0.40313,0.40312 -0.5375,0.5375c-0.26875,0.13437 -0.40312,0.26875 -0.67187,0.40312c-0.26875,0.13437 -0.5375,0.13437 -0.80625,0.26875c-0.13438,0.40313 -0.40313,0.40313 -0.67188,0.40313zM112.875,41.65625c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125v0c2.28437,0 4.03125,1.74688 4.03125,4.03125v0c0,2.28438 -1.74688,4.03125 -4.03125,4.03125v0c-2.28437,0 -4.03125,-1.74687 -4.03125,-4.03125zM94.0625,45.6875c-1.075,0 -2.15,-0.40312 -2.82187,-1.20938c-0.80625,-0.67187 -1.20938,-1.74687 -1.20938,-2.82187c0,-1.075 0.40313,-2.15 1.20938,-2.82187c0.94062,-0.94063 2.28437,-1.34375 3.62812,-1.075c0.26875,0 0.5375,0.13437 0.80625,0.26875c0.26875,0.13438 0.5375,0.26875 0.67188,0.40313c0.26875,0.13437 0.40313,0.26875 0.5375,0.5375c0.80625,0.80625 1.20938,1.74688 1.20938,2.82188c0,1.075 -0.40312,2.15 -1.20938,2.82187c-0.13437,0.13437 -0.40312,0.40312 -0.5375,0.5375c-0.26875,0.13438 -0.40312,0.26875 -0.67187,0.40312c-0.26875,0.13438 -0.5375,0.13438 -0.80625,0.26875c-0.26875,-0.13437 -0.5375,-0.13437 -0.80625,-0.13437zM139.75,86c-0.26875,0 -0.5375,0 -0.80625,-0.13438c-0.26875,0 -0.5375,-0.13437 -0.80625,-0.26875c-0.26875,-0.13438 -0.40312,-0.26875 -0.67187,-0.40313c-0.26875,-0.13437 -0.40312,-0.26875 -0.67187,-0.5375c-0.13438,-0.13438 -0.40312,-0.40313 -0.5375,-0.5375c-0.13437,-0.26875 -0.26875,-0.40313 -0.40312,-0.67187c-0.13437,-0.26875 -0.13437,-0.5375 -0.26875,-0.80625c0,-0.26875 -0.13437,-0.5375 -0.13437,-0.80625c0,-0.26875 0,-0.5375 0.13437,-0.80625c0,-0.26875 0.13438,-0.5375 0.26875,-0.80625c0.13438,-0.26875 0.26875,-0.40313 0.40312,-0.67187c0.13438,-0.26875 0.26875,-0.40313 0.5375,-0.67187c0.26875,-0.26875 0.40312,-0.40313 0.67188,-0.5375c0.26875,-0.13438 0.40312,-0.26875 0.67188,-0.40313c0.26875,-0.13438 0.5375,-0.13438 0.80625,-0.26875c0.5375,-0.13438 1.075,-0.13438 1.6125,0c0.26875,0 0.5375,0.13437 0.80625,0.26875c0.26875,0.13438 0.5375,0.26875 0.67188,0.40313c0.26875,0.13437 0.40312,0.26875 0.5375,0.5375c0.13438,0.13438 0.40312,0.40312 0.5375,0.67188c0.13437,0.26875 0.26875,0.40312 0.40312,0.67188c0.13437,0.26875 0.13437,0.5375 0.26875,0.80625c0,0.26875 0.13437,0.5375 0.13437,0.80625c0,1.075 -0.40312,2.15 -1.20937,2.82188c-0.80625,0.94062 -1.88125,1.34375 -2.95625,1.34375zM112.875,81.96875c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125v0c2.28437,0 4.03125,1.74688 4.03125,4.03125v0c0,2.28437 -1.74688,4.03125 -4.03125,4.03125v0c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125zM94.0625,86c-1.075,0 -2.15,-0.40313 -2.82187,-1.20937c-0.13437,-0.13438 -0.40313,-0.40313 -0.5375,-0.5375c-0.13437,-0.26875 -0.26875,-0.40312 -0.40313,-0.67187c-0.13437,-0.26875 -0.13437,-0.5375 -0.26875,-0.80625c0,-0.26875 -0.13437,-0.5375 -0.13437,-0.80625c0,-1.075 0.40312,-2.15 1.20938,-2.82188c0.94062,-0.94062 2.28437,-1.34375 3.62812,-1.075c0.26875,0 0.5375,0.13437 0.80625,0.26875c0.26875,0.13438 0.5375,0.26875 0.67188,0.40313c0.26875,0.13437 0.40313,0.26875 0.5375,0.5375c0.80625,0.80625 1.20938,1.74688 1.20938,2.82188c0,0.26875 0,0.5375 -0.13437,0.80625c0,0.26875 -0.13437,0.5375 -0.26875,0.80625c-0.13437,0.26875 -0.26875,0.5375 -0.40313,0.67188c-0.13437,0.26875 -0.26875,0.40313 -0.5375,0.5375c-0.13437,0.13438 -0.40312,0.40313 -0.5375,0.5375c-0.26875,0.13437 -0.40312,0.26875 -0.67187,0.40312c-0.26875,0.13438 -0.5375,0.13438 -0.80625,0.26875c0,-0.13437 -0.26875,-0.13437 -0.5375,-0.13437z" fill="#71c2ff"></path> <g fill="#71c2ff"> <path d="M139.75,106.15625c-1.075,0 -2.15,-0.40313 -2.82188,-1.20938c-0.13437,-0.13437 -0.40312,-0.40312 -0.5375,-0.5375c-0.13438,-0.26875 -0.26875,-0.40312 -0.40312,-0.67187c-0.13438,-0.26875 -0.13438,-0.5375 -0.26875,-0.80625c0,-0.26875 -0.13438,-0.5375 -0.13438,-0.80625c0,-0.26875 0,-0.5375 0.13438,-0.80625c0,-0.26875 0.13438,-0.5375 0.26875,-0.80625c0.13437,-0.26875 0.26875,-0.40313 0.40312,-0.67187c0.13438,-0.26875 0.26875,-0.40313 0.5375,-0.67187c1.47813,-1.47812 4.16563,-1.47812 5.64375,0c0.13438,0.13437 0.40312,0.40312 0.5375,0.67188c0.13437,0.26875 0.26875,0.40312 0.40312,0.67188c0.13437,0.26875 0.13437,0.5375 0.26875,0.80625c0,0.26875 0.13437,0.5375 0.13437,0.80625c0,0.26875 0,0.5375 -0.13437,0.80625c0,0.26875 -0.13438,0.5375 -0.26875,0.80625c-0.13438,0.26875 -0.26875,0.5375 -0.40312,0.67188c-0.13438,0.26875 -0.26875,0.40313 -0.5375,0.5375c-0.67187,0.80625 -1.74688,1.20938 -2.82188,1.20938zM112.875,102.125c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125v0c2.28437,0 4.03125,1.74688 4.03125,4.03125v0c0,2.28437 -1.74688,4.03125 -4.03125,4.03125v0c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125zM94.0625,106.15625c-1.075,0 -2.15,-0.40313 -2.82187,-1.20938c-0.80625,-0.67187 -1.20938,-1.74687 -1.20938,-2.82187c0,-1.075 0.40313,-2.15 1.20938,-2.82187c0.94062,-0.94063 2.28437,-1.34375 3.62812,-1.075c0.26875,0 0.5375,0.13437 0.80625,0.26875c0.26875,0.13437 0.5375,0.26875 0.67188,0.40312c0.26875,0.13437 0.40313,0.26875 0.5375,0.5375c0.80625,0.80625 1.20938,1.74688 1.20938,2.82187c0,1.075 -0.40312,2.15 -1.20938,2.82187c-0.13437,0.13438 -0.40312,0.40313 -0.5375,0.5375c-0.26875,0.13437 -0.40312,0.26875 -0.67187,0.40313c-0.26875,0.13437 -0.5375,0.13437 -0.80625,0.26875c-0.26875,-0.13438 -0.5375,-0.13438 -0.80625,-0.13438z"></path> </g> <g fill="#71c2ff"> <path d="M139.75,126.3125c-1.075,0 -2.15,-0.40313 -2.82188,-1.20938c-0.13437,-0.13437 -0.40312,-0.40312 -0.5375,-0.5375c-0.13438,-0.26875 -0.26875,-0.40312 -0.40312,-0.67187c-0.13438,-0.26875 -0.13438,-0.5375 -0.26875,-0.80625c0,-0.26875 -0.13438,-0.5375 -0.13438,-0.80625c0,-0.26875 0,-0.5375 0.13438,-0.80625c0,-0.26875 0.13438,-0.5375 0.26875,-0.80625c0.13437,-0.26875 0.26875,-0.40313 0.40312,-0.67187c0.13438,-0.26875 0.26875,-0.40313 0.5375,-0.67187c1.47813,-1.47812 4.16563,-1.47812 5.64375,0c0.80625,0.80625 1.20938,1.74687 1.20938,2.82187c0,0.26875 0,0.5375 -0.13438,0.80625c0,0.26875 -0.13437,0.5375 -0.26875,0.80625c-0.13437,0.26875 -0.26875,0.5375 -0.40312,0.67188c-0.13437,0.26875 -0.26875,0.40313 -0.5375,0.5375c-0.5375,0.94062 -1.6125,1.34375 -2.6875,1.34375zM112.875,122.28125c0,-2.28437 1.74688,-4.03125 4.03125,-4.03125v0c2.28437,0 4.03125,1.74688 4.03125,4.03125v0c0,2.28437 -1.74688,4.03125 -4.03125,4.03125v0c-2.28437,0 -4.03125,-1.74688 -4.03125,-4.03125zM94.0625,126.3125c-1.075,0 -2.15,-0.40313 -2.82187,-1.20938c-0.80625,-0.67187 -1.20938,-1.74687 -1.20938,-2.82187c0,-0.26875 0,-0.5375 0.13437,-0.80625c0,-0.26875 0.13437,-0.5375 0.26875,-0.80625c0.13437,-0.26875 0.26875,-0.40313 0.40312,-0.67187c0.13437,-0.26875 0.26875,-0.40313 0.5375,-0.67187c0.94062,-0.94063 2.28437,-1.34375 3.62812,-1.075c0.26875,0 0.5375,0.13437 0.80625,0.26875c0.26875,0.13437 0.5375,0.26875 0.67188,0.40312c0.26875,0.13437 0.40312,0.26875 0.5375,0.5375c0.13438,0.13437 0.40313,0.40313 0.5375,0.67188c0.13437,0.26875 0.26875,0.40313 0.40313,0.67188c0.13437,0.26875 0.13437,0.5375 0.26875,0.80625c0,0.26875 0.13437,0.5375 0.13437,0.80625c0,1.075 -0.40312,2.15 -1.20937,2.82187c-0.94063,0.67188 -2.01562,1.075 -3.09063,1.075z"></path> </g> <g fill="#71c2ff"> <path d="M139.75,146.46875c-1.075,0 -2.15,-0.40312 -2.82188,-1.20937c-0.13437,-0.13438 -0.40312,-0.40313 -0.5375,-0.5375c-0.13438,-0.26875 -0.26875,-0.40312 -0.40312,-0.67187c-0.13438,-0.26875 -0.13438,-0.5375 -0.26875,-0.80625c0,-0.26875 -0.13438,-0.5375 -0.13438,-0.80625c0,-0.26875 0,-0.5375 0.13438,-0.80625c0,-0.26875 0.13438,-0.5375 0.26875,-0.80625c0.13437,-0.26875 0.26875,-0.40312 0.40312,-0.67187c0.13438,-0.26875 0.26875,-0.40312 0.5375,-0.5375c0.26875,-0.13438 0.40313,-0.40312 0.67188,-0.5375c0.26875,-0.13438 0.40313,-0.26875 0.67188,-0.40312c0.26875,-0.13438 0.5375,-0.13438 0.80625,-0.26875c1.34375,-0.26875 2.6875,0.13438 3.62813,1.075c0.13437,0.13438 0.40312,0.40313 0.5375,0.5375c0.13438,0.26875 0.26875,0.40312 0.40312,0.67188c0.13438,0.26875 0.13438,0.5375 0.26875,0.80625c0,0.26875 0.13438,0.5375 0.13438,0.80625c0,0.26875 0,0.5375 -0.13438,0.80625c0,0.26875 -0.13437,0.5375 -0.26875,0.80625c-0.13437,0.26875 -0.26875,0.5375 -0.40312,0.67188c-0.13437,0.26875 -0.26875,0.40312 -0.5375,0.5375c-0.80625,0.94063 -1.88125,1.34375 -2.95625,1.34375zM94.0625,146.46875c-1.075,0 -2.15,-0.40312 -2.82187,-1.20937c-0.80625,-0.80625 -1.20938,-1.74688 -1.20938,-2.82188c0,-1.075 0.40313,-2.15 1.20938,-2.82188c0.94062,-0.94062 2.28437,-1.34375 3.62812,-1.075c0.26875,0 0.5375,0.13438 0.80625,0.26875c0.26875,0.13437 0.5375,0.26875 0.67188,0.40312c0.26875,0.13438 0.40313,0.26875 0.5375,0.5375c0.80625,0.80625 1.20938,1.74687 1.20938,2.82187c0,1.075 -0.40312,2.15 -1.20938,2.82188c-0.13437,0.13437 -0.40312,0.40312 -0.5375,0.5375c-0.26875,0.13438 -0.40312,0.26875 -0.67187,0.40312c-0.26875,0.13438 -0.5375,0.13438 -0.80625,0.26875c-0.26875,-0.13438 -0.5375,-0.13438 -0.80625,-0.13438z"></path> </g> <g fill="#71c2ff"> <path d="M44.34375,86c-1.075,0 -2.15,-0.40313 -2.82187,-1.20937c-0.80625,-0.67187 -1.20938,-1.74688 -1.20938,-2.82188c0,-0.26875 0,-0.5375 0.13437,-0.80625c0,-0.26875 0.13438,-0.5375 0.26875,-0.80625c0.13437,-0.26875 0.26875,-0.40313 0.40312,-0.67187c0.13438,-0.26875 0.26875,-0.40313 0.5375,-0.67187c0.94062,-0.94063 2.28438,-1.34375 3.62813,-1.075c0.26875,0 0.5375,0.13438 0.80625,0.26875c0.26875,0.13438 0.5375,0.26875 0.67188,0.40313c0.26875,0.13438 0.40312,0.26875 0.67188,0.5375c0.13438,0.13438 0.40312,0.40313 0.5375,0.67188c0.13437,0.26875 0.26875,0.40313 0.40312,0.67188c0.13437,0.26875 0.13437,0.5375 0.26875,0.80625c0,0.26875 0.13437,0.5375 0.13437,0.80625c0,1.075 -0.40312,2.15 -1.20937,2.82187c-0.13438,0.13438 -0.40312,0.40313 -0.67187,0.5375c-0.26875,0.13437 -0.40312,0.26875 -0.67187,0.40312c-0.26875,0.13438 -0.5375,0.13438 -0.80625,0.26875c-0.5375,-0.13437 -0.80625,-0.13437 -1.075,-0.13437z"></path> </g> <g fill="#71c2ff"> <path d="M44.34375,106.15625c-1.075,0 -2.15,-0.40313 -2.82187,-1.20938c-0.80625,-0.67187 -1.20938,-1.74687 -1.20938,-2.82187c0,-0.26875 0,-0.5375 0.13437,-0.80625c0,-0.26875 0.13438,-0.5375 0.26875,-0.80625c0.13437,-0.26875 0.26875,-0.40313 0.40312,-0.67187c0.13438,-0.26875 0.26875,-0.40313 0.5375,-0.67187c0.94062,-0.94063 2.28438,-1.34375 3.62813,-1.075c0.26875,0 0.5375,0.13437 0.80625,0.26875c0.26875,0.13437 0.5375,0.26875 0.67188,0.40312c0.26875,0.13437 0.40312,0.26875 0.67188,0.5375c0.13438,0.13437 0.40312,0.40313 0.5375,0.67188c0.13437,0.26875 0.26875,0.40313 0.40312,0.67188c0.13437,0.26875 0.13437,0.5375 0.26875,0.80625c0,0.26875 0.13437,0.5375 0.13437,0.80625c0,0.26875 0,0.5375 -0.13437,0.80625c0,0.26875 -0.13438,0.5375 -0.26875,0.80625c-0.13437,0.26875 -0.26875,0.5375 -0.40312,0.67188c-0.13438,0.26875 -0.26875,0.40312 -0.5375,0.5375c-0.13437,0.13438 -0.40312,0.40313 -0.67187,0.5375c-0.26875,0.13437 -0.40312,0.26875 -0.67187,0.40313c-0.26875,0.13437 -0.5375,0.13437 -0.80625,0.26875c-0.40313,-0.13438 -0.67187,-0.13438 -0.94063,-0.13438z"></path> </g> <g fill="#71c2ff"> <path d="M44.34375,126.3125c-1.075,0 -2.15,-0.40313 -2.82187,-1.20938c-0.13438,-0.13437 -0.40313,-0.40312 -0.5375,-0.5375c-0.13437,-0.26875 -0.26875,-0.40312 -0.40313,-0.67187c-0.13437,-0.26875 -0.13437,-0.5375 -0.26875,-0.80625c0,-0.26875 -0.13437,-0.5375 -0.13437,-0.80625c0,-0.26875 0,-0.5375 0.13437,-0.80625c0,-0.26875 0.13437,-0.5375 0.26875,-0.80625c0.13438,-0.26875 0.26875,-0.40313 0.40313,-0.67187c0.13437,-0.26875 0.26875,-0.40313 0.5375,-0.67187c0.94062,-0.94063 2.28437,-1.34375 3.62812,-1.075c0.26875,0 0.5375,0.13437 0.80625,0.26875c0.26875,0.13437 0.5375,0.26875 0.67188,0.40312c0.26875,0.13437 0.40312,0.26875 0.67188,0.5375c0.13437,0.13437 0.40312,0.40313 0.5375,0.67188c0.13438,0.26875 0.26875,0.40313 0.40313,0.67188c0.13437,0.26875 0.13437,0.5375 0.26875,0.80625c0,0.26875 0.13438,0.5375 0.13438,0.80625c0,0.26875 0,0.5375 -0.13438,0.80625c0,0.26875 -0.13437,0.5375 -0.26875,0.80625c-0.13438,0.26875 -0.26875,0.5375 -0.40313,0.67188c-0.13437,0.26875 -0.26875,0.40312 -0.5375,0.5375c-0.13438,0.13438 -0.40312,0.40313 -0.67187,0.5375c-0.26875,0.13437 -0.40312,0.26875 -0.67187,0.40313c-0.26875,0.13437 -0.5375,0.13437 -0.80625,0.26875c-0.26875,-0.13438 -0.5375,-0.13438 -0.80625,-0.13438z"></path> </g> </g> </g> </svg>';

    $("#job-des").html($("#"+jd_d).html());
    $("#job-edes").html($("#"+jd_ed).html());
    $("#job-title").html($("#"+jd_t).html());
    $("#job-company").html($("#"+jd_c).html());

    if ($("#"+jd_lo).html()=='NA'){
        $("#job-logo").html(logo);
    }
    else{
        $("#job-logo").html('<img class="job-logo-img" src="'+$("#"+jd_lo).html()+'">');
    }
    $("#job-location").html($("#"+jd_l).html());
    $("#job-start").html($("#"+jd_s).html());
    $("#job-posted-on").html($("#"+jd_p).html());
    $("#job-apply-by").html($("#"+jd_a).html());

    $("#job-des-overlay").show();
}
$("#job-des-close").click(function(){
  document.getElementById("job-des-overlay").style.display = "none";
});








var interview_status = '';
function create_cnd_schedule_JSON(){
    var schedule_JSON = cnd_schedule_JSON;
    var time_zone = cnd_schedule_JSON.time_zone;
    var duration = cnd_schedule_JSON.duration;
    var slots = cnd_schedule_JSON.slots;
    var schedule_status = "";
    var selected_slot = $("input[name='cnd_schedule_duration']:checked").val();

    if(selected_slot=='reschedule'){
        schedule_status = 'reschedule';
        interview_status = 'yet_to_schedule';
    }
    else if(selected_slot=='reject'){
        schedule_status = 'reject';
        interview_status = 'completed';
    }
    else{
        schedule_status = "accept";
        interview_status = 'slot_confirmed';
    }

    schedule_JSON["time_zone"] = time_zone;
    schedule_JSON["duration"] = duration;
    schedule_JSON["slots"] = slots;
    schedule_JSON["selected_slot"] = selected_slot;
    schedule_JSON["schedule_status"] = schedule_status;
    return schedule_JSON;
}

var two_way_assessment_id = '';
var cnd_schedule_JSON = [];
//var xyz = "{'duration': '15', 'time_zone': '-12', 'selected_slot': '2020-02-15 12:45am', 'slots': ['2020-02-15 12:15am', '2020-02-15 12:45am'], 'schedule_status': 'accept'}";
//var aa = JSON.parse(xyz);
//var bb = JSON.stringify(aa);
//alert(aa);
//alert(bb);
function cnd_schedule(twid,this_evnt,forloopcounter, event){

        event.preventDefault();
        event.stopPropagation();

    var selection_head = "Schedule interview";
    var edit_content = '';
    var intr_assignee_arr = '';

    two_way_assessment_id = twid;
    cnd_schedule_JSON = JSON.parse($("#schedulejson"+forloopcounter).html());
    cnd_schedule_JSON_slots = cnd_schedule_JSON.slots;
    intr_assignee_arr = this_evnt.getAttribute('data-assignee');

    $("body").addClass("modal-open");
    $("#ovr-lay-edit-view-container").show();
    $(".overlay-head-text-new").html(selection_head);
//    edit_content = '<form action="javascript:void(0);" id="dynamic-form"> <div class="dn"><span>Interview assigned to</span><span id="interview-assignee"></span></div> <div class="p5">Select time slot</div> <div class="flx flxc" id="select-cnd-duration-input-div"> </div></form>';
    edit_content =``;
    $(".overlay-content-content").html(edit_content);

            //add submit form id in submit button
            $('.submit-overlay-content').attr('type', 'submit');
            $('.submit-overlay-content').attr('form', 'dynamic-form');


    //create dynamically input checkbox from total skills and search logic
    var j = 1;
    var time_slots = cnd_schedule_JSON_slots;
//    alert(cnd_schedule_JSON_slots);
    for(i in time_slots){
        $("#select-cnd-duration-input-div").append('<div class="p5"><input required id="duration-'+j+'" name="cnd_schedule_duration" type="radio" value="'+time_slots[i]+'"> <label for="duration-'+j+'">'+time_slots[i]+'</label></div>');
        j++;
    }

    $("#select-cnd-duration-input-div").append('<div class="p5"><input id="duration-reschedule" name="cnd_schedule_duration" type="radio" value="reschedule"> <label for="duration-reschedule">Reschedule</label></div>');
    $("#select-cnd-duration-input-div").append('<div class="p5"><input id="duration-reject" name="cnd_schedule_duration" type="radio" value="reject"> <label for="duration-reject">Reject</label></div>');


////print query set of assignee of this interview
//    for(i in intr_assignee_arr){
//        $("#interview-assignee").append('<span>'+intr_assignee_arr[i]+'<span>')
//    }

}


$(".close-overlay-content").click(function(){
    clear_edit_form();
})

$(".cancel-overlay-content").click(function(){
    clear_edit_form();
})

function clear_edit_form(){
    $("#ovr-lay-edit-view-container").hide();
    $("body").removeClass("modal-open");
    $(".overlay-content-content").html('');
    $(".overlay-head-text-new").html('');
}

$(".submit-overlay-content").click(function(e){
    let dynamicForm = $("#dynamic-form")
    if(dynamicForm[0].checkValidity()){

        dynamic_submit_overlay_content_fn();
        e.preventDefault();
    }else{
         dynamicForm.submit();
    }
})

function dynamic_submit_overlay_content_fn(){
    var cnd_schedule_data = {'csrfmiddlewaretoken': '{{ csrf_token }}'};
    var two_way_interview_schedule = create_cnd_schedule_JSON();
    cnd_schedule_data['two_way_assessment_id'] = two_way_assessment_id;
    cnd_schedule_data['status'] = interview_status;
    cnd_schedule_data['two_way_interview_schedule'] = JSON.stringify(two_way_interview_schedule);

    submitcndschedule(cnd_schedule_data);
}

function submitcndschedule(cnd_schedule_data){
    console.log(JSON.stringify(cnd_schedule_data));
    $.ajax({
        type: "POST",
        url: "#",
        data: cnd_schedule_data,
        dataType: 'json',
        success: function(data) {
                location.reload();
            },
        error:function(data) {
        }
    });
};
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

$(".intr_action{{forloop.counter}}").click(function(e){

    e.preventDefault();
    e.stopPropagation();

    var counter = $(this).data('id');
    var ivt_id = $(`#jd${counter}ci`).text();
    var job_title = $(`#jd${counter}t`).text();
    var int_lvl = $(`#jd${counter}lvl`).text();
    var job_location = $(`#jd${counter}l`).text();
    var employer_name = $(`#jd${counter}c`).text();

    employer_name
    var status = $(this).data('action_type');

    // define notice_period_slab
        var notice_period_slab = {
            0:"15 Days or less",
            1:"1 Month",
            2:"2 Months",
            3:"3 Months",
            4:"More than 3 Months",
            5:"Currently Serving Notice Period",
            6:"Select Notice Period",
        }

        // define variable for showing availability_msg
        var availability_msg ='';
        var today = new Date().toISOString().split("T")[0];
        // check all the cases when to show availability_msg or not
        // case 1: old data available, update required, on open for job YES
        if(availability && is_availability_update_request && status == 'accept'){
            availability_msg = `
                               <div class="bdrt mt10"></div>
                                <div class="mt10">Update Notice period:</div>
                                <div>
                                    <select class="availability_select"></select>
                                </div>
                                <div><span class="small">Last updated on (dd/mm/yyyy): ${availability.updated_date}</span></div>
                                <div class="mt10 available_from_div dn">
                                    <label for="available_from_input">Available from <span class="small">(dd/mm/yyyy)</span>:</label>
                                    <div><input type="date" min="${today}" id="available_from_input" name="available_from"></div>
                                </div
                                `;
        }
        // case 2: old date not available, request & required for new data on open for job YES
        else if(is_availability_update_request && status == 'accept'){
            availability_msg = `
                                <div class="bdrt mt10"></div>
                                <div class="mt10">Notice period:</div>
                                <div>
                                    <select class="availability_select"></select>
                                </div>
                                <div class="mt10 available_from_div dn">
                                    <label for="available_from_input">Available from <span class="small">(dd/mm/yyyy)</span>:</label>
                                    <div><input type="date" min="${today}" id="available_from_input" name="available_from"></div>
                                </div>
                                `;
        }
        // case 3: old data available, only show old data with message on open for job YES,
        else if(availability && !is_availability_update_request && status == 'accept'){
            let old_available_from;
            if(availability.available_from){
                old_available_from = formatDate(`${availability.available_from}`);
            }else{
                 old_available_from = "Not given"
            }
            availability_msg = `
                                <div class="bdrt mt10"></div>
                                <div class="mt10">Current Notice period:</div>
                                <div class="fwb">
                                    '${notice_period_slab[availability.notice_period_slab]}'
                                </div>
                                <div><span class="small">Last updated on (dd/mm/yyyy): ${availability.updated_date}</span></div>
                                <div class="mt10 available_from_div dn">
                                    <div>Available from <span class="small">(dd/mm/yyyy)</span>:</div>
                                    <div>${old_available_from}</div>
                                </div>
                                `;
        }



        var head, body, action_type, cancel_text, submit_text;
        if(status == 'accept'){
            head = "Accept job interview?";
            action_type = "confirm";
            cancel_text = "No, I don't want";
            submit_text = "Yes, I accept";
        }else if(status=='reject'){
            head = "Reject job interview?";
            action_type = "delete";
            cancel_text = "No, I don't want";
            submit_text = "Yes, I reject";
        }

        body = `You are invited for
        <strong>${int_lvl}</strong> round for
        <strong>${job_title}</strong> at
        <strong>${employer_name}</strong>
        (<strong>${job_location}</strong>)
        ${availability_msg}
        `;

        // dynamic_confirmation integration start
        // create configuration object for confirmation overlay
        var confirmation_obj = {
            "icon":"",
            "head":head,
            "body":body,
            "width":"500px",
            "action_type":action_type,
            "action_yes":action_yes,
            "action_no":action_no,
            "action_close":action_close,
            "position":"2",
            "cancel_text":cancel_text,
            "submit_text":submit_text,
            "effect":"fade"
        }

        // call dynamic_confirmation function from dynamic-confirmation.js
        dynamic_confirmation(confirmation_obj);


        // select notice_period drop down
        var availability_select = $(".availability_select");

        // create notice_period select drop down
        // set first value as hidden and disable
        availability_select.append($('<option></option>')
            .attr('hidden',true)
            .prop('disabled', true)
            .val(6)
            .html(notice_period_slab[6]))

        for(i=0;i<=5;i++){
            availability_select.append($('<option></option>').val(i).html(notice_period_slab[i]))
        }
        availability_select.change(function(){
            let selected_value = $(this).val();
            if(selected_value == 5){
                available_from_show();
            }else{
                available_from_hide();
            }
        })

        function available_from_show(){
            $(".available_from_div").removeClass('dn');
        }
        function available_from_hide(){
            $(".available_from_div").addClass('dn');
            $("#available_from_input").val('');
        }

        // set value in notice_period drop down if old value available else set default option
        if(
            (availability && is_availability_update_request)||
            (availability && !is_availability_update_request)
        ){
            availability_select.val(`${availability.notice_period_slab}`);
            if(availability['notice_period_slab'] == 5){
                $("#available_from_input").val(availability['available_from']);
                available_from_show();
            }else{
                available_from_hide();
            }
        }
        else{
            availability_select.val(6);
        }


        function action_yes(){
            //here define the code execute on action_yes
            // case 1: old data available, update required, on open for job YES
            if(availability && is_availability_update_request && status == 'accept'){
                var notice_period_slab = $(".availability_select").val();
                var available_from_date = (notice_period_slab == 5) ? $("#available_from_input").val() : "";
                set_availability_data = create_set_availability_data(notice_period_slab, available_from_date);
                set_availability_ajax(set_availability_data);
                // console.log('old and update');
            }
            // case 2: old date not available, request & required for new data on open for job YES
            else if(is_availability_update_request && status == 'accept'){
                var notice_period_slab = $(".availability_select").val();
                var available_from_date = (notice_period_slab == 5) ? $("#available_from_input").val() : "";
                set_availability_data = create_set_availability_data(notice_period_slab, available_from_date);
                set_availability_ajax(set_availability_data);
                // console.log('first time update');
            }
            // case 3: old data available, only show old data with message on open for job YES,
            else if(availability && !is_availability_update_request && status == 'accept'){
                // console.log('current notice period');
            }
           cnd_job_action_data_fd(ivt_id,status);
        }
        function action_no(){
            //here define the code execute on action_no
        }
        function action_close(){
            //here define the code execute on action_close
        }
        // dynamic_confirmation integration end
});

function cnd_job_action_data_fd(ivt_id,status){
    var cnd_job_action_data = {'csrfmiddlewaretoken': '{{ csrf_token }}'};

    cnd_job_action_data['id'] = ivt_id;
    cnd_job_action_data['status'] = status;

    cnd_job_action_ajax(cnd_job_action_data);
}
function cnd_job_action_ajax(cnd_job_action_data){
    $.ajax({
        type: "POST",
        url: "#",
        data: cnd_job_action_data,
        dataType: 'json',
        beforeSend: function () {
            dynamic_loader_start();
        },
        success: function (data) {
            location.reload();
            dynamic_loader_end();
        },
        error: function (data) {
            dynamic_loader_end();
        }
    });
};

