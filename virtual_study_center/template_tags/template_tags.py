import calendar
from datetime import datetime

import pandas as pd
from django import template
from django.utils.dateparse import parse_datetime
from rest_framework.utils import json
from dateutil import parser

register = template.Library()


@register.filter
def list_at_index(data, index):
    index = int(index) - 1
    return data[index]


# this template is use for getting the value in a dict by passing dict and key
@register.filter
def dict_at_key(dict_data, key):
    value = dict_data[key]
    return value



@register.filter
def get_type(value):
    return type(value)


# this template is use for getting the user uuid by passing the username
# we currently store username in total usage model as a created_by
# for creating redirection link to the user profile, we want the user_uuid
# @register.filter
# def get_user_uuid(value):
#     print('get_user_uuid----',value)
#     try:
#         profile_get_qs = Profile.objects.get(user__username=value)
#     except Exception as e:
#         print(e)
#         profile_get_qs = Profile.objects.none()
#
#     if profile_get_qs:
#         user_uuid = profile_get_qs.user_uuid
#     else:
#         user_uuid = ''
#
#     print('user_uuid----', user_uuid)
#
#     return user_uuid

# this template is use for getting to know that given job is available (exist) or not by passing job_id
# we currently store job_id in total usage model
# for creating redirection link to the job page, we want to know that is job exist or not
# @register.filter
# def get_job_exist(value):
#     try:
#         job_model_get_qs = JobsModel.objects.get(job_id=value)
#     except Exception as e:
#         print(e)
#         job_model_get_qs = JobsModel.objects.none()
#
#     if job_model_get_qs:
#         exist = True
#     else:
#         exist = False
#     return exist

@register.filter
def string_list_to_list_obj(string_list):
    list_obj = json.loads(string_list)
    return list_obj

@register.filter
def multiply(number, multiply_by, *args, **kwargs):
    # you would need to do any localization of the result here
    number = float(number)
    multiply_by = float(multiply_by)
    result = int(number * multiply_by)
    return result

@register.filter
def one_more(_1, _2):
    return _1, _2

@register.filter
def get_dict_value(input_key_company_id, input_dict):
    input_key, company_id = input_key_company_id
    input_dict = json.loads(input_dict)
    result = ''
    if company_id and input_key and input_dict:
        input_key = str(input_key)
        company_id = str(company_id)
        result = input_dict[company_id][input_key]
    return result


@register.filter
def is_past_due(given_date):
    current_time = datetime.now()
    return given_date < current_time


# @register.filter
# def get_company_name(company_id):
#     try:
#         company_qs = CompanyModel.objects.get(company_id=company_id)
#     except Exception as e:
#         company_qs = CompanyModel.objects.none()
#
#     if company_qs:
#         company_name = company_qs.company_name
#     else:
#         company_name = None
#
#     return company_name

@register.filter
def get_filename(path):
    print("---path---",path)
    filename = ""
    if path:
        filename = path.split('/')[-1]
    print("---filename---", filename)

    return filename



@register.filter
def get_day_by_date(date_text):
    day = ""
    df = ""
    try:
        my_date = datetime.strptime(date_text, "%Y-%m-%d")
        day = calendar.day_name[my_date.weekday()]
    except Exception as e:
        print("--- get_day_by_date --- Exception --",e)

    return day


@register.filter
def get_day_by_datetime(date_text):
    day = ""
    df = ""
    try:
        my_date = parser.parse(date_text)
        day = calendar.day_name[my_date.weekday()]
    except Exception as e:
        print("--- get_day_by_datetime --- Exception --",e)

    return day

