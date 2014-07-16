from __future__ import unicode_literals
from future.builtins import str

try:
    from django.utils.encoding import smart_text
except ImportError:
    from django.utils.encoding import smart_unicode as smart_text

import re
import unidecode
import unicodedata

def translit_unicode(s):
    chars = []
    for char in str(smart_text(s)):
        cat = unicodedata.category(char)[0]
        if cat in "LN" or char in "-_~":
            chars.append(unidecode.unidecode(char))
        elif cat == "Z":
            chars.append(" ")
    return re.sub("[-\s]+", "-", "".join(chars).strip()).lower()
