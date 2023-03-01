var staticCacheName = "smart_attendance_luein-v" + new Date().getTime();

var filesToCache = [
    '/',
    '/login/',
    '/offline/',
    "/static/website/favicon/la_favicon.png",
    "/static/website/images/error.png",
    "/static/website/images/login_image.png",
    "/static/website/images/noise.gif",
    "/static/website/login/Data report-pana.png",
    "/static/website/login/Feedback-bro.png",
    "/static/website/login/Group video-bro.png",
    "/static/website/login/Group video-pana.png",
    "/static/website/login/Live collaboration-bro.png",
    "/static/website/login/Mobile feed-bro.png",
    "/static/website/login/Mobile Marketing-pana.png",
    "/static/website/login/Secure login-rafiki3.png",
    "/static/website/login/Video call-rafiki.png",
    "/static/luein_css/employer.css",
    "/static/luein_css/normalise.css",
    "/static/luein_modal/luein-modal-close.js",
    "/static/luein_modal/luein-modal-functions.js",
    "/static/luein_modal/luein-modal.css",
    "/static/luein_modal/luein-modal.html",
    '/static/website/pwa/icons/other/lueinanalytics_favicon_16.png',
    '/static/website/pwa/icons/other/lueinanalytics_favicon_64.png',
    '/static/website/pwa/icons/other/lueinanalytics_favicon.png',
    '/static/website/favicon/lueinanalytics_favicon.jpg',
    '/static/website/pwa/icons/other/lueinanalytics_favicon_128.png',
    '/static/website/pwa/icons/other/lueinanalytics_favicon_256.png',
    '/static/website/pwa/icons/other/lueinanalytics_favicon_512.png',
    '/static/website/pwa/icons/apple/lueinanalytics_favicon_167.png',
    '/static/website/pwa/icons/apple/lueinanalytics_favicon_152.png',
    '/static/website/pwa/icons/apple/lueinanalytics_favicon_180.png',
    '/static/website/pwa/splash_screen/apple/iphone5_splash.png',
    '/static/website/pwa/splash_screen/apple/iphone6_splash.png',
    '/static/website/pwa/splash_screen/apple/iphoneplus_splash.png',
    '/static/website/pwa/splash_screen/apple/iphonex_splash.png',
    '/static/website/pwa/splash_screen/apple/iphonexr_splash.png',
    '/static/website/pwa/splash_screen/apple/iphonexsmax_splash.png',
    '/static/website/pwa/splash_screen/apple/ipad_splash.png',
    '/static/website/pwa/splash_screen/apple/ipadpro1_splash.png',
    '/static/website/pwa/splash_screen/apple/ipadpro3_splash.png',
    '/static/website/pwa/splash_screen/apple/ipadpro2_splash.png',
    "/static/bootstrap/css/bootstrap-grid.css",
    "/static/bootstrap/css/bootstrap-grid.min.css",
    "/static/bootstrap/css/bootstrap-reboot.css",
    "/static/bootstrap/css/bootstrap-reboot.min.css",
    "/static/bootstrap/css/bootstrap.css",
    "/static/bootstrap/css/bootstrap.min.css",
    "/static/bootstrap/js/bootstrap.bundle.js",
    "/static/bootstrap/js/bootstrap.bundle.min.js",
    "/static/bootstrap/js/bootstrap.js",
    "/static/bootstrap/js/bootstrap.min.js",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-grid.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-grid.min.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-grid.rtl.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-grid.rtl.min.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-reboot.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-reboot.min.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-reboot.rtl.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-reboot.rtl.min.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-utilities.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-utilities.min.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-utilities.rtl.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap-utilities.rtl.min.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap.min.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap.rtl.css",
    "/static/bootstrap-5.2.2-dist/css/bootstrap.rtl.min.css",
    "/static/bootstrap-5.2.2-dist/js/bootstrap.bundle.js",
    "/static/bootstrap-5.2.2-dist/js/bootstrap.bundle.min.js",
    "/static/bootstrap-5.2.2-dist/js/bootstrap.esm.js",
    "/static/bootstrap-5.2.2-dist/js/bootstrap.esm.min.js",
    "/static/bootstrap-5.2.2-dist/js/bootstrap.js",
    "/static/bootstrap-5.2.2-dist/js/bootstrap.min.js",
    "/static/chartjs/fusioncharts.charts.js",
    "/static/chartjs/fusioncharts.js",
    "/static/chartjs/fusioncharts.theme.fusion.js",
    "/static/css/django-pwa-app.css",
    "/static/dynamic-confirmation/dynamic-confirmation.css",
    "/static/dynamic-confirmation/dynamic-confirmation.html",
    "/static/dynamic-confirmation/dynamic-confirmation.js",
    "/static/dynamic_loader/dynamic-loader.css",
    "/static/dynamic_loader/dynamic-loader.html",
    "/static/dynamic_loader/dynamic-loader.js",
    "/static/fontawesome/css/all.css",
    "/static/fontawesome/css/all.min.css",
    "/static/fontawesome/css/brands.css",
    "/static/fontawesome/css/brands.min.css",
    "/static/fontawesome/css/fontawesome.css",
    "/static/fontawesome/css/fontawesome.min.css",
    "/static/fontawesome/css/regular.css",
    "/static/fontawesome/css/regular.min.css",
    "/static/fontawesome/css/solid.css",
    "/static/fontawesome/css/solid.min.css",
    "/static/fontawesome/css/svg-with-js.css",
    "/static/fontawesome/css/svg-with-js.min.css",
    "/static/fontawesome/css/v4-font-face.css",
    "/static/fontawesome/css/v4-font-face.min.css",
    "/static/fontawesome/css/v4-shims.css",
    "/static/fontawesome/css/v4-shims.min.css",
    "/static/fontawesome/css/v5-font-face.css",
    "/static/fontawesome/css/v5-font-face.min.css",
    "/static/fontawesome/js/all.js",
    "/static/fontawesome/js/all.min.js",
    "/static/fontawesome/js/brands.js",
    "/static/fontawesome/js/brands.min.js",
    "/static/fontawesome/js/conflict-detection.js",
    "/static/fontawesome/js/conflict-detection.min.js",
    "/static/fontawesome/js/fontawesome.js",
    "/static/fontawesome/js/fontawesome.min.js",
    "/static/fontawesome/js/regular.js",
    "/static/fontawesome/js/regular.min.js",
    "/static/fontawesome/js/solid.js",
    "/static/fontawesome/js/solid.min.js",
    "/static/fontawesome/js/v4-shims.js",
    "/static/fontawesome/js/v4-shims.min.js",
    "/static/admin/css/autocomplete.css",
    "/static/admin/css/base.css",
    "/static/admin/css/changelists.css",
    "/static/admin/css/dashboard.css",
    "/static/admin/css/fonts.css",
    "/static/admin/css/forms.css",
    "/static/admin/css/login.css",
    "/static/admin/css/nav_sidebar.css",
    "/static/admin/css/responsive.css",
    "/static/admin/css/responsive_rtl.css",
    "/static/admin/css/rtl.css",
    "/static/admin/css/widgets.css",
    "/static/admin/css/vendor/select2/select2.css",
    "/static/admin/css/vendor/select2/select2.min.css",
    "/static/admin/img/calendar-icons.svg",
    "/static/admin/img/icon-addlink.svg",
    "/static/admin/img/icon-alert.svg",
    "/static/admin/img/icon-calendar.svg",
    "/static/admin/img/icon-changelink.svg",
    "/static/admin/img/icon-clock.svg",
    "/static/admin/img/icon-deletelink.svg",
    "/static/admin/img/icon-no.svg",
    "/static/admin/img/icon-unknown-alt.svg",
    "/static/admin/img/icon-unknown.svg",
    "/static/admin/img/icon-viewlink.svg",
    "/static/admin/img/icon-yes.svg",
    "/static/admin/img/inline-delete.svg",
    "/static/admin/img/search.svg",
    "/static/admin/img/selector-icons.svg",
    "/static/admin/img/sorting-icons.svg",
    "/static/admin/img/tooltag-add.svg",
    "/static/admin/img/tooltag-arrowright.svg",
    "/static/admin/img/gis/move_vertex_off.svg",
    "/static/admin/img/gis/move_vertex_on.svg",
    "/static/admin/js/actions.js",
    "/static/admin/js/autocomplete.js",
    "/static/admin/js/calendar.js",
    "/static/admin/js/cancel.js",
    "/static/admin/js/change_form.js",
    "/static/admin/js/collapse.js",
    "/static/admin/js/core.js",
    "/static/admin/js/inlines.js",
    "/static/admin/js/jquery.init.js",
    "/static/admin/js/nav_sidebar.js",
    "/static/admin/js/popup_response.js",
    "/static/admin/js/prepopulate.js",
    "/static/admin/js/prepopulate_init.js",
    "/static/admin/js/SelectBox.js",
    "/static/admin/js/SelectFilter2.js",
    "/static/admin/js/urlify.js",
    "/static/admin/js/admin/DateTimeShortcuts.js",
    "/static/admin/js/admin/RelatedObjectLookups.js",
    "/static/admin/js/vendor/jquery/jquery.js",
    "/static/admin/js/vendor/jquery/jquery.min.js",
    "/static/admin/js/vendor/select2/select2.full.js",
    "/static/admin/js/vendor/select2/select2.full.min.js",
    "/static/admin/js/vendor/select2/i18n/af.js",
    "/static/admin/js/vendor/select2/i18n/ar.js",
    "/static/admin/js/vendor/select2/i18n/az.js",
    "/static/admin/js/vendor/select2/i18n/bg.js",
    "/static/admin/js/vendor/select2/i18n/bn.js",
    "/static/admin/js/vendor/select2/i18n/bs.js",
    "/static/admin/js/vendor/select2/i18n/ca.js",
    "/static/admin/js/vendor/select2/i18n/cs.js",
    "/static/admin/js/vendor/select2/i18n/da.js",
    "/static/admin/js/vendor/select2/i18n/de.js",
    "/static/admin/js/vendor/select2/i18n/dsb.js",
    "/static/admin/js/vendor/select2/i18n/el.js",
    "/static/admin/js/vendor/select2/i18n/en.js",
    "/static/admin/js/vendor/select2/i18n/es.js",
    "/static/admin/js/vendor/select2/i18n/et.js",
    "/static/admin/js/vendor/select2/i18n/eu.js",
    "/static/admin/js/vendor/select2/i18n/fa.js",
    "/static/admin/js/vendor/select2/i18n/fi.js",
    "/static/admin/js/vendor/select2/i18n/fr.js",
    "/static/admin/js/vendor/select2/i18n/gl.js",
    "/static/admin/js/vendor/select2/i18n/he.js",
    "/static/admin/js/vendor/select2/i18n/hi.js",
    "/static/admin/js/vendor/select2/i18n/hr.js",
    "/static/admin/js/vendor/select2/i18n/hsb.js",
    "/static/admin/js/vendor/select2/i18n/hu.js",
    "/static/admin/js/vendor/select2/i18n/hy.js",
    "/static/admin/js/vendor/select2/i18n/id.js",
    "/static/admin/js/vendor/select2/i18n/is.js",
    "/static/admin/js/vendor/select2/i18n/it.js",
    "/static/admin/js/vendor/select2/i18n/ja.js",
    "/static/admin/js/vendor/select2/i18n/ka.js",
    "/static/admin/js/vendor/select2/i18n/km.js",
    "/static/admin/js/vendor/select2/i18n/ko.js",
    "/static/admin/js/vendor/select2/i18n/lt.js",
    "/static/admin/js/vendor/select2/i18n/lv.js",
    "/static/admin/js/vendor/select2/i18n/mk.js",
    "/static/admin/js/vendor/select2/i18n/ms.js",
    "/static/admin/js/vendor/select2/i18n/nb.js",
    "/static/admin/js/vendor/select2/i18n/ne.js",
    "/static/admin/js/vendor/select2/i18n/nl.js",
    "/static/admin/js/vendor/select2/i18n/pl.js",
    "/static/admin/js/vendor/select2/i18n/ps.js",
    "/static/admin/js/vendor/select2/i18n/pt-BR.js",
    "/static/admin/js/vendor/select2/i18n/pt.js",
    "/static/admin/js/vendor/select2/i18n/ro.js",
    "/static/admin/js/vendor/select2/i18n/ru.js",
    "/static/admin/js/vendor/select2/i18n/sk.js",
    "/static/admin/js/vendor/select2/i18n/sl.js",
    "/static/admin/js/vendor/select2/i18n/sq.js",
    "/static/admin/js/vendor/select2/i18n/sr-Cyrl.js",
    "/static/admin/js/vendor/select2/i18n/sr.js",
    "/static/admin/js/vendor/select2/i18n/sv.js",
    "/static/admin/js/vendor/select2/i18n/th.js",
    "/static/admin/js/vendor/select2/i18n/tk.js",
    "/static/admin/js/vendor/select2/i18n/tr.js",
    "/static/admin/js/vendor/select2/i18n/uk.js",
    "/static/admin/js/vendor/select2/i18n/vi.js",
    "/static/admin/js/vendor/select2/i18n/zh-CN.js",
    "/static/admin/js/vendor/select2/i18n/zh-TW.js",
    "/static/admin/js/vendor/xregexp/xregexp.js",
    "/static/admin/js/vendor/xregexp/xregexp.min.js",
    "/static/alerts/alert.css",
    "/static/alerts/alert.js",
    "/static/tree2/32px.png",
    "/static/tree2/40px.png",
    "/static/tree2/throbber.gif",
    "/static/tree2/tree_icon.png",
    "/static/webpush/webpush.js",
    "/static/jquery/js/jquery-3.6.1.js",
    "/static/jquery/js/jquery-3.6.1.min.js",
    "/static/jquery/js/jquery.min.js",
    "/static/jquery/js/popper.min.js",
];

var urls_to_ignore = [
    '/webpush/save_information/',
    '/captcha/',
    '/logout/'
];

function handleInstall(event){
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                console.log('[Service Worker] Caching files ')
                return cache.addAll(filesToCache);
            })
            .catch(error => console.error("ERROR: ",error))
    )
}

function handleActivation(event){
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith("smart_attendance_luein")))
                    .filter(cacheName => (cacheName!==staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    )
}

function pushNotification(event){
    // Retrieve the textual payload from event.data (a PushMessageData object).
    // Other formats are supported (ArrayBuffer, Blob, JSON), check out the documentation
    // on https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData.
    const eventInfo = event.data.text();
    const data = JSON.parse(eventInfo);
    const head = data.head || 'Notification';
    const body = data.body || 'No new notification!!!';

    // Keep the service worker alive until the notification is created.
    event.waitUntil(
        self.registration.showNotification(head, {
            body: body,
            icon: '/static/website/favicon/lueinanalytics_favicon.jpg'
        })
    );
}

function handleMessages(event){
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(staticCacheName)
                .then( (cache) => {
                    return cache.addAll(event.data.payload);
                })
        );
    }
}

function handleFetch(event){
    let online = navigator.onLine;
//    console.log("[Service Worker] Network Status: (isOnline) --- ",online);

    if(event.request.method !== "GET"){
        console.log("Fetched POST request!!");
        return;
    }

    var urls_to_ignore_flag = false;
    for(let i=0;i<urls_to_ignore.length;i++){
        if(event.request.url.includes(urls_to_ignore[i])){
            urls_to_ignore_flag = true;
            break;
        }
    }

    if(!urls_to_ignore_flag && event.request.url.startsWith(self.location.origin)){
        event.respondWith(
            // try to return untouched request from network first
            fetch(event.request, {credentials:'include'})
                .then(function(response) {
                    saveResponseInCache(event,response);
                    return response;
                })
                .catch(function() {
                  // if it fails, try to return request from the cache
                  return caches.match(event.request).then(function(response) {
                    if (response) {
                      console.log("[Service Worker] Returning from cache: ",event.request.url);
                      return response;
                    }
                    // if not found in cache, return default offline content
                    if (event.request.headers.get('accept').includes('text/html')) {
                      return caches.match('offline');
                    }
                  })
                })
        );
    }
}

function saveResponseInCache(event,res) {
    if (res ||  res.type === 'basic'){
        if(res.status === 200){
            var response = res.clone();
            caches.open(staticCacheName).then(function (cache) {
                console.log("[Service Worker] Caching new resource: ",event.request.url);
                cache.put(event.request, response);
            });
        }
    }
}

// Cache on install
self.addEventListener("install",handleInstall);
self.addEventListener("activate",handleActivation);
self.addEventListener("fetch",handleFetch);
self.addEventListener("message",handleMessages);
self.addEventListener('push', pushNotification);

