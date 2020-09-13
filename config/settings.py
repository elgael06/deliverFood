
from pathlib import Path
import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # Path(__file__).resolve(strict=True).parent.parent

TPL_DIR = os.path.join(BASE_DIR, 'build/')
DB_FILE = os.path.join(BASE_DIR, 'database/database.sqlite3')
CACHE_DIR = os.path.join(BASE_DIR, 'files/cache/')
MEDIA = os.path.join(BASE_DIR, 'files/media/')
STATIC = os.path.join(BASE_DIR, 'build/static/')
STATIC_FILES = os.path.join(BASE_DIR, 'files/static_files/')

SECRET_KEY = 'x1mul9xsa1srttw7h7%rewq%=j$+$@!fs0xioyey&f4=o8clie'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'rest_framework',
    # 'create_react_app',
    'corsheaders',    
    'backend.apps.customers',    
    'backend.apps.store',
    'backend.apps.sesion',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
          TPL_DIR
        ],
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

WSGI_APPLICATION = 'config.wsgi.application'
CORS_ORIGIN_ALLOW_ALL = True


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'd8j9emsd7gj2ap',
        'USER': 'rmzmxdpdwaceup',
        'PASSWORD': '8a6c464d28d66a97bd888e4966b47cdc15b704c87f381e39de750e4f85d84cc7',
        'HOST': 'ec2-54-243-67-199.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

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
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'es-mx'

TIME_ZONE = 'Etc/GMT-6'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = (
    STATIC ,
)
#Collects the static files into STATIC_ROOT.
STATIC_ROOT = STATIC_FILES

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

