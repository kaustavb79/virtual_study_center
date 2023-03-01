// update - 19 jan 2023
// fix - individual close
// add - close by dcc_id

// update - 29 dec 2022
// add - dcc_id : for individual close

// dynamic-confirmation.js start

const dcc_id_list = []
function dynamic_confirmation(confirmation_obj){
    reset_dcc_root_css();

    // dc_icons is a object of svg icons with key value pair
    var dc_icons = {};
    dc_icons['delete']=`<svg height="50" width="50" style=" fill:#000000;" viewBox="0 0 172 172"  x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
                            <g fill="none" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none" stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none">
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#e74c3c">
                                    <path d="M79.12,22.36c-2.82935,0 -5.16,2.33065 -5.16,5.16v3.44h-18.46312c-3.01809,0 -5.82411,1.58723 -7.37719,4.1757l-2.6539,4.4243h-5.90578c-3.77941,0 -6.88,3.10059 -6.88,6.88c0,3.77941 3.10059,6.88 6.88,6.88h1.84766l6.14766,79.90945c0.41158,5.36088 4.91248,9.53055 10.28976,9.53055h56.30985c5.37729,0 9.87818,-4.16967 10.28976,-9.53055l6.14766,-79.90945h1.84766c3.77941,0 6.88,-3.10059 6.88,-6.88c0,-3.77941 -3.10059,-6.88 -6.88,-6.88h-5.90578l-2.6539,-4.4243c-1.55309,-2.58847 -4.3591,-4.1757 -7.37719,-4.1757h-18.46313v-3.44c0,-2.82935 -2.33065,-5.16 -5.16,-5.16zM79.12,25.8h13.76c0.97185,0 1.72,0.74815 1.72,1.72v3.44h-17.2v-3.44c0,-0.97185 0.74815,-1.72 1.72,-1.72zM55.49688,34.4h19.89422c0.18575,0.0307 0.37527,0.0307 0.56102,0h20.07898c0.18575,0.0307 0.37527,0.0307 0.56102,0h19.91102c1.81511,0 3.49026,0.94936 4.4243,2.50609l2.62703,4.37391h-5.73445c-0.31015,-0.00439 -0.59863,0.15856 -0.75498,0.42645c-0.15635,0.26789 -0.15635,0.59921 0,0.8671c0.15635,0.26789 0.44484,0.43084 0.75498,0.42645h8.6h6.02c1.92067,0 3.44,1.51933 3.44,3.44c0,1.92067 -1.51933,3.44 -3.44,3.44h-92.88c-1.92067,0 -3.44,-1.51933 -3.44,-3.44c0,-1.92067 1.51933,-3.44 3.44,-3.44h6.88h59.34c0.31015,0.00439 0.59863,-0.15856 0.75498,-0.42645c0.15635,-0.26789 0.15635,-0.59921 0,-0.8671c-0.15635,-0.26789 -0.44484,-0.43084 -0.75498,-0.42645h-57.33445l2.62703,-4.37391c0.93404,-1.55673 2.60919,-2.50609 4.4243,-2.50609zM110.94,41.28c-0.31015,-0.00439 -0.59863,0.15856 -0.75498,0.42645c-0.15635,0.26789 -0.15635,0.59921 0,0.8671c0.15635,0.26789 0.44484,0.43084 0.75498,0.42645h3.44c0.31015,0.00439 0.59863,-0.15856 0.75498,-0.42645c0.15635,-0.26789 0.15635,-0.59921 0,-0.8671c-0.15635,-0.26789 -0.44484,-0.43084 -0.75498,-0.42645zM44.85438,53.32h82.29125l-6.13086,79.64742c-0.27642,3.60032 -3.24841,6.35258 -6.85984,6.35258h-56.30985c-3.61143,0 -6.58343,-2.75226 -6.85984,-6.35258zM65.36,60.2c-2.83988,0 -5.16,2.32012 -5.16,5.16v60.2c0,2.83988 2.32012,5.16 5.16,5.16c2.83988,0 5.16,-2.32012 5.16,-5.16v-60.2c0,-2.83988 -2.32012,-5.16 -5.16,-5.16zM86,60.2c-2.83988,0 -5.16,2.32012 -5.16,5.16v60.2c0,2.83988 2.32012,5.16 5.16,5.16c2.83988,0 5.16,-2.32012 5.16,-5.16v-6.02c0.00439,-0.31015 -0.15856,-0.59863 -0.42645,-0.75498c-0.26789,-0.15635 -0.59921,-0.15635 -0.8671,0c-0.26789,0.15635 -0.43084,0.44484 -0.42645,0.75498v6.02c0,1.91076 -1.52924,3.44 -3.44,3.44c-1.91076,0 -3.44,-1.52924 -3.44,-3.44v-60.2c0,-1.91076 1.52924,-3.44 3.44,-3.44c1.91076,0 3.44,1.52924 3.44,3.44v43.86c-0.00439,0.31015 0.15856,0.59863 0.42645,0.75498c0.26789,0.15635 0.59921,0.15635 0.8671,0c0.26789,-0.15635 0.43084,-0.44484 0.42645,-0.75498v-43.86c0,-2.83988 -2.32012,-5.16 -5.16,-5.16zM106.64,60.2c-2.83988,0 -5.16,2.32012 -5.16,5.16v2.58c-0.00439,0.31015 0.15856,0.59863 0.42645,0.75498c0.26789,0.15635 0.59921,0.15635 0.8671,0c0.26789,-0.15635 0.43084,-0.44484 0.42645,-0.75498v-2.58c0,-1.91076 1.52924,-3.44 3.44,-3.44c1.91076,0 3.44,1.52924 3.44,3.44v60.2c0,1.91076 -1.52924,3.44 -3.44,3.44c-1.91076,0 -3.44,-1.52924 -3.44,-3.44v-43.86c0.00439,-0.31015 -0.15856,-0.59863 -0.42645,-0.75498c-0.26789,-0.15635 -0.59921,-0.15635 -0.8671,0c-0.26789,0.15635 -0.43084,0.44484 -0.42645,0.75498v43.86c0,2.83988 2.32012,5.16 5.16,5.16c2.83988,0 5.16,-2.32012 5.16,-5.16v-60.2c0,-2.83988 -2.32012,-5.16 -5.16,-5.16zM65.36,61.92c1.91076,0 3.44,1.52924 3.44,3.44v60.2c0,1.91076 -1.52924,3.44 -3.44,3.44c-1.91076,0 -3.44,-1.52924 -3.44,-3.44v-60.2c0,-1.91076 1.52924,-3.44 3.44,-3.44zM102.32656,72.22656c-0.22809,0.00356 -0.44542,0.09758 -0.60418,0.26138c-0.15876,0.1638 -0.24595,0.38397 -0.24238,0.61205v3.44c-0.00439,0.31015 0.15856,0.59863 0.42645,0.75498c0.26789,0.15635 0.59921,0.15635 0.8671,0c0.26789,-0.15635 0.43084,-0.44484 0.42645,-0.75498v-3.44c0.00364,-0.23275 -0.08721,-0.45703 -0.25181,-0.62163c-0.1646,-0.1646 -0.38888,-0.25545 -0.62163,-0.25181z"></path>
                                </g>
                            </g>
                        </svg>`;

    dc_icons['confirm']=`<svg height="50" style=" fill:#000000;" viewBox="0 0 172 172" width="50" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
                            <g fill="none" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none" stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none">
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#f1c40f">
                                    <path d="M86,14.33333c-39.5815,0 -71.66667,32.08517 -71.66667,71.66667c0,39.5815 32.08517,71.66667 71.66667,71.66667c39.5815,0 71.66667,-32.08517 71.66667,-71.66667c0,-39.5815 -32.08517,-71.66667 -71.66667,-71.66667zM86,28.66667c31.66233,0 57.33333,25.671 57.33333,57.33333c0,31.66233 -25.671,57.33333 -57.33333,57.33333c-31.66233,0 -57.33333,-25.671 -57.33333,-57.33333c0,-31.66233 25.671,-57.33333 57.33333,-57.33333zM78.83333,50.16667v43h14.33333v-43zM78.83333,107.5v14.33333h14.33333v-14.33333z"></path>
                                </g>
                            </g>
                        </svg>`;

    dc_icons['high_risk']=`<svg height="50" width="50" style=" fill:#000000;" viewBox="0 0 172 172"  x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
                            <g fill="none" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none" stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none">
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#e74c3c">
                                    <path d="M86,10.45438c-3.55504,0 -7.10998,1.71993 -9.07031,5.16672l-72.09219,126.78953c-3.91834,6.89328 1.15173,15.82937 9.07703,15.82937h144.17094c7.9253,0 12.99381,-8.94057 9.07703,-15.8361l-72.09219,-126.78281c-1.96033,-3.44678 -5.51527,-5.16672 -9.07031,-5.16672zM86,17.06563c1.17324,0 2.34711,0.65458 3.09063,1.96187l72.09219,126.7761h-0.00672c1.48418,2.61263 -0.20745,5.5564 -3.09063,5.5564h-144.17094c-2.88318,0 -4.57981,-2.94169 -3.09734,-5.54969l72.09219,-126.78281c0.74351,-1.3073 1.91739,-1.96187 3.09063,-1.96187zM30.96672,17.15969c-1.33938,-0.01601 -2.56628,0.74682 -3.14446,1.95509c-0.57818,1.20826 -0.4025,2.64226 0.45024,3.67522l13.76,17.2c0.768,0.96054 1.99017,1.43829 3.20598,1.25323c1.21582,-0.18506 2.2405,-1.0048 2.68793,-2.15034c0.44743,-1.14554 0.24961,-2.44277 -0.51891,-3.40289l-13.76,-17.2c-0.64382,-0.82923 -1.63102,-1.31912 -2.68078,-1.33031zM140.9325,17.16641c-1.01301,0.03952 -1.95702,0.52382 -2.58,1.32359l-13.76,17.2c-0.76853,0.96012 -0.96634,2.25735 -0.51891,3.40289c0.44743,1.14554 1.47211,1.96528 2.68793,2.15034c1.21582,0.18506 2.43799,-0.29269 3.20598,-1.25323l13.76,-17.2c0.8617,-1.04716 1.02784,-2.50284 0.42427,-3.71724c-0.60357,-1.2144 -1.86424,-1.96093 -3.21927,-1.90635zM10.19906,41.25985c-1.58923,0.03635 -2.94663,1.15679 -3.28352,2.71033c-0.33689,1.55354 0.43445,3.13561 1.86587,3.82701l20.64,10.32c1.69948,0.84974 3.76604,0.16089 4.61578,-1.53859c0.84974,-1.69948 0.16089,-3.76604 -1.53859,-4.61578l-20.64,-10.32c-0.51234,-0.26473 -1.083,-0.39642 -1.65953,-0.38297zM161.69344,41.25985c-0.54024,0.00402 -1.07193,0.13522 -1.55203,0.38297l-20.64,10.32c-1.09959,0.54956 -1.82241,1.64406 -1.89613,2.87112c-0.07372,1.22706 0.51286,2.40023 1.53875,3.07749c1.02588,0.67726 2.33518,0.7557 3.43458,0.20576l20.64,-10.32c1.44856,-0.70062 2.21799,-2.31173 1.85241,-3.87875c-0.36558,-1.56702 -1.76851,-2.67131 -3.37756,-2.6586zM82.55328,58.48c-1.89888,0 -3.43328,1.54112 -3.43328,3.44v48.16c0,1.89888 1.52424,3.44 3.42656,3.44h6.89344c1.89888,0 3.43328,-1.54112 3.43328,-3.44l0.00672,-48.16c0,-1.89888 -1.53096,-3.44 -3.43328,-3.44zM3.44,72.24c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h20.64c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058zM147.92,72.24c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h20.64c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058zM82.55328,123.84c-1.89888,0 -3.43328,1.54112 -3.43328,3.44v6.88c0,1.89888 1.53096,3.44 3.43328,3.44h6.89344c1.89888,0 3.43328,-1.54112 3.43328,-3.44v-6.88c0,-1.89888 -1.53096,-3.44 -3.43328,-3.44z"></path>
                                </g>
                            </g>
                        </svg>`;
    dc_icons['alert']=`<svg height="50" style=" fill:#000000;" viewBox="0 0 172 172" width="50" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
                            <g fill="none" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none" stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none">
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#f1c40f">
                                    <path d="M86,20.64c-5.65719,0 -10.32,4.66281 -10.32,10.32v4.8375c-6.69187,1.57219 -12.53719,4.67625 -17.03875,9.20469c-6.71875,6.78594 -10.48125,16.39375 -10.48125,27.45281v26.83469c0,6.31563 -3.45344,14.32438 -7.01437,20.26375l-6.16781,9.25844c-0.69875,1.06156 -0.76594,2.41875 -0.17469,3.53406c0.60469,1.11531 1.77375,1.81406 3.03687,1.81406h30.96c0,9.44656 7.75344,17.2 17.2,17.2c9.44656,0 17.2,-7.75344 17.2,-17.2h30.96c1.26313,0 2.43219,-0.69875 3.03688,-1.81406c0.59125,-1.11531 0.52406,-2.4725 -0.17469,-3.53406l-6.14094,-9.21813l-0.01344,-0.01344c-3.60125,-6.00656 -7.02781,-13.50469 -7.02781,-19.82031v-26.83469c0,-18.46313 -10.99187,-32.76063 -27.52,-37.00688v-4.95844c0,-5.65719 -4.66281,-10.32 -10.32,-10.32zM86,27.52c1.90813,0 3.44,1.53188 3.44,3.44v3.82969c-0.76594,-0.06719 -1.51844,-0.14781 -2.29781,-0.17469c-0.36281,-0.13437 -0.7525,-0.20156 -1.14219,-0.215c-0.37625,0 -0.73906,0.06719 -1.08844,0.20156c-0.80625,0.01344 -1.57219,0.09406 -2.35156,0.14781v-3.78938c0,-1.90812 1.53188,-3.44 3.44,-3.44zM11.97281,32.59938c-7.67281,12.47 -11.97281,27.31844 -11.97281,43.08062c0,15.76219 4.3,30.61063 11.97281,43.08063l5.87219,-3.60125c-7.00094,-11.38156 -10.965,-24.96688 -10.965,-39.47938c0,-14.5125 3.96406,-28.09781 10.965,-39.47937zM160.02719,32.59938l-5.87219,3.60125c7.00094,11.38156 10.965,24.96687 10.965,39.47937c0,14.5125 -3.96406,28.09781 -10.965,39.47938l5.87219,3.60125c7.67281,-12.47 11.97281,-27.31844 11.97281,-43.08063c0,-15.76219 -4.3,-30.61062 -11.97281,-43.08062zM86,41.28c18.96031,0 30.96,12.61781 30.96,31.64531v26.83469c0,8.64031 4.13875,16.91781 8.00875,23.38125c0.04031,0.04031 0.06719,0.09406 0.09406,0.13438l2.66062,4.00437h-83.44687l2.66062,-4.00437c0.02688,-0.04031 0.05375,-0.09406 0.09406,-0.13438c3.91031,-6.51719 8.00875,-15.21125 8.00875,-23.85156v-26.83469c0,-9.51375 3.14438,-17.21344 8.4925,-22.60187c5.33469,-5.38844 12.96719,-8.57313 22.4675,-8.57313zM26.88844,41.76375c-6.26187,10.11844 -9.68844,21.37906 -9.68844,33.91625c0,12.63125 3.88344,24.24125 9.66156,33.87594l5.89906,-3.5475c-5.21375,-8.7075 -8.68063,-19.10812 -8.68063,-30.32844c0,-11.31437 2.99656,-21.15062 8.65375,-30.30156zM145.11156,41.76375l-5.84531,3.61469c5.65719,9.15094 8.65375,18.98719 8.65375,30.30156c0,11.22031 -3.46687,21.62094 -8.69406,30.32844l5.9125,3.5475c5.77813,-9.63469 9.66156,-21.24469 9.66156,-33.87594c0,-12.53719 -3.42656,-23.79781 -9.68844,-33.91625zM75.68,134.16h20.64c0,5.6975 -4.6225,10.32 -10.32,10.32c-5.6975,0 -10.32,-4.6225 -10.32,-10.32z"></path>
                                </g>
                            </g>
                        </svg>`;
    dc_icons['archived']=`<svg height="50" style=" fill:#000000;" viewBox="0 0 172 172" width="50" x="0px" y="0px">
                            <g fill="none" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none" stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none">
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#bababa">
                                    <path d="M43,14.33333c-7.85076,0 -14.33333,6.48258 -14.33333,14.33333v114.66667c0,7.85076 6.48258,14.33333 14.33333,14.33333h86c7.85076,0 14.33333,-6.48257 14.33333,-14.33333v-114.66667c0,-7.83362 -6.49972,-14.33333 -14.33333,-14.33333h-21.5v14.33333h21.5v114.66667h-86v-114.66667h21.5v-14.33333zM78.83333,14.33333v14.33333h14.33333v-14.33333zM78.83333,35.83333v14.33333h14.33333v-14.33333zM78.83333,57.33333v14.33333h14.33333v-14.33333zM78.76334,78.83333l-2.1416,2.75749c0,0 -2.89813,3.68871 -5.79492,8.48242c-2.89679,4.79371 -6.32682,10.26974 -6.32682,17.42676c0,11.78895 9.71105,21.5 21.5,21.5c11.78895,0 21.5,-9.71105 21.5,-21.5c0,-7.23701 -3.53838,-12.70118 -6.50879,-17.49674c-2.9704,-4.79556 -5.9209,-8.48242 -5.9209,-8.48242l-2.1556,-2.6875h-3.44336zM85.90202,93.37663c0.95039,1.27985 1.45938,1.82691 2.91146,4.17122c2.46193,3.97465 4.35319,9.26999 4.35319,9.95215c0,4.04938 -3.11728,7.16667 -7.16667,7.16667c-4.04938,0 -7.16667,-3.11728 -7.16667,-7.16667c0,-0.76215 1.86624,-6.03164 4.2692,-10.00814c1.39647,-2.31092 1.87188,-2.83249 2.79948,-4.11524z"></path>
                                </g>
                            </g>
                        </svg>`;

    dc_icons['users']=`<svg height="100" style=" fill:#000000;" viewBox="0 0 226 226" width="100" x="0px" y="0px">
                            <g fill="none" fill-rule="nonzero" font-family="none" font-size="none" font-weight="none" stroke="none" stroke-dasharray="" stroke-dashoffset="0" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-width="1" style="mix-blend-mode: normal" text-anchor="none">
                                <path d="M0,226v-226h226v226z" fill="none"></path>
                                <g fill="#440055">
                                    <path d="M113,47.67188c-22.42344,0 -40.60937,18.18594 -40.60937,40.60938c0,22.42344 18.18594,40.60938 40.60938,40.60938c22.42344,0 40.60938,-18.18594 40.60938,-40.60937c0,-22.42344 -18.18594,-40.60937 -40.60937,-40.60937zM113,58.26563c16.59688,0 30.01563,13.41875 30.01563,30.01563c0,16.59687 -13.41875,30.01563 -30.01562,30.01563c-16.59687,0 -30.01562,-13.41875 -30.01562,-30.01562c0,-16.59687 13.41875,-30.01562 30.01563,-30.01562zM60.91406,65.504c-18.71563,1.05938 -33.54687,16.95069 -33.54687,36.01944c0,19.95156 16.24375,36.19531 36.19531,36.19531c6.53281,0 12.88975,-1.76632 18.36319,-5.121c2.47187,-1.4125 3.35469,-4.7665 1.76563,-7.23837c-1.4125,-2.47188 -4.7665,-3.35469 -7.23837,-1.76562c-3.88438,2.29531 -8.47569,3.53125 -13.06631,3.53125c-14.125,0 -25.60156,-11.47656 -25.60156,-25.60156c0,-13.41875 10.41719,-24.54288 23.83594,-25.42569c3.00156,-0.17656 5.11824,-2.64706 4.94168,-5.64862c-0.17656,-3.00156 -2.64706,-5.12169 -5.64862,-4.94513zM164.91007,65.504c-2.825,-0.17656 -5.47551,1.94357 -5.65207,4.94513c-0.17656,3.00156 1.94357,5.47206 4.94513,5.64862c13.41875,0.88281 23.83594,12.00694 23.83594,25.42569c0,14.125 -11.47656,25.60156 -25.60156,25.60156c-4.59062,0 -9.18194,-1.23594 -13.06632,-3.53125c-2.47188,-1.4125 -5.82587,-0.70625 -7.23837,1.76563c-1.4125,2.47188 -0.70625,5.82587 1.76563,7.23837c5.47344,3.35469 12.00694,5.121 18.36319,5.121c20.12812,-0.17656 36.37118,-16.24375 36.37118,-36.19531c0,-18.89219 -14.83056,-34.7835 -33.72275,-36.01944zM113,143.72257c-28.95625,0 -55.79237,15.71337 -70.09393,40.78525c-1.4125,2.64844 -0.53107,5.82587 2.11737,7.23837c0.88281,0.52969 1.76563,0.70694 2.64844,0.70694c1.76563,0 3.70712,-0.88281 4.58993,-2.64844c12.35938,-21.89375 35.66562,-35.48837 60.91406,-35.48837c25.07187,0 48.37813,13.59462 60.91406,35.48837c1.4125,2.47188 4.58994,3.354 7.23838,1.9415c2.47187,-1.4125 3.35744,-4.58994 1.94494,-7.23837c-14.47812,-25.07188 -41.317,-40.78525 -70.27325,-40.78525zM45.55795,150.97818c-0.35381,0.01862 -0.71246,0.07035 -1.06558,0.15863c-18.00937,5.12031 -33.5455,17.30382 -42.72675,33.371c-1.4125,2.64844 -0.53038,5.82587 1.9415,7.23837c0.88281,0.52969 1.76562,0.70694 2.64844,0.70694c1.76563,0 3.70712,-0.88281 4.58994,-2.64844c7.76875,-13.77187 21.0137,-24.18837 36.37463,-28.42587c2.825,-0.70625 4.41337,-3.70988 3.70712,-6.53488c-0.61797,-2.47188 -2.9926,-3.99611 -5.4693,-3.86575zM180.44205,150.97818c-2.47671,-0.13035 -4.85134,1.39388 -5.46931,3.86575c-0.70625,2.825 0.88212,5.82863 3.70713,6.53488c15.18437,4.2375 28.42932,14.654 36.37463,28.42587c1.05938,1.76563 2.82431,2.64844 4.58994,2.64844c0.88281,0 1.76563,-0.17725 2.64844,-0.70694c2.47187,-1.4125 3.354,-4.58994 1.9415,-7.23837c-9.18125,-16.06719 -24.71737,-28.25069 -42.72675,-33.371c-0.35312,-0.08828 -0.71176,-0.14001 -1.06557,-0.15863z"></path>
                                </g>
                            </g>
                        </svg>`;



    dc_icons['publish']='publish icon';
    dc_icons['']='';

    // set default configuration
    var data = {
        "icon":"",
        "head":"Are you sure?",
        "body":"",
        "width":"500px",
        "action_type":"",
        "before_action_yes":null,
        "action_yes":null,
        "action_no":null,
        "action_close":null,
        "position":"5",
        "cancel_text":"No",
        "submit_text":"Yes",
        "effect":"fade",
        "show_close_btn":"true",
        "close_click_outside":"false",
        "auto_close":"true",
        "alert_button_text":"OK"
    }
    var position = {
        "horizontal":"center",
        "vertical":"center"
    }
    // override default configuration
    if(confirmation_obj){
        for (const property in data) {
            if(confirmation_obj[property]){
                data[property] = confirmation_obj[property];
            }
        }
    }
    var dcc_id = dcc_uuidv4()


// "screen position number" and "keyword" to set the position of configuration overlay
//        1                   2                       3
//    top left            top center              top right
//    left top            center top              right top
//                            top
//
//        4                   5                       6
//    center left                                 center right
//    left center         center center           right center
//                           center
//
//
//        6                   7                       8
//    bottom left         bottom center           bottom right
//    left bottom         center bottom           right bottom
//                           bottom

//  set position of confirmation overlay as per "position" passed in configuration or set default
//  set "data.position" with appropriate "screen position number" if position in configuration is "not a number" means it is a string
    if(
        isNaN(parseInt(data.position))
    ){
        switch (data.position)
        {
            case "top left":
            case "left top":
            data.position = 1;
            break;

            case "top center":
            case "center top":
            case "top":
            data.position = 2;
            break;

            case "top right":
            case "right top":
            data.position = 3;
            break;

            case "center left":
            case "left center":
            data.position = 4;
            break;

            case "center center":
            case "center":
            data.position = 5;
            break;


            case "center right":
            case "right center":
            data.position = 6;
            break;

            case "bottom left":
            case "left bottom":
            data.position = 7;
            break;

            case "bottom center":
            case "center bottom":
            case "bottom":
            data.position = 8;
            break;

            case "bottom right":
            case "right bottom":
            data.position = 9;
            break;

            default:
            data.position = 5;
        }
    }

    switch (parseInt(data.position)) {

        case 1:
            position.horizontal = "flex-start";
            position.vertical = "flex-start";
        break;

        case 2:
            position.horizontal = "center";
            position.vertical = "flex-start";
        break;

        case 3:
            position.horizontal = "flex-end";
            position.vertical = "flex-start";
        break;

        case 4:
            position.horizontal = "flex-start";
            position.vertical = "center";
        break;

        case 5:
            position.horizontal = "center";
            position.vertical = "center";
        break;

        case 6:
            position.horizontal = "flex-end";
            position.vertical = "center";
        break;

        case 7:
            position.horizontal = "flex-start";
            position.vertical = "flex-end";
        break;

        case 8:
            position.horizontal = "center";
            position.vertical = "flex-end";
        break;

        case 9:
            position.horizontal = "flex-end";
            position.vertical = "flex-end";
        break;

        default:
            position.horizontal = "center";
            position.vertical = "center";
    }
    document.documentElement.style.setProperty(`--dcc-horizontal-position`, `${position.horizontal}`);
    document.documentElement.style.setProperty(`--dcc-vertical-position`, `${position.vertical}`);

    // set width of confirmation overlay as per "width" passed in configuration or set default
    document.documentElement.style.setProperty(`--dcc-content-width`, `${data.width}`);

    // set control buttons css as per "action_type" passed in configuration or set default
    if(data.action_type=="confirm"){
        document.documentElement.style.setProperty(`--dcc-cancel-color`, `#f00`);
        document.documentElement.style.setProperty(`--dcc-cancel-border-color`, `#a00000`);
        document.documentElement.style.setProperty(`--dcc-cancel-focus-shadow-color`, `#2573e880`);
        document.documentElement.style.setProperty(`--dcc-submit-color`, `#4CAF50`);
        document.documentElement.style.setProperty(`--dcc-submit-border-color`, `#005403`);
        document.documentElement.style.setProperty(`--dcc-submit-focus-shadow-color`, `#2573e880`);
    }
    else if(data.action_type=="delete"){
        document.documentElement.style.setProperty(`--dcc-cancel-color`, `#666`);
        document.documentElement.style.setProperty(`--dcc-cancel-border-color`, `#666`);
        document.documentElement.style.setProperty(`--dcc-cancel-focus-shadow-color`, `#2573e880`);
        document.documentElement.style.setProperty(`--dcc-submit-color`, `#F44336`);
        document.documentElement.style.setProperty(`--dcc-submit-border-color`, `#5f0600`);
        document.documentElement.style.setProperty(`--dcc-submit-focus-shadow-color`, `#2573e880`);
    }
    else if(data.action_type=="alert"){
        data.show_close_btn = false;
        document.documentElement.style.setProperty(`--dcc-submit-color`, `#4a7cf1`);
        document.documentElement.style.setProperty(`--dcc-submit-border-color`, `#0034ad`);
        document.documentElement.style.setProperty(`--dcc-submit-focus-shadow-color`, `#2573e880`);
        document.documentElement.style.setProperty(`--button-right-margin`, `0`);
    }
    else if(data.action_type=="overlay"){
        document.documentElement.style.setProperty(`--dcc-submit-color`, `#4a7cf1`);
        document.documentElement.style.setProperty(`--dcc-submit-border-color`, `#0034ad`);
        document.documentElement.style.setProperty(`--dcc-submit-focus-shadow-color`, `#2573e880`);
        document.documentElement.style.setProperty(`--button-right-margin`, `0`);
    }
    else if(data.action_type=="form"){

        document.documentElement.style.setProperty(`--dcc-close-color`, `#fff`);
        document.documentElement.style.setProperty(`--dcc-close-bg-color`, `#fff0`);
        document.documentElement.style.setProperty(`--dcc-close-bg-color-h`, `#fff0`);
        document.documentElement.style.setProperty(`--dcc-close-color-h`, `#f00`);

        document.documentElement.style.setProperty(`--dcc-footer-controls-div-pd`, `10px`);
        document.documentElement.style.setProperty(`--dcc-footer-controls-div-btn-pd`, `5px 15px`);


        document.documentElement.style.setProperty(`--dcc-header-container-color`, `#fff`);
        document.documentElement.style.setProperty(`--dcc-header-container-bg-color`, `#405`);
        document.documentElement.style.setProperty(`--dcc-header-container-pd`, `10px 15px 10px 15px`);
        document.documentElement.style.setProperty(`--dcc-footer-controls-div-bg-color`, `#dbd3df`);

        document.documentElement.style.setProperty(`--dcc-cancel-color`, `#666`);
        document.documentElement.style.setProperty(`--dcc-cancel-border-color`, `#666`);
        document.documentElement.style.setProperty(`--dcc-cancel-focus-shadow-color`, `#2573e880`);
        document.documentElement.style.setProperty(`--dcc-submit-color`, `#405`);
        document.documentElement.style.setProperty(`--dcc-submit-border-color`, `#5405`);
        document.documentElement.style.setProperty(`--dcc-submit-focus-shadow-color`, `#2573e880`);

    }


    // check "icons" value in configuration and set it as an svg icon from "dc_icons" object
    var dcc_header_icon_div = '';
    if(dc_icons[data.icon]){
        dcc_header_icon_div = `<div class="dcc-header-icon-div">${dc_icons[data.icon]}</div>`;
    }

    // show or hide close button on overlay
    var dcc_close_btn = ``;
    if(data.show_close_btn=="true"){
         dcc_close_btn = `<button class="dcc-close-btn" tabindex=0>×</button>`;
    }

    // show or hide cancel button on action_type = alert
    // show one button with text = OK
    var dcc_footer_controls_div = '';
    var alert_button_text = data.alert_button_text;
    if(data.action_type=="alert"){
        dcc_footer_controls_div = `<div class="dcc-footer-controls-div">
                                        <button class="dcc-submit-btn" tabindex=0>${alert_button_text}</button>
                                    </div>`;
    }
    else if(data.action_type=="overlay"){

    }
    else{
         dcc_footer_controls_div = `<div class="dcc-footer-controls-div">
                                        <button class="dcc-submit-btn" tabindex=0>${data.submit_text}</button>
                                        <button class="dcc-cancel-btn" tabindex=0>${data.cancel_text}</button>
                                    </div>`;
    }


    dcc_id_list.push(dcc_id)
    // define "dynamic-confirmation-container" html with the values passed in configuration or set default
    var confirmation_container = `<div class="dynamic-confirmation-container" data-id="${dcc_id}">
                                    <div class="dcc-wrapper">
                                        <div class="dcc-content">

                                            <div class="dcc-header-container">
                                                ${dcc_header_icon_div}
                                                <div class="dcc-header-text-div">${data.head}</div>
                                                <div class="dcc-close-div">
                                                ${dcc_close_btn}
                                            </div>
                                            </div>
                                            <div class="dcc-body-container">
                                                <div class="dcc-body-div">

                                                </div>
                                            </div>
                                            <div class="dcc-footer-container">
                                                ${dcc_footer_controls_div}
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

    // append confirmation overlay to the html body tag
    $('body').append(confirmation_container)
    var dcc_body_div = $(`.dynamic-confirmation-container[data-id="${dcc_id}"] .dcc-body-div`);

    // append body of confirmation overlay
    if(isDomElem(data.body)){
        // if data.body is a DOM element... code here..
        dcc_body_div.append(data.body);
    }else{
        // if data.body is NOT a DOM element... code here..
        dcc_body_div.append(data.body);
    }

    // define dcc_content DOM element variable
    var dcc_content = $(`.dynamic-confirmation-container[data-id="${dcc_id}"] .dcc-content`);

    // apply effect to confirmation overlay
    switch(data.effect){
        case "no":
            $(`.dynamic-confirmation-container[data-id="${dcc_id}"]`).show();
        break;

        case "fade":
            $(`.dynamic-confirmation-container[data-id="${dcc_id}"]`).fadeIn(300);
        break;

        case "shake":
            $(`.dynamic-confirmation-container[data-id="${dcc_id}"]`).show();

            var obj = {"div":dcc_content};
            shake(obj);
        break;

        default:
         $(`.dynamic-confirmation-container[data-id="${dcc_id}"]`).fadeIn(300);
    }

    // hive body scroll when dynamic confirmation overlay open
    $("body").addClass("dcc-open");


    // set focus in control button and form input fields with TAB and SHIFT + TAB
    //var dcc_btn = document.getElementById("dcc").querySelectorAll("button");
    var dcc_btn= $(`.dynamic-confirmation-container[data-id="${dcc_id}"] button,
                    .dynamic-confirmation-container[data-id="${dcc_id}"] input:not(:hidden),
                    .dynamic-confirmation-container[data-id="${dcc_id}"] textarea,
                    .dynamic-confirmation-container[data-id="${dcc_id}"] select`);
    var elements = dcc_btn;
    var n = elements.length;
    elements.keydown(function(event){
        if (event.keyCode == 9) { //if tab
            var currentIndex = elements.index(this);
            var newIndex = event.shiftKey ? (currentIndex - 1) % n : (currentIndex + 1) % n;
            var el = elements.eq(newIndex);
            if (el.attr("type") == "text")
                elements.eq(newIndex).select();
            else
                elements.eq(newIndex).focus();
            event.preventDefault();
        }
    });

    // set focus on first input element if action_type is form
    // set focus on "OK" if action_type is "alert"
    // set focus on "negative" button when confirmation overlay open with
    if(data.action_type=="alert"){
        $(`.dynamic-confirmation-container[data-id="${dcc_id}"] .dcc-submit-btn`).focus();
    }else if(data.action_type=="form"){
        focusFirst(`.dynamic-confirmation-container[data-id="${dcc_id}"] .dcc-body-div`);
    }
    else{
        $(`.dynamic-confirmation-container[data-id="${dcc_id}"] .dcc-cancel-btn`).focus();
    }

    // function to set focus on first input, textarea, select of form body
    function focusFirst(parent) {
        $(parent).find('input, textarea, select')
            .not('input[type=hidden],input[type=button],input[type=submit],input[type=reset],input[type=image],button')
            .filter(':enabled:visible:first')
            .focus();
    }

    // enable feature - close dynamic confirmation overlay on click outside the main content div and that is = "dcc_content"
    if(data.close_click_outside == "true"){
        $(document).unbind('mouseup.dcc');
        $(document).bind('mouseup.dcc',function(e)
        {
            // if the target of the click isn't the container nor a descendant of the container
            if (!dcc_content.is(e.target) && dcc_content.has(e.target).length === 0)
            {   // calling "action_close" function on closing overlay by click outside
                if(typeof(data.action_close)==="function"){
                    data.action_close();
                }
                // call function for closing overlay
                dcc_close.bind(this)();
            }
        });
    }



    // bind event listeners on "close" and "cancel" button of confirmation overlay
    $(".dcc-close-div").click( function(){
        if(typeof(data.action_close)==="function"){
            data.action_close();
        }
        if(data.auto_close == "true"){
            dcc_close.bind(this)();
        }
    });
    $(".dcc-cancel-btn").click( function(){
        if(typeof(data.action_no)==="function"){
            data.action_no();
        }
        if(data.auto_close == "true"){
            dcc_close.bind(this)();
        }
    });


    // bind event listener on "affirmative" button and call "action_yes" function with the "action_yes_data" as an argument
    // "action_yes" and "action_yes_data" were passed in configuration
    $(".dcc-submit-btn").click( function(){
        var do_before_action_yes;
        if(typeof(data.before_action_yes)==="function"){
            check_before_action_yes = data.before_action_yes();
            if(check_before_action_yes == false){
                do_before_action_yes = false;
            }
            else if(check_before_action_yes == true){
                do_before_action_yes = true;
            }
            else(
                alert("error: return true or false (boolean value only) from before_action_yes function ")
            )
        }
        else{
            do_before_action_yes = true;
        }

        if(do_before_action_yes === true){
            if(typeof(data.action_yes)==="function"){
                data.action_yes();
            }
        }
        if(do_before_action_yes === true){
            if(data.auto_close == "true"){
                dcc_close.bind(this)();
            }
        }
    });

    return dcc_id;
}

// define "dcc_close" function to close confirmation overlay and add scroll to the html body
function dcc_close(dcc_id=null){
    var data_id;
    if(dcc_id){
        data_id = dcc_id;
        $(`.dynamic-confirmation-container[data-id="${data_id}"]`).remove();
    }else{
        data_id = $(this).closest(".dynamic-confirmation-container").data("id");
        $(this).closest(".dynamic-confirmation-container").remove();
    }
    var index = dcc_id_list.indexOf(data_id);
    if (index !== -1) {
      dcc_id_list.splice(index, 1);
    }
    $("body").removeClass("dcc-open");
    $(document).unbind('mouseup.dcc');
}

// define function to shake effect of element by passing a shake configuration object
function shake(shake_obj) {
    if(shake_obj){

        // sample of shake_obj
        // var shake_config{
        //     "div":"DOM element"
        //     "interval":50
        //     "distance":10
        //     "move":5
        // }


        var div = shake_obj.div || $("body");
        var interval = shake_obj.interval || 50;
        var distance = shake_obj.distance || 10;
        var times = shake_obj.times || 5;
        var move = shake_obj.move || "left";

        if(
            (move=="top")||
            (move=="up")
        ){
            for (var iter = 0; iter < (times + 1) ; iter++) {
                $(div).animate({
                    top: ((iter % 2 == 0 ? distance : distance * -1))
                }, interval);
            }
        }
        else{
            for (var iter = 0; iter < (times + 1) ; iter++) {
                $(div).animate({
                    left: ((iter % 2 == 0 ? distance : distance * -1))
                }, interval);
            }
        }
        $(div).animate({ left: 0 }, interval);
    }
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

function reset_dcc_root_css(){
    document.documentElement.style.setProperty(`--dcc-content-border-radius`, `4px`);
    document.documentElement.style.setProperty(`--dcc-content-width`, `500px`);
    document.documentElement.style.setProperty(`--dcc-header-container-color`, `#000`);
    document.documentElement.style.setProperty(`--dcc-header-container-bg-color`, `#fff`);
    document.documentElement.style.setProperty(`--dcc-header-container-pd`, `15px 15px 15px 15px`);
    document.documentElement.style.setProperty(`--dcc-footer-controls-div-pd`, `15px`);
    document.documentElement.style.setProperty(`--dcc-footer-controls-div-bg-color`, `#fff`);
    document.documentElement.style.setProperty(`--dcc-footer-controls-div-btn-pd`, `8px 16px`);
    document.documentElement.style.setProperty(`--dcc-close-color`, `#666`);
    document.documentElement.style.setProperty(`--dcc-close-bg-color`, `#fff`);
    document.documentElement.style.setProperty(`--dcc-close-bg-color-h`, `#f5f5f5`);
    document.documentElement.style.setProperty(`--dcc-close-color-h`, `#666`);
    document.documentElement.style.setProperty(`--dcc-close-focus-shadow-color`, `#2573e880`);
    document.documentElement.style.setProperty(`--dcc-cancel-color`, `#666`);
    document.documentElement.style.setProperty(`--dcc-cancel-border-color`, `#666`);
    document.documentElement.style.setProperty(`--dcc-cancel-focus-shadow-color`, `#2573e880`);
    document.documentElement.style.setProperty(`--dcc-submit-color`, `#405`);
    document.documentElement.style.setProperty(`--dcc-submit-border-color`, `#405`);
    document.documentElement.style.setProperty(`--dcc-submit-focus-shadow-color`, `#2573e880`);
    document.documentElement.style.setProperty(`--button-right-margin`, `10px`);
    document.documentElement.style.setProperty(`--dcc-focus-shadow-color`, `#2573e880`);
    document.documentElement.style.setProperty(`--dcc-horizontal-position`, `center`);
    document.documentElement.style.setProperty(`--dcc-vertical-position`, `center`);
}

function dcc_uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
// dynamic-confirmation.js end