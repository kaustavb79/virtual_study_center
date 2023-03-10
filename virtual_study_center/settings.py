"""
Django settings for virtual_study_center project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import json
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-mm&eog$_d4-(#o4$4w=(w3^vgs!0(l%@4e%z!^b9yl%t#qjm=j'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'pwa',
    'webpush',
    'notifications',
    'rest_framework',

    'app_home',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'virtual_study_center.middleware.CustomMiddleware',
    'virtual_study_center.middleware.BlockedIpMiddleware',
]

ROOT_URLCONF = 'virtual_study_center.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'libraries': {
                'template_tags': 'virtual_study_center.template_tags.template_tags',
                'notifications_tags': 'notifications.template_tags.notifications_tags',

            }
        },
    },
]

WSGI_APPLICATION = 'virtual_study_center.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DB_CONFIG = json.load(open(os.path.join(BASE_DIR, 'resources', 'virtual_study_center', 'config', "db_config.json"), "r+"))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': DB_CONFIG['mysql']['db_name'],
        'USER': DB_CONFIG['mysql']['user'],
        'PASSWORD': DB_CONFIG['mysql']['pass'],
        'HOST': DB_CONFIG['mysql']['host'],
        'PORT': DB_CONFIG['mysql']['port'],
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

# LANGUAGE_CODE = 'Asia/Kolkata'
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATICFILES_DIRS = [
    os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'static'),
]

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
)

print("-- STATIC_ROOT : ", STATIC_ROOT)
print("-- STATICFILES_DIRS : ", STATICFILES_DIRS)

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
BROWSE_FOLDER_ROOT = MEDIA_ROOT + "/"

LOGIN_URL = 'login'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''

HOST_URL = 'http://127.0.0.1:8000/'
API_URL = ''

FILE_UPLOAD_HANDLERS = [
    'django.core.files.uploadhandler.MemoryFileUploadHandler',
    'django.core.files.uploadhandler.TemporaryFileUploadHandler',
]
FILE_UPLOAD_PERMISSIONS = 0o644
BLOCKED_IPS = ('199.137.36.7',)

# ------- PWA CONFIG ---------------

PWA_SERVICE_WORKER_PATH = os.path.join(BASE_DIR, 'templates', 'luein_pwa', 'serviceworker.js')

PWA_APP_NAME = 'Virtual SC'
PWA_APP_DESCRIPTION = "Virtual SC --- An virtual study center system for ignou"
PWA_APP_THEME_COLOR = '#f0f4fa'
PWA_APP_BACKGROUND_COLOR = '#ffffff'
PWA_APP_DISPLAY = 'standalone'
PWA_APP_SCOPE = '/'
PWA_APP_ORIENTATION = 'any'
PWA_APP_START_URL = '/'
PWA_APP_STATUS_BAR_COLOR = '#ebeef2'
PWA_APP_ICONS = [
    {
        "src": "/static/website/pwa/icons/other/lueinanalytics_favicon_512.png",
        "type": "image/png",
        "sizes": "512x512",
        "purpose": "any"
    },
    {
        "src": "/static/website/pwa/icons/other/lueinanalytics_favicon_256.png",
        "type": "image/png",
        "sizes": "256x256",
        "purpose": "any"
    },
    {
        "src": "/static/website/pwa/icons/other/lueinanalytics_favicon_16.png",
        "type": "image/png",
        "sizes": "16x16",
        "purpose": "any"
    },
    {
        "src": "/static/website/pwa/icons/other/lueinanalytics_favicon.png",
        "type": "image/png",
        "sizes": "32x32",
        "purpose": "any"
    },
    {
        "src": "/static/website/pwa/icons/other/lueinanalytics_favicon_64.png",
        "type": "image/png",
        "sizes": "64x64",
        "purpose": "any"
    },
    {
        "src": "/static/website/pwa/icons/other/lueinanalytics_favicon_128.png",
        "type": "image/png",
        "sizes": "128x128",
        "purpose": "any"
    },
    {
        "src": "/static/website/pwa/icons/other/lueinanalytics_favicon_192.png",
        "type": "image/png",
        "sizes": "192x192",
        "purpose": "any"
    }
]

PWA_APP_ICONS_APPLE = [
    {
        "src": "/static/website/pwa/icons/apple/lueinanalytics_favicon_167.png",
        "type": "image/png",
        "sizes": "167x167",
        "purpose": "any"
    },
    {
        "src": "/static/website/pwa/icons/apple/lueinanalytics_favicon_180.png",
        "type": "image/png",
        "sizes": "180x180",
        "purpose": "any"
    },
    {
        "src": "/static/website/pwa/icons/apple/lueinanalytics_favicon_152.png",
        "type": "image/png",
        "sizes": "152x152",
        "purpose": "any"
    }
]
PWA_APP_DIR = 'ltr'
PWA_APP_LANG = 'en-US'

# ------- PWA CONFIG end ---------------

# notification config

privk = (
    open(os.path.join(BASE_DIR, 'resources', 'virtual_study_center', 'config', 'notifications', "private_key.pem"), "r+")
    .read()
    .strip()
    .split("\n")[1:][:-1]
)
WEBPUSH_VAPID_PRIVATE_KEY = "".join(privk)

pubk = (
    open(os.path.join(BASE_DIR, 'resources', 'virtual_study_center', 'config', 'notifications', "application_server_key.pem"),
         "r+")
    .read()
    .strip()
    .split("\n")[1:][:-1]
)
WEBPUSH_VAPID_PUBLIC_KEY = "".join(pubk)

WEBPUSH_SETTINGS = {
    "VAPID_PUBLIC_KEY": WEBPUSH_VAPID_PUBLIC_KEY,
    "VAPID_PRIVATE_KEY": WEBPUSH_VAPID_PRIVATE_KEY,
    "VAPID_ADMIN_EMAIL": "bkausrav416@gmail.com",
}
# notification config end

"""
----- DJANGO LOGGER -----
"""

LOGS_DIR = BASE_DIR / "logs"

if os.path.exists(LOGS_DIR) and os.path.isdir(LOGS_DIR):
    print("LOGS_DIR: ",LOGS_DIR)
else:
    os.mkdir(LOGS_DIR)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
            'level': 'DEBUG'
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': LOGS_DIR / 'server.log',
            'formatter': 'verbose',
        },
        'mail_admin': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        '': {
            'handlers': ['console', 'file', 'mail_admin'],
            'propagate': True,
        },
    },
}