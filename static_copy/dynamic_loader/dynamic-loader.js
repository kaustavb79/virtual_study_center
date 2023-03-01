
// loader.js start

function dynamic_loader_start(loader_obj){
    reset_dl_root_css();

    var dl_loaders = {};
    dl_loaders['circle'] = `<div class="lds-circle"><div></div></div>`;
    dl_loaders['dual-ring'] = `<div class="lds-dual-ring"></div>`;
    dl_loaders['facebook'] = `<div class="lds-facebook"><div></div><div></div><div></div></div>`;
    dl_loaders['heart'] = `<div class="lds-heart"><div></div></div>`;
    dl_loaders['ring'] = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
    dl_loaders['editor'] = `<div class="lds-editor"><div></div><div></div><div></div><div></div></div>`;
    dl_loaders['roller'] = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    dl_loaders['default'] = `<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    dl_loaders['ellipsis'] = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    dl_loaders['grid'] = `<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    dl_loaders['hourglass'] = `<div class="lds-hourglass"></div>`;
    dl_loaders['ripple'] = `<div class="lds-ripple"><div></div><div></div></div>`;
    dl_loaders['spinner'] = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    dl_loaders['spinner2'] = `<div aria-hidden="true" class="luein-page-adg-spinner"> <span class="luein-page-adg-spinner-container"> <span class="luein-page-adg-spinner-wrapper" size="48"> <svg class="luein-page-adg-spinner-svg" focusable="false" height="48" size="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"> <circle cx="24" cy="24" r="21.5"></circle> </svg> </span> </span> </div>`;
    dl_loaders['spinner_s'] = `<div class="lds-spinner-s"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;


    var background = `<div aria-hidden="false" class="lui-blanket" tabindex="0"></div>`;


    // set default configuration
    var data = {
        "loader":"spinner2",
        "color":"#fff",
        "width":"64px",
        "height":"64px",
        "container_id":null,
        "background":"true",
        "background_color":"#fff",
    }


    // override default configuration
    if(loader_obj){
        for (const property in data) {
            if(loader_obj[property]){
                data[property] = loader_obj[property];
            }
        }
    }


    var dl_loader_div = '';
    if(dl_loaders[data.loader]){
        dl_loader_div = `${dl_loaders[data.loader]}`;
    }

    var loader_container = `
                            <div class='dynamic-loader-container'>
                                ${dl_loader_div}
                            </div>
                           `;
    var container_content = '';
    container_content += loader_container;

    if(data.background == "true"){
        container_content += background;
    }

    if(data.container_id){
        var container_id = data.container_id;
        var container_id_elem = $(`#${container_id}`);

        if(isDomElem(container_id_elem)){
            container_id_elem.html("");
            container_id_elem.append(container_content);
            document.documentElement.style.setProperty(`--dl-position`, `inherit`);
        }else{
            $('body').append(container_content);
            $("body").addClass("dl-open");
        }
    }
    else{
        $('body').append(container_content);
        $("body").addClass("dl-open");
    }




    function isDomElem(obj) {
          if(obj instanceof HTMLCollection && obj.length) {
              for(var a = 0, len = obj.length; a < len; a++) {
                  if(!checkInstance(obj[a])) {
                      console.log(a);
                      return false;
                  }
              }
              return true;
          } else {
              return checkInstance(obj);
          }

          function checkInstance(elem) {
              if((elem instanceof jQuery && elem.length) || elem instanceof HTMLElement) {
                  return true;
              }
              return false;
          }
    }

}
function dynamic_loader_end(container_id){
    if(container_id){
        $(`#${container_id}`).html("");
    }else{
        var background = $(".lui-blanket");
        var dynamic_loader_container = $(".dynamic-loader-container");
        background.remove();
        dynamic_loader_container.remove();
        $("body").removeClass("dl-open");
    }
}

function reset_dl_root_css(){
    document.documentElement.style.setProperty(`--dl-position`, `fixed`);
    document.documentElement.style.setProperty(`--dl-lui-blanket-position`, `fixed`);
}
// loader.js end