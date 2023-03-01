// Usage --->   displayAlert(data.message, 'success', 2000);
// type can be either of: success, error, info, warning, unknown
var displayAlertList = [];
function displayAlert(message, type='info', showDuration=2000) {
    var type = type.toLowerCase();
    var t=$(`
            <div class="alert">
                <div class="alert_wrapper">
                    <div class="close_alert">×</div>
                    <div>${message}</div>
                </div>
            </div>
           `);
    $("#alert-div").append(t);
    t.fadeIn(500).delay(showDuration).fadeOut(500, ()=>{t.remove()});
//    t.fadeIn(500).delay(showDuration);
    t.removeClass().addClass("alert alert-"+type);
    $('.close_alert').unbind('click.close_alert')
    $('.close_alert').bind('click.close_alert',close_alert_fn);
    var child_count = $("#alert-div").children().length;
}

function close_alert_fn(){
    $(this).closest('.alert').remove();
}




