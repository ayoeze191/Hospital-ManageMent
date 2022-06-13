"""
Django settings for DjangoReact project.

Generated by 'django-admin startproject' using Django 4.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

from pathlib import Path
import django_heroku
import os
import environ

env = environ.Env()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

environ.Env.read_env(env_file=str(BASE_DIR) + '/DjangoReact/.env')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!

SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = (env("DEBUG") == "True")

ALLOWED_HOSTS = [ "https://git.heroku.com/stark-springs-60539.git", "*"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_browser_reload',
    'rest_framework',
    'ui',
    'Account',
    'appointment',
    'Doctors',
    'drf_yasg',
    # "anymail",

]

AUTH_USER_MODEL = "Account.CustomUser"

MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "django_browser_reload.middleware.BrowserReloadMiddleware"
]



SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        "Auth Token eg [Bearer (JWT)]": {
            'type': "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
}


ROOT_URLCONF = 'DjangoReact.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "templates")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'DjangoReact.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = "staticfiles/"
MEDIA_URL = 'media/'
MEDIA_ROOT = 'media'

STATICFILES_DIRS = [
os.path.join(BASE_DIR, "static/"),
os.path.join(BASE_DIR, "ui/static/ui")
]

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# EMAIL_BACKEND  = 'smtp.yahoomail..com'
# EMAIL_BACKEND = "anymail.backends.sendinblue.EmailBackend"
# ANYMAIL = {
    # "SENDINBLUE_API_KEY": "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",
# }
# ANYMAIL_SENDINBLUE_API_KEY = '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'
# SENDINBLUE_API_URL = "https://api.sendinblue.com/v3/"

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_HOST = 'smtp.mail.yahoo.com'
EMAIL_PORT = 465
EMAIL_USE_SSL = True
EMAIL_USE_TLS = False
EMAIL_HOST_USER = "olabodeezekiel2018@yahoo.com"
DEFAULT_FROM_EMAIL = "olabodeezekiel2018@yahoo.com"
EMAIL_HOST_PASSWORD = 'evljqsmajoujgerl'
# App password: Hospital Management App

# 

#  465 or 587. 25

django_heroku.settings(locals())