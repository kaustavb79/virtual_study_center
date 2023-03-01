from django.shortcuts import render
from django.urls import resolve
from django.utils.deprecation import MiddlewareMixin

from virtual_study_center.code_base.utility import mobile

from django.conf import settings
from django import http
import csv

mobile_restricted_url_names = [
]

admin_only_app = [
    'app_file_manager'
]

admin_only_urls = [
    # 'school_list'
]


class CustomMiddleware(MiddlewareMixin):

    def process_request(self, request):

        # set API URL here
        SCHEME = request.scheme
        HOST = request.get_host()
        API_URL = SCHEME + '://' + HOST
        request.api_url = API_URL
        # print('API_URL---', API_URL)

        current_url_name = resolve(request.path_info).url_name
        request.current_url_name = current_url_name
        try:
            current_url_app_names = resolve(request.path_info).app_names[0]
        except Exception as e:
            print(e)
            current_url_app_names = None

        try:
            current_url_route = resolve(request.path_info).route
        except Exception as e:
            print(e)
            current_url_route = None

        try:
            current_url_namespaces = resolve(request.path_info).namespaces[0]
        except Exception as e:
            print(e)
            current_url_namespaces = None

        try:
            if request.user.is_authenticated:
                request.organisation_type = request.user.profile.school_id.organisation_type
        except Exception as e:
            print('middleware.py - organisation_type - Exception -',e)

        # print('current_url_name---------', current_url_name)
        # print('current_url_app_names---------', current_url_app_names)
        # print('current_url_namespaces---------', current_url_namespaces)
        # print('current_url_route---------', current_url_route)
        # print('request.path_info---------', request.path_info)
        # print('resolve(request.path_info)---------', resolve(request.path_info))
        # print('========================')

        if mobile(request):
            is_mobile = True
        else:
            is_mobile = False

        if is_mobile:
            if request.user.is_authenticated and current_url_name in mobile_restricted_url_names:
                return render(request, 'snippets/not_for_mobile.html', {"side_nav_bar": True})

        request.is_mobile = is_mobile

        try:
            with open('all_url_list.csv', 'r') as csvfile:
                csv_dict = [row for row in csv.DictReader(csvfile)]
                if len(csv_dict) == 0:
                    print('csv file is empty')
                else:
                    new_row = [current_url_app_names, current_url_namespaces, current_url_name, current_url_route,
                               request.path_info, resolve(request.path_info)]
                    # print('new_row---',new_row)
                    # print('csv_dict---',csv_dict)
                    if new_row in csv_dict:
                        print('duplicate')
                    else:
                        with open('all_url_list.csv', 'a', newline='') as file:
                            writer = csv.writer(file)
                            writer.writerow(new_row)
                            remove_duplicate('all_url_list')
        except Exception as e:
            with open('all_url_list.csv', 'a', newline='') as file:
                writer = csv.writer(file)
                file_header = ["app_names", "namespaces", "url_name", "route", "request.path_info",
                               "resolve(request.path_info)"]
                new_row = [current_url_app_names, current_url_namespaces, current_url_name, current_url_route,
                           request.path_info, resolve(request.path_info)]
                writer.writerow(file_header)
                writer.writerow(new_row)
                remove_duplicate('all_url_list')

        if request.user.is_authenticated and current_url_app_names in admin_only_app:
            if not request.user.is_superuser:
                print('Access Denied..redirecting...')
                return render(request, 'access_denied/access-denied-page.html', {})

        if request.user.is_authenticated and current_url_name in admin_only_urls:
            if not request.user.is_superuser:
                print('Access Denied..redirecting...')
                return render(request, 'access_denied/access-denied-page.html', {})

        return None


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


class BlockedIpMiddleware(MiddlewareMixin):

    def process_request(self, request):
        print("get_client_ip(request)----", get_client_ip(request))
        # print("request----", request)
        # print("request.META----", request.META)
        # print("request.META['REMOTE_ADDR']----", request.META['REMOTE_ADDR'])

        # for item in request.META:
        #     print("item---",item)

        if request.META['REMOTE_ADDR'] in settings.BLOCKED_IPS:
            return http.HttpResponseForbidden('<h1>Forbidden</h1>')

        # try:
        #     with open('all_request_list.csv', 'r') as csvfile:
        #         csv_dict = [row for row in csv.DictReader(csvfile)]
        #         if len(csv_dict) == 0:
        #             print('csv file is empty')
        #         else:
        #             new_row = [current_url_app_names, current_url_namespaces, current_url_name, current_url_route,
        #                        request.path_info, resolve(request.path_info)]
        #             # print('new_row---',new_row)
        #             # print('csv_dict---',csv_dict)
        #             if new_row in csv_dict:
        #                 print('duplicate')
        #             else:
        #                 with open('all_url_list.csv', 'a', newline='') as file:
        #                     writer = csv.writer(file)
        #                     writer.writerow(new_row)
        #                     remove_duplicate('all_url_list')
        # except Exception as e:
        #     with open('all_request_list.csv', 'a', newline='') as file:
        #         writer = csv.writer(file)
        #         file_header = ["app_names", "namespaces", "url_name", "route", "request.path_info",
        #                        "resolve(request.path_info)"]
        #         new_row = [current_url_app_names, current_url_namespaces, current_url_name, current_url_route,
        #                    request.path_info, resolve(request.path_info)]
        #         writer.writerow(file_header)
        #         writer.writerow(new_row)
        #         remove_duplicate('all_url_list')

        return None


# class BlockedIpMiddleware:
#     def __init__(self, get_response):
#         # One-time configuration and initialization, when the webserver starts.
#         self.get_response = get_response
#
#     def __call__(self, request):
#         # Code to be executed for each request before the view (and later
#         # middleware) are called.
#
#         if request.META['REMOTE_ADDR'] in settings.BLOCKED_IPS:
#             print("request.META----",request.META)
#             print("request.META['REMOTE_ADDR']----",request.META['REMOTE_ADDR'])
#
#             # if request.META['HTTP_X_REAL_IP'] in settings.BLOCKED_IPS:
#             return http.HttpResponseForbidden('<h1>Forbidden</h1>')
#
#         return self.get_response(request)


def remove_duplicate(file_name):
    ext = '.csv'
    current_file_name = file_name + ext
    new_file_name = file_name + '_no_duplicate' + ext
    with open(current_file_name, 'r') as in_file, open(new_file_name, 'w') as out_file:
        seen = set()  # set for fast O(1) amortized lookup
        for line in in_file:
            if line in seen: continue  # skip duplicate

            seen.add(line)
            out_file.write(line)

# class DetectUrlScheme(object):
#     """ Middleware for detecting URL scheme """
#
#     def process_request(self, request):
#         # set API URL here
#         SCHEME = request.scheme
#         HOST = request.get_host()
#         API_URL = SCHEME + '://' + HOST
#         request.api_url = API_URL
#
#
#         # print('API_URL---', API_URL)
#
#         if request.is_secure():
#             # HTTPS
#             # do something ...
#             pass
#         else:
#             # HTTP
#             # do something ...
#             pass
#         return
