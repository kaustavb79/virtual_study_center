"use strict"
{% load static %}


function onStateChange(from) {
      return function(e) {
          console.warn('statechange initial state ', from, 'changed to', e.target.state);
      }
}

// register service worker
const registerSw = async () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/serviceworker.js')
            .then((registration) => {
//                const data = {
//                    type: 'CACHE_URLS',
//                    payload: [
//                        location.href
//                    ]
//                };

                if (registration.waiting) {
                    console.warn('waiting', registration.waiting);
                    registration.waiting.addEventListener('statechange', onStateChange('waiting'));
                }

                if (registration.installing) {
                    console.warn('installing', registration.installing);
                    registration.installing.addEventListener('statechange', onStateChange('installing'));
                }

                if (registration.active) {
                    console.warn('active', registration.active);
                    registration.active.addEventListener('statechange', onStateChange('active'));
                }
            })
            .catch((err) => console.warn('SW registration FAIL:', err));
    }
};

const unregisterServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        const service_worker = await navigator.serviceWorker.getRegistration('/');
        service_worker.unregister();
    } else {
        console.warn("No service worker has been registered yet.");
    }
};


// notification permission

typeof Notification!=="undefined";

function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(function (permissionResult) {
    if (permissionResult !== 'granted') {
      console.warn("Notification permission not granted!!!");
    }
  })
  .catch(() => {
      console.warn("Showing notifications isn't supported!!!")
  });
}

/*
    NOTIFICATION PUSH API
*/

// check if a user is eligible to receive push notifications before attempting to subscribe them
const initialiseState = (reg) => {
    if (!reg.showNotification) {
        console.warn("Showing notifications isn't supported")
        return
    }
    if (Notification.permission === 'denied') {
        console.error("You prevented us from showing notifications ")
        return
    }
    if (!'PushManager' in window) {
        console.error("Push isn't allowed in your browser")
        return
    }
    subscribe(reg);
}
//subscribe them using pushManager

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    const outputData = outputArray.map((output, index) => rawData.charCodeAt(index));

    return outputData;
}

const subscribe = async (reg) => {
    const subscription = await reg.pushManager.getSubscription();
    if (subscription) {
        sendSubData(subscription);
        return;
    }

    const vapidMeta = document.querySelector('meta[name="vapid-key"]');
//    console.warn(vapidMeta);
    const key = vapidMeta.content;
    const options = {
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(key)
    };

    const permission = await reg.pushManager.permissionState(options);
//    console.warn(permission);
    if(permission==="granted"){
        const sub = await reg.pushManager.subscribe(options);
        sendSubData(sub);
    }
};

// After successfully subscribing a user, the next step is to send the subscription data to the server. The data will be sent to the webpush/save_information endpoint provided by the django-webpush package. Add the following code below the subscribe function
const sendSubData = async (subscription) => {
    const browser = navigator.userAgent.match(/(firefox|msie|chrome|safari|trident)/ig)[0].toLowerCase();
    const data = {
        status_type: 'subscribe',
        subscription: subscription.toJSON(),
        browser: browser,
        user_agent: navigator.userAgent,
        group: "{{ user.profile.role }}"
    };
//    console.warn(data);

    const res = await fetch("/webpush/save_information", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    });

    handleResponse(res);
};

const handleResponse = (res) => {
    console.warn("Save Subscription---")
    console.warn("STATUS CODE: ",res.status);
//    console.warn(res);
};


const registerPushNotification = async () => {
    if ('serviceWorker' in navigator) {
        const service_worker = await navigator.serviceWorker.getRegistration('/');
//        console.log("service_worker: ",service_worker);
        if(service_worker === null){
            console.warn("No service worker has been registered yet.");
        }
        else{
            initialiseState(service_worker);
        }
    } else {
        console.warn("PWA functionality not supported!");
    }
};

/*
    notification push api end
*/

//function googleTranslateElementInit() {
//    new google.translate.TranslateElement({
//    pageLanguage: 'en',
//    includedLanguages: 'es',
////    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//    layout: google.translate.TranslateElement.InlineLayout.VERTICAL,
////    layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,
//    autoDisplay: false,
//    includedLanguages: ''}, 'google_translate_element');
//}


function googleTranslateElementInit() {
  new google.translate.TranslateElement({
  pageLanguage: 'en'
  }, 'google_translate_element');
}

function google_translate_element_btn(){
    if($(".google_translate_element_btn").hasClass('o')){
        close_google_translate();
    }else{
        open_google_translate();
    }
}
function open_google_translate(){
    $("#google_translate_element").removeClass('dn');
    $(".google_translate_element_btn").addClass('o');

    $(document).bind('click.google_translate',function(e){
        var container = $("#google_translate_element");
        var container2 = $(".google_translate_element_btn");
//                console.log(e);
        // if the target of the click isn't the container nor a descendant of the container
        if ((!container.is(e.target) && container.has(e.target).length === 0)&&
        (!container2.is(e.target) && container2.has(e.target).length === 0))
        {
            close_google_translate();
            $(document).unbind('click.google_translate');
        }
    });
}
function close_google_translate(){
    $("#google_translate_element").addClass('dn');
    $(".google_translate_element_btn").removeClass('o');
}
$(document).ready(function(){
    $(".google_translate_element_btn").unbind("click.google_translate_element_btn", google_translate_element_btn)
    $(".google_translate_element_btn").bind("click.google_translate_element_btn", google_translate_element_btn)

    googleTranslateElementInit();
    $("body").on("change", "#google_translate_element select", function (e) {
        console.warn(e);
        console.warn($(this).find(":selected").text());
        console.warn($(this).find(":selected").val());
        google_translate_element_btn();
    });

});


/*
    network status
*/
function checkNetworkStatus(){
    function hasNetwork(online) {
      const element = document.querySelector(".app_status");
      // Update the DOM to reflect the current status
      if (online) {
        if(element.classList.contains('offline')){
            element.classList.remove("offline");
            element.classList.add("online");
            element.innerText = "You are back online";
//            element.animate({
//                opacity: "-=1"
//            }, 1000, function() {
//                element.remove();
//            });

            $(element).fadeOut(3000)
        }
      } else {
        element.classList.remove("online");
        element.classList.add("offline");
        element.innerText = "You are offline";
        $(element).fadeIn(500)
      }
    }

    window.addEventListener("load", () => {
          hasNetwork(navigator.onLine);

          window.addEventListener("online", () => {
            // Set hasNetwork to online when they change to online.
            hasNetwork(true);
          });

          window.addEventListener("offline", () => {
            // Set hasNetwork to offline when they change to offline.
            hasNetwork(false);
          });

    });
}


// DRIVER SEGMENT [METHOD CALLS]
checkNetworkStatus();
askPermission();
registerSw();

{% if user.is_authenticated %}
registerPushNotification();
{% endif %}