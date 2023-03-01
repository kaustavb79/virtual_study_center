import datetime
import re
import uuid

import pandas as pd
from django.contrib.auth.models import User


# from xhtml2pdf import pisa
# def render_to_pdf(template_src, context_dict={}):
#     template = get_template(template_src)
#     html = template.render(context_dict)
#     result = BytesIO()
#     pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
#     if not pdf.err:
#         return HttpResponse(result.getvalue(), content_type='application/pdf')
#     return None


def last_day_of_month(any_day):
    next_month = any_day.replace(day=28) + datetime.timedelta(days=4)  # this will never fail
    return next_month - datetime.timedelta(days=next_month.day)


def generate_uuid():
    return str(uuid.uuid4())


def get_sec(time_str):
    """Get Seconds from time."""
    h, m, s = time_str.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)


def querydict_to_dict(query_dict):
    data = {}
    for key in query_dict.keys():
        v = query_dict.getlist(key)
        if len(v) == 1:
            v = v[0]
        data[key] = v
    return data


def create_generated_series(days, list_result):
    response_list = []
    interviews_completed = 0
    # active_job_count = 0
    # ----------------------------------------
    df2 = pd.DataFrame(list_result)

    if df2.empty == True:
        unique_jobs = []
    else:
        unique_jobs = df2['job_id'].unique()
        df2['event_datetime'].apply(str)

    # ----------------------------------------
    df = pd.DataFrame()
    freq = '-1D'
    df['event_datetime'] = pd.date_range(start=pd.datetime.today(), periods=int(days), freq=freq, closed=None)
    df['event_datetime'] = df["event_datetime"].dt.strftime('%d %b %Y')
    df['event_datetime'] = df.event_datetime.apply(str)
    df['job_id'] = '|'.join(str(x) for x in unique_jobs)
    df = pd.DataFrame(df.job_id.str.split('|').tolist(), index=df.event_datetime).stack()
    df = df.reset_index([0, 'event_datetime'])
    df.columns = ['event_datetime', 'job_id']

    # ----------------------------------------
    if df2.empty == True:
        result = df
        result['interview_count'] = 0
    else:
        result = pd.merge(df, df2, how='left', on=['event_datetime', 'job_id'])

    if result.empty == False:
        result['interview_count'] = result['interview_count'].fillna(0)
        result['job_id'] = result['job_id'].fillna('empty')
        result = result.reindex(index=result.index[::-1])

        interviews_completed = result['interview_count'].sum()
        response_list = list(result.T.to_dict().values())
        # reverse the order of the list for graph ploting
        response_list.reverse()
        # active_job_count = len(unique_jobs)

    del df, df2, result

    return response_list, interviews_completed


def convert_dobj_to_strlist(item):
    item = str(item)
    uuid_pattern = "[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}"
    matches = re.findall(uuid_pattern, item)
    if (matches):
        item = matches
    else:
        item = []
    item = item[:-1]
    return item


def is_valid_uuid(uuid_to_test, version=4):
    try:
        uuid_obj = uuid.UUID(uuid_to_test, version=version)
    except ValueError:
        return False

    return str(uuid_obj) == uuid_to_test


def mobile(request):
    """Return True if the request comes from a mobile device."""

    MOBILE_AGENT_RE = re.compile(r".*(iphone|mobile|androidtouch)", re.IGNORECASE)

    if MOBILE_AGENT_RE.match(request.META['HTTP_USER_AGENT']):
        return True
    else:
        return False


def is_valid_user(data):
    # this is sample data
    # data = {
    #     'username':'username',
    # }
    # data = {
    #     'email':'email',
    # }
    print('is_valid_user--', data)

    username = data.get('username')
    email = data.get('email')
    user_data = data.get('user_data')

    message = None
    user = None
    is_valid = False

    if username:
        try:
            user = User.objects.get(username=username)
            is_valid = True
            message = 'success'
        except Exception as e:
            print('is_valid_user user Exception--', e)
            message = 'Invalid username'

    elif email:
        try:
            user = User.objects.get(email=email)
            is_valid = True
            message = 'success'
        except Exception as e:
            print('is_valid_user email Exception--', e)
            message = 'Invalid email'

    elif user_data:
        try:
            user = User.objects.get(username=user_data)
            is_valid = True
            message = 'success'
        except Exception as e:
            try:
                user = User.objects.get(email=user_data)
                is_valid = True
                message = 'success'
            except Exception as e:
                print('is_valid_user user_data Exception--', e)
                message = 'Invalid user_data'

    else:
        message = 'Invalid request'

    return_is_valid_user = {
        'is_valid': is_valid,
        'message': message,
        'user': user,
    }
    print('return_is_valid_user--', return_is_valid_user)

    return return_is_valid_user


def is_valid_email(data):
    # this is sample data
    # data = {
    #     'email':email@email.com
    # }
    print('is_valid_email--', data)

    email = data.get('email')

    return_is_valid_email = None

    if email:
        # for custom mails use: '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        if (re.search(regex, email)):
            print("Valid Email")
            return_is_valid_email = True
        else:
            print("Invalid Email")
            return_is_valid_email = False

    print('return_is_valid_email--', return_is_valid_email)

    return return_is_valid_email


def unique_list(seq):
    seen = set()
    seen_add = seen.add
    return [x for x in seq if not (x in seen or seen_add(x))]


def is_valid_user(data):
    # this is sample data
    # data = {
    #     'username':'username',
    # }
    # data = {
    #     'email':'email',
    # }
    print('is_valid_user--', data)

    username = data.get('username')
    email = data.get('email')
    user_data = data.get('user_data')

    message = None
    user = None
    is_valid = False

    if username:
        try:
            user = User.objects.get(username=username)
            is_valid = True
            message = 'success'
        except Exception as e:
            print('is_valid_user user Exception--', e)
            message = 'Invalid username'

    elif email:
        try:
            user = User.objects.get(email=email)
            is_valid = True
            message = 'success'
        except Exception as e:
            print('is_valid_user email Exception--', e)
            message = 'Invalid email'

    elif user_data:
        try:
            user = User.objects.get(username=user_data)
            is_valid = True
            message = 'success'
        except Exception as e:
            try:
                user = User.objects.get(email=user_data)
                is_valid = True
                message = 'success'
            except Exception as e:
                print('is_valid_user user_data Exception--', e)
                message = 'Invalid user_data'

    else:
        message = 'Invalid request'

    return_is_valid_user = {
        'is_valid': is_valid,
        'message': message,
        'user': user,
    }
    print('return_is_valid_user--', return_is_valid_user)

    return return_is_valid_user


def is_valid_email(data):
    # this is sample data
    # data = {
    #     'email':email@email.com
    # }
    print('is_valid_email--', data)

    email = data.get('email')

    return_is_valid_email = None

    if email:
        # for custom mails use: '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        if (re.search(regex, email)):
            print("Valid Email")
            return_is_valid_email = True
        else:
            print("Invalid Email")
            return_is_valid_email = False

    print('return_is_valid_email--', return_is_valid_email)

    return return_is_valid_email

