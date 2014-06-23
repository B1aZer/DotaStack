from copy import copy
from datetime import date
from itertools import dropwhile, takewhile
from locale import localeconv
from re import match

from django import forms
from django.forms.models import BaseInlineFormSet, ModelFormMetaclass
from django.forms.models import inlineformset_factory
from django.utils.datastructures import SortedDict
from django.utils.safestring import mark_safe
from django.utils.timezone import now
from django.utils.translation import ugettext_lazy as _

from mezzanine.conf import settings
from mezzanine.core.templatetags.mezzanine_tags import thumbnail

from cartridge.shop import checkout
from cartridge.shop.forms import FormsetForm, DiscountForm, OrderForm
from cartridge.shop.models import Product, ProductOption, ProductVariation
from cartridge.shop.models import Cart, CartItem, Order, DiscountCode
from cartridge.shop.utils import (make_choices, set_locale, set_shipping,
                                  clear_session)


class CustomOrderForm(OrderForm):

    class Meta:
        model = Order
        fields = ("discount_code", "billing_detail_first_name", "billing_detail_city", "billing_detail_phone", "billing_detail_email")
        exclude = ['same_billing_shipping', ]

    def __init__(self, request, step, data=None, initial=None, errors=None):

        super(CustomOrderForm, self).__init__(request, step=step, data=data, initial=initial)

        self.fields["same_billing_shipping"].widget = forms.HiddenInput()

        self.fields["billing_detail_email"].required = False
