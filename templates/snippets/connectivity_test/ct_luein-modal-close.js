

function ct_luein_modal_events(){
    $(".ct_luein-modal-close").unbind("click.ct-close",ct_luein_modal_close)
    $(".ct_luein-modal-close").bind("click.ct-close",ct_luein_modal_close)

    $(".ct_luein-modal-button.cancel").unbind("click.ct-cancel",ct_luein_modal_close)
    $(".ct_luein-modal-button.cancel").bind("click.ct-cancel",ct_luein_modal_close)

    $(".ct_luein-modal-button.submit").unbind("click.ct-cancel",ct_luein_modal_close)
    $(".ct_luein-modal-button.submit").bind("click.ct-cancel",ct_luein_modal_close)
}


