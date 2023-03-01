"use strict"

// add_assignee.js start //

var add_assignee_obj = {};
var add_assignee_list_obj = {};
{% if emp_jobs %}
    {% for item in emp_jobs %}
        {% if item.job_life_status != 'archived'%}
        var add_assignee_list{{forloop.counter}} = []
        var add_assignee_list_obj_list{{forloop.counter}} = []
            {% for i in item.assigned_to.all %}
            var temp_obj{{forloop.parentloop.counter}}{{forloop.counter}} = {
                "avtr":"{{i.profile.profile_picture}}",
                "pc":"{{forloop.parentloop.counter}}",
                "c":"{{forloop.counter0}}",
                "ctr":"{{item.created_by.user.username}}",
                "e":"{{i.email}}",
                "fn":"{{ i.first_name }}",
                "jid":"{{ item.job_id }}",
                "ln":"{{ i.last_name }}",
                "ps":"{{ i.profile.presence_state }}",
                "rl":"{{ i.profile.role }}",
                "un":"{{ i.username }}",
                "url":"{% url 'users:user-detail' i.profile.user_uuid %}",
            };
            add_assignee_list{{forloop.parentloop.counter}}.push(temp_obj{{forloop.parentloop.counter}}{{forloop.counter}});
            add_assignee_list_obj_list{{forloop.parentloop.counter}}.push('{{ i.username }}');
            {% endfor %}
            add_assignee_obj["{{forloop.counter}}"] = add_assignee_list{{forloop.counter}};
            add_assignee_list_obj["{{forloop.counter}}"] = add_assignee_list_obj_list{{forloop.counter}};
        {% endif %}
    {% endfor %}
{% endif %}



function showaddassignee(head_text) {
    var forloop_counter ="";
    show_input();
//    take_attendance_class_list_fill_modal_event_unbind();

    // set data to next button for events
    set_data_attr_for_event.bind(this)()


    $(".add-assignee-header").html(`${head_text}`);
    $("body").addClass('add-assignee-open');
    $(".profilepicintcndcndadd").removeClass("dn");
    $(".profilepicintcndcndaddhide").addClass("dn");
    $(`#profilepicintcndcndadd${forloop_counter}`).addClass("dn");
    $(`#profilepicintcndcndaddhide${forloop_counter}`).removeClass("dn");
    $(".add-assignee-input-div").addClass("dn");
    $(`#add-assignee-input-div-${forloop_counter}`).removeClass("dn");
    $(".add-assignee-input").val("");
    $(".add-assignee-drop-down-div").hide();
    $(`#add-assignee-${forloop_counter}`).removeAttr('disabled');
    selected_assignee = [];
    renderSelectedAssignee(forloop_counter);

    add_assignee_btn_event();
}

function hideaddassignee() {
    var forloop_counter = "";
    $("body").removeClass('add-assignee-open');
    $(`#profilepicintcndcndadd${forloop_counter}`).removeClass("dn");
    $(`#profilepicintcndcndaddhide${forloop_counter}`).addClass("dn");
    $(".add-assignee-input-div").addClass("dn");
    $(`#add-assignee-input-div-${forloop_counter}`).addClass("dn");
}
function set_data_attr_for_event(){
    var url = $(this).data('url')
    var action_type = $(this).data('action_type')
    var action_class = $(this).data('action_class')
    $(".add-assignee-btn").data("url",url);
    $(".add-assignee-btn").data("action_type",action_type);
    $(".add-assignee-btn").addClass(action_class);
}
function show_input(){
    $("#add-assignee-input-div-inner").removeClass("dn")
}

function hide_input(){
    $("#add-assignee-input-div-inner").addClass("dn")
}


// this is use for delay when call the same function continuously
function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

// check if input is empty, hide the result container
$(".add-assignee-input").unbind("keyup.add_assignee_input1");
$(".add-assignee-input").bind("keyup.add_assignee_input1",function (e) {
    var forloop_counter = $(this).data('counter');
    if(!this.value){
        clear_add_assignee(forloop_counter);
    }
});

// call ajax after after the user has stopped typing for a specified amount of time or in events that fire at a high rate
$(".add-assignee-input").unbind("keyup.add_assignee_input2");
$(".add-assignee-input").bind("keyup.add_assignee_input2",delay(function (e) {
    //  console.log('Time elapsed!', this.value);

    // get keycode of current keypress event
    var code = (e.keyCode || e.which);

    // do nothing if it's an 37,37,39,40 arrow + 16 shift + 17 ctr + 18 alt key
    if(code == 37 || code == 38 || code == 39 || code == 40 ||code == 17 || code == 18) {
        return;
    }

    var forloop_counter = $(this).data('counter');
    if(this.value){
        autocompleteFunction(forloop_counter);
        clear_add_assignee_show();
    }else{
        clear_add_assignee(forloop_counter);
    }
}, 500));


//
function autocompleteFunction(forloop_counter) {
    var input_ele =  $(`#add-assignee-${forloop_counter}-input`);
    var username =  input_ele.val().trim();
    var username_ele_id = `usernames${forloop_counter}`;
    var username_ele =  $(`#${username_ele_id}`);
    var extra_data = {
        "input_ele":input_ele,
        "username":username,
        "username_ele_id":username_ele_id,
        "username_ele":username_ele,
        "pc":forloop_counter,
    }

    var whattodo = 'get_assignee';
    var whattodo_key = 'whattodo';
    var whattodo_value = whattodo;

    var get_assignee_data = {'csrfmiddlewaretoken': '{{ csrf_token }}'};
    get_assignee_data[whattodo_key] = whattodo_value;
    get_assignee_data['username'] = username;

    if(username){
        getAssigneeByUsername_AJAX(get_assignee_data, extra_data);
    }
};

var get_assignee_request = 0;
function getAssigneeByUsername_AJAX(get_assignee_data, extra_data){

    var input_ele =  extra_data['input_ele'];
    var username =  extra_data['username'];
    var username_ele_id = extra_data['username_ele_id'];
    var username_ele =  extra_data['username_ele'];
    var pc =  extra_data['pc'];

    $.ajax({
        type: "POST",
        url: '{% url "search" %}',
        data: get_assignee_data,
        dataType: 'json',
        beforeSend: function () {
            clear_last_search_result()
            // create configuration object for loader overlay
            var loader_obj = {
                "loader":"spinner_s",
                "container_id":username_ele_id,
                "background":"false",
            }
            // call dynamic_loader_start function from dynamic-loader.js
            dynamic_loader_start(loader_obj);
            username_ele.show();
            get_assignee_request++;
        },
        success: function (success_data) {
            get_assignee_request--;
            if(get_assignee_request==0){
                getAssigneeByUsername_AJAX_success(success_data, extra_data);
            }
        },
        error: function (data) {
            console.log('error');
            get_assignee_request--;
            if(get_assignee_request==0){
                dynamic_loader_end();
            }
        }
    });
}

var search_success_data = [];
function copy_last_search_result(data){
    search_success_data = data;
}
function clear_last_search_result(){
    search_success_data = [];
}


var search_assignee_list = [];
function getAssigneeByUsername_AJAX_success(success_data, extra_data){
//debugger;
    copy_last_search_result(success_data)

    var input_ele =  extra_data['input_ele'];
    var username =  extra_data['username'];
    var username_ele_id = extra_data['username_ele_id'];
    var username_ele =  extra_data['username_ele'];
    var pc =  extra_data['pc'];
    var no_assignee_found = false;
    var no_new_assignee_found = false;


    if(success_data.length>0){

        var default_profile_picture = `<svg height="20" width="20" style=" fill:#000000;" viewBox="0 0 172 172"  x="0px" y="0px">
                                                <g fill="none" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none" stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none">
                                                    <path d="M0,172v-172h172v172z" fill="none"></path>
                                                    <g fill="#444b54">
                                                        <path d="M89.01,11.7175c-16.07125,0.29563 -26.3375,6.78594 -30.745,16.8775c-4.20594,9.60781 -3.26531,21.74188 -0.215,34.2925c-1.63937,1.92156 -2.94281,4.50156 -2.4725,8.385c0.51063,4.23281 1.67969,7.24281 3.3325,9.3525c0.91375,1.15563 2.10969,1.26313 3.225,1.8275c0.60469,3.60125 1.6125,7.2025 3.1175,10.2125c0.86,1.73344 1.84094,3.3325 2.795,4.6225c0.43,0.57781 1.04813,0.91375 1.505,1.3975c0.02688,4.24625 0.04031,7.78031 -0.3225,12.255c-1.11531,2.70094 -3.72219,4.87781 -7.955,6.9875c-4.36719,2.17688 -10.05125,4.1925 -15.8025,6.665c-5.75125,2.4725 -11.66375,5.4825 -16.34,10.2125c-4.67625,4.73 -7.98187,11.22031 -8.4925,19.78l-0.215,3.655h138.03l-0.215,-3.655c-0.51062,-8.55969 -3.82969,-15.05 -8.4925,-19.78c-4.66281,-4.73 -10.50812,-7.74 -16.2325,-10.2125c-5.72437,-2.4725 -11.34125,-4.48812 -15.695,-6.665c-4.17906,-2.09625 -6.81281,-4.21937 -7.955,-6.88c-0.37625,-4.52844 -0.34937,-8.07594 -0.3225,-12.3625c0.45688,-0.49719 1.075,-0.81969 1.505,-1.3975c0.94063,-1.30344 1.84094,-2.9025 2.6875,-4.6225c1.46469,-3.01 2.52625,-6.62469 3.1175,-10.2125c1.075,-0.56437 2.23063,-0.69875 3.1175,-1.8275c1.65281,-2.10969 2.82188,-5.11969 3.3325,-9.3525c0.45688,-3.7625 -0.80625,-6.24844 -2.365,-8.17c1.67969,-5.45562 3.82969,-14.27062 3.1175,-23.3275c-0.38969,-4.945 -1.65281,-9.87656 -4.6225,-13.975c-2.71437,-3.7625 -7.12187,-6.50375 -12.685,-7.6325c-3.61469,-4.68969 -10.11844,-6.45 -17.63,-6.45zM89.1175,18.5975c0.04031,0 0.06719,0 0.1075,0c6.92031,0.02688 11.40844,2.05594 12.685,4.3l0.86,1.3975l1.6125,0.215c4.78375,0.65844 7.525,2.59344 9.46,5.2675c1.935,2.67406 3.01,6.40969 3.3325,10.535c0.645,8.25063 -1.73344,17.85844 -3.225,22.36l-0.86,2.6875l2.365,1.3975c-0.14781,-0.09406 1.31688,0.90031 0.9675,3.7625c-0.40312,3.37281 -1.20937,5.11969 -1.8275,5.9125c-0.61812,0.79281 -0.94062,0.7525 -0.9675,0.7525l-2.9025,0.215l-0.3225,2.795c-0.3225,2.96969 -1.51844,6.61125 -2.9025,9.46c-0.69875,1.42438 -1.41094,2.67406 -2.0425,3.5475c-0.63156,0.87344 -1.29,1.35719 -0.9675,1.1825l-1.8275,0.9675v2.0425c0,4.98531 -0.20156,9.07031 0.3225,14.835v0.43l0.215,0.43c1.96188,5.28094 6.50375,8.57313 11.5025,11.0725c4.99875,2.49938 10.73656,4.34031 16.125,6.665c5.38844,2.32469 10.32,5.10625 13.975,8.815c2.9025,2.94281 4.73,6.83969 5.6975,11.7175h-122.12c0.9675,-4.86437 2.78156,-8.77469 5.6975,-11.7175c3.66844,-3.70875 8.66719,-6.49031 14.0825,-8.815c5.41531,-2.32469 11.11281,-4.16562 16.125,-6.665c5.01219,-2.49937 9.64813,-5.79156 11.61,-11.0725l0.215,-0.86c0.52406,-5.76469 0.3225,-9.84969 0.3225,-14.835v-2.0425l-1.8275,-0.9675c0.30906,0.16125 -0.43,-0.30906 -1.075,-1.1825c-0.645,-0.87344 -1.43781,-2.12312 -2.15,-3.5475c-1.42437,-2.84875 -2.59344,-6.51719 -2.9025,-9.46l-0.3225,-2.795l-2.9025,-0.215c-0.02687,0 -0.34937,0.04031 -0.9675,-0.7525c-0.61812,-0.79281 -1.42437,-2.53969 -1.8275,-5.9125c-0.33594,-2.86219 1.11531,-3.85656 0.9675,-3.7625l2.2575,-1.3975l-0.645,-2.4725c-3.23844,-12.47 -3.80281,-23.79781 -0.43,-31.4975c3.35938,-7.67281 10.2125,-12.49687 24.51,-12.7925z"></path>
                                                    </g>
                                                </g>
                                            </svg>`;

        var user = '<div class="assignee-dropdown">';
        search_assignee_list = [];
        for(let i in success_data){
            var un = success_data[i]["username"];
            // show only new assignee logic
            if($.inArray( un, selected_assignee )== -1){
                var pp = success_data[i]["profile_picture"];
                if(pp){
                    pp = `<img width="20" height="20" src="${pp}">`;
                }
                else{
                    pp = default_profile_picture;
                }
                var fn = success_data[i]["first_name"];
                var ln = success_data[i]["last_name"];

                user +=`
                <div id="${un}" class="assignee-user" tabindex="0">
                    <div class="flx a-i-c">
                        ${pp}
                    </div>
                    <div class="assignee-username">${un}</div>
                    <div class="assignee-firstname">(${fn}</div>
                    <div class="assignee-lastname">${ln})</div>
                </div>`;

                search_assignee_list.push(success_data[i]["username"]);
            }else{
                // no new assignee found
            }

        }
        user = user + '</div>';



//        // remove already assigned user from the search result
//        // utility - subtractTwoArrays.js
//        var assignee_check = subtractTwoArrays(search_assignee_list, add_assignee_list_obj[pc])
//
//        //check if there is any new user in the search result
//        if(assignee_check.length){
//             // new user found in search result
//             username_ele.html(user);
//        }else{
//            no_new_assignee_found = true;
//        }


        username_ele.html(user);



        $(".assignee-user").click(function(){
            render_selected_assignee.bind(this)(pc, input_ele, username_ele);
        })

    }
    else{
        no_assignee_found = true;
    }

    if(no_new_assignee_found){
        username_ele.html(`<div class="no_assignee_found">You can assign jobs to those users who have not been assigned yet.</div>`);

    }
    else if(no_assignee_found){
        username_ele.html(`<div class="no_assignee_found">We can not find that person on LueinHire.com.<br>Enter their username to invite them</div>`);

    }
    dynamic_loader_end();
}

$('.add-assignee-clear').click(function(){
    var counter = $(this).data('counter');
     clear_add_assignee(counter);
});

function clear_add_assignee_show(){
    $('.add-assignee-clear').removeClass('dn');
}
function clear_add_assignee_hide(){
    $('.add-assignee-clear').addClass('dn');
}
var is_search_enable = true;

function clear_add_assignee(counter){
    var forloop_counter = counter;
    var username_ele_id = `usernames${forloop_counter}`;
    var username_ele =  $(`#${username_ele_id}`);
    var input_ele =  $(`#add-assignee-${forloop_counter}-input`);
    input_ele.val("");
    username_ele.hide();
    clear_add_assignee_hide();
}
var selected_assignee = [];
function renderSelectedAssignee(pc){
    var tick = '<svg class="fafa-tick one" viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon" focusable="false"><path d="M15,3L6.57,13.72A0.7,0.7,0,0,1,6,14a0.72,0.72,0,0,1-.56-0.27L1,8.07,2.36,7,6,11.72,13.68,2Z" class="small-icon" style="fill-opacity: 1"></path></svg>';
    var cross = '<svg class="fafa-cross two" viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon" focusable="false"><path d="M13,4.32L9.31,8,13,11.69,11.69,13,8,9.31,4.31,13,3,11.69,6.69,8,3,4.31,4.31,3,8,6.69,11.68,3Z" class="small-icon" style="fill-opacity: 1"></path></svg>';
    var container = document.getElementById(`assignee-selected${pc}`);
    container.innerHTML = "";
    selected_assignee.forEach(function(value, index){
        var tileElement = document.createElement("div");
        // get details from object
        var all_detail_obj = get_all_details_of_assignee(value);
        // get detail html
        var selected_assignee_detail_html = get_and_render_old_person_data(all_detail_obj)

        tileElement.classList.add('skill-tile-edit');
        tileElement.innerHTML = `<div class="skill-text-edit" title="${value}">
                                    <div class="skill-edit">${selected_assignee_detail_html}</div>
                                </div>
                                <div class="skill-fafa-edit cnt">${tick}${cross}</div>
                                `;
        tileElement.addEventListener('click', remove_selected_assignee.bind(this));
        container.appendChild(tileElement);


    })

    function remove_selected_assignee(e){
        console.warn(this);
//        var removeIndex=e.currentTarget.index;
//        var removeIndex=$(".skill-tile-edit").index(this);
        var removeIndex=$(e.currentTarget).index();

        selected_assignee.splice(removeIndex,1);
        renderSelectedAssignee.bind(this)(pc);
        show_input();
        take_attendance_class_list_fill_modal_event_unbind();

        is_search_enable = true;
    }
}

var fafa_icon_size = 50;
var profile_picture_default_fafa_icon = `<svg width="${fafa_icon_size}" height="${fafa_icon_size}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0,0,256,256"><g fill="#bababa" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(2,2)"><path d="M64,1c-34.74,0 -63,28.26 -63,63c0,12.01 3.39055,23.68953 9.81055,33.76953c0.89,1.4 2.73867,1.80992 4.13867,0.91992c1.4,-0.89 1.80992,-2.73867 0.91992,-4.13867c-5.8,-9.12 -8.86914,-19.69078 -8.86914,-30.55078c0,-31.43 25.57,-57 57,-57c31.43,0 57,25.57 57,57c0,10.96 -3.11953,21.60906 -9.01953,30.78906c-0.9,1.39 -0.48961,3.25039 0.90039,4.15039c0.5,0.32 1.05914,0.48047 1.61914,0.48047c0.99,0 1.9493,-0.49086 2.5293,-1.38086c6.52,-10.15 9.9707,-21.91906 9.9707,-34.03906c0,-34.74 -28.26,-63 -63,-63zM64,31c-12.68,0 -23,10.32 -23,23c0,12.68 10.32,23 23,23c12.68,0 23,-10.32 23,-23c0,-12.68 -10.32,-23 -23,-23zM64,37c9.37,0 17,7.63 17,17c0,9.37 -7.63,17 -17,17c-9.37,0 -17,-7.63 -17,-17c0,-9.37 7.63,-17 17,-17zM64,88.59766c-15.255,0 -30.50914,5.80688 -42.11914,17.42187c-0.04,0.04 -0.07156,0.07133 -0.10156,0.11133l-0.28906,0.31836c-1.11,1.23 -1.02102,3.12023 0.20898,4.24023c11.6,10.52 26.62078,16.31055 42.30078,16.31055c15.68,0 30.70078,-5.79031 42.30078,-16.32031c1.23,-1.11 1.31899,-3.01024 0.20899,-4.24024l-0.15039,-0.15039c-0.07,-0.09 -0.16024,-0.18953 -0.24024,-0.26953c-11.61,-11.615 -26.86414,-17.42187 -42.11914,-17.42187zM64,94.59766c12.8425,0 25.68484,4.57742 35.83984,13.73242c-10.12,8.19 -22.72984,12.66992 -35.83984,12.66992c-13.11,0 -25.71984,-4.47992 -35.83984,-12.66992c10.155,-9.155 22.99734,-13.73242 35.83984,-13.73242z"></path></g></g></svg>`;
var profile_id_selected_assignee = "";
function get_and_render_old_person_data(data){
    var old_details = data;
    var class_name = old_details["class_name"];
    profile_id_selected_assignee =  old_details["profile_id"];
    var first_name = data["first_name"];
    var last_name = data["last_name"];
    var email = data["email"];
    var gender = data["gender"];
    var profile_picture = data["profile_picture"];
    var gender_display = '';
    if(gender){
        if(gender == "male"){
            gender_display = "(M)";
        }else if(gender == "female"){
            gender_display = "(F)";
        }else if(gender == "other"){
            gender_display = "(O)";
        }else{
            gender_display = "";
        }
    }

    var profile_picture_html = "";
    if(profile_picture){
        profile_picture_html = `<div class="flx mr10">
                                    <div class="at_img_div">
                                        <img class="at_img" src="${profile_picture}">
                                    </div>
                                </div>`;
    }else{
        profile_picture_html = `<div class="flx mr10">
                                    ${profile_picture_default_fafa_icon}
                               </div>`;
    }

    var display_data = "";
    if(data){
        display_data = `
                        <div class="flx">
                            ${profile_picture_html}
                            <div class="flx flxc a-s-f-e">
                                <div class="flx t-t-c">${first_name} ${last_name} ${gender_display}</div>
                                <div class="flx c6">${email}</div>
                            </div>
                        </div>
                        `;
    }

    return display_data;
}



function get_gender_display(gender){
    var gender_display = "";
    if(gender){
        if(gender == "male"){
            gender_display = "(M)";
        }else if(gender == "female"){
            gender_display = "(F)";
        }else if(gender == "other"){
            gender_display = "(O)";
        }else{
            gender_display = "";
        }
    }
    return gender_display;
}

function render_selected_assignee(pc, input_ele, username_ele){
    selected_assignee.push(this.id);
    clear_add_assignee(pc);
    renderSelectedAssignee.bind(this)(pc);
    is_search_enable = false;
    hide_input();
    take_attendance_class_list_fill_modal_event();
//    take_attendance_class_list_fill_modal_event_bind();
}

function get_all_details_of_assignee(username){
    return search_success_data.find(obj => {
      return obj.username === username
    })
}


function add_assignee_btn_event(){
    $(".add-assignee-btn").unbind('click.add_assignee_btn', add_assignee_btn_fn)
    $(".add-assignee-btn").bind('click.add_assignee_btn', add_assignee_btn_fn)
}
function add_assignee_btn_fn(){
    var forloop_counter = $(this).data('counter');
    var job_id = $(this).data('job_id');
    add_job_assignee(forloop_counter, job_id);
}


//function enable_disable_add_assignee(){
//
//    if(($.inArray( value, search_assignee_list )== -1) && !(!value.replace(/\s/g, '').length)){
//        $(".add-assignee-btn").addClass("e");
//    }
//
//}


function add_job_assignee(forloop_counter, job_id){
    var assignee_data = {'csrfmiddlewaretoken': '{{ csrf_token }}'};
    var add_id = `add-assignee-${forloop_counter}`;
    var assignee_job_id = job_id;

    assignee_data['assigned_to_list'] = JSON.stringify(selected_assignee);
    assignee_data['assignee_job_id'] = assignee_job_id;

    $(`#${add_id}`).attr('disabled','disabled');

    if(typeof selected_assignee !== 'undefined' && selected_assignee.length > 0){
//        submitassignee(assignee_data, forloop_counter);

    }
    else{
        displayAlert("Please add at-least 1 assignee.",'error',  2000);
        $(`#${add_id}`).removeAttr('disabled');
    }
}

function get_loadFormTakeAttendance_data(){
    var loadFormTakeAttendance_data = {};
//    loadFormTakeAttendance_data = {'csrfmiddlewaretoken': '{{ csrf_token }}'};
    loadFormTakeAttendance_data['profile_id'] = profile_id_selected_assignee;

    return loadFormTakeAttendance_data;
}




function submitassignee(assignee_data, forloop_counter){
    $.ajax({
        type: "POST",
        url: "", // --url 'add-job-assignee'-- The URL you defined in urls.py
        data: assignee_data,
        dataType: 'json',
        beforeSend: function () {
            // call dynamic_loader_start function from dynamic-loader.js
            dynamic_loader_start();
        },
        success: function(data) {
                var message = data['message'];
                if(data['form_valid']){
                    displayAlert(message,'success',  2000);
                    hideaddassignee(forloop_counter);
                    $("#emp_jobs_table tbody").html(data.html_emp_jobs_list);
//                    setTimeout(function(){location.reload();}, 2000);
                }else{
                    displayAlert(message,'error',  2000);
                    $(`.add-assignee-btn`).removeAttr('disabled');
                }
                dynamic_loader_end();
            },
        error:function(data) {
            displayAlert('Something went wrong. Please try again.','error',  2000);
            $(`.add-assignee-btn`).removeAttr('disabled');
            dynamic_loader_end();
        }
    })
};

// add_assignee.js start //
