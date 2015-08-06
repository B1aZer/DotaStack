DEBUG = False

COMPRESS_OFFLINE = True

USE_I18N = True

LANGUAGE_CODE = "ru"

# Supported languages
_ = lambda s: s
LANGUAGES = (
    ('ru', _('Russian')),
    ('en', _('English')),
)

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'kwerkee12@gmail.com'
EMAIL_HOST_PASSWORD = 'qwe123asd'

# Make these unique, and don't share it with anybody.
SECRET_KEY = "3b74718d-8ada-42d9-81b6-c6876c4930adb2bcb9ae-cc71-40ee-a028-828a3064b8a785f9c1fe-2319-4efd-a733-63d5d31fa65e"
NEVERCACHE_KEY = "2820f3ec-11df-4fd6-b4af-dd2ea867bf72632b35e0-38a9-4734-b963-1a3b28a491dfcca3f021-e574-498d-9192-6f03c8b0524a"

DATABASES = {
    "default": {
        # Ends with "postgresql_psycopg2", "mysql", "sqlite3" or "oracle".
        "ENGINE": "django.db.backends.sqlite3",
        # DB name or path to database file if using sqlite3.
        "NAME": "dev.db",
        # Not used with sqlite3.
        "USER": "",
        # Not used with sqlite3.
        "PASSWORD": "",
        # Set to empty string for localhost. Not used with sqlite3.
        "HOST": "",
        # Set to empty string for default. Not used with sqlite3.
        "PORT": "",
    }
}

