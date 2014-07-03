from __future__ import unicode_literals
from datetime import datetime

from django.db.models import Count, Q

from mezzanine.blog.forms import BlogPostForm
from mezzanine.blog.models import BlogPost, BlogCategory
from mezzanine.generic.models import Keyword
from mezzanine import template
from mezzanine.utils.models import get_user_model

User = get_user_model()

register = template.Library()

@register.filter
def description_from_content(blogpost):
    description = blogpost.description_from_content()
    if not blogpost.gen_description:
        description = blogpost.description
    return description

import urllib
from HTMLParser import HTMLParser
class MyParse(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.src = ''
    def handle_starttag(self, tag, attrs):
        if tag=="img":
            self.src = dict(attrs)["src"]

@register.filter
def get_image(content):
    parser=MyParse()
    parser.feed(content)
    if not parser.src:
        return ''
    image_source = urllib.quote_plus(parser.src)
    return image_source
