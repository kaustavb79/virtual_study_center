

// define notice_period_slab
//var notice_period_slab = {
//    0:"15 Days or less",
//    1:"1 Month",
//    2:"2 Months",
//    3:"3 Months",
//    4:"More than 3 Months",
//    5:"Currently Serving Notice Period",
//    6:"Select Notice Period",
//}

// set availability ajax logic start //
var updated_date;
var dateDiffInDays_val;
var availability;
var is_availability_update_request = false;
var now = new Date();

{% if request.user.profile.availability %}
    availability = {{request.user.profile.availability|safe}};
    updated_date = new Date(availability.updated_date);
    dateDiffInDays_val = dateDiffInDays(updated_date, now)
    if(dateDiffInDays_val >=15){
        is_availability_update_request = true;
    }else{
        is_availability_update_request = false;
    }

{% else %}
    is_availability_update_request = true;
{% endif %}



//console.log(dateDiffInDays(updated_date, now))




function create_set_availability_data(notice_period_slab, available_from_date=null){
    var set_availability_data = {'csrfmiddlewaretoken': '{{ csrf_token }}'};
    var notice_period_slab = notice_period_slab;
    var available_from_date = available_from_date;

    set_availability_data['notice_period_slab'] = notice_period_slab;
    set_availability_data['available_from'] = available_from_date;
    return set_availability_data;
}
function set_availability_ajax(set_availability_data){
    $.ajax({
        type: "POST",
        url: "#",
        data: set_availability_data,
        dataType: 'json',
        beforeSend: function () {
//            // create configuration object for loader overlay
//            var loader_obj = {
//                "loader":"spinner_s",
//                "container_id":"owr-start-rating-loader",
//                "background":"false",
//            }
//            // call dynamic_loader_start function from dynamic-loader.js
//            dynamic_loader_start(loader_obj);
        },
        success: function (data) {
            set_availability_ajax_success(data);
//            dynamic_loader_end('owr-start-rating-loader');
        },
        error: function (data) {
//            dynamic_loader_end('owr-start-rating-loader');
                console.log(data);
        }
    });
};
function set_availability_ajax_success(data){
    var message = data["message"]
    console.log(data);
}
// set availability ajax logic start //
