from django.conf.urls import patterns, include, url
from items import views


urlpatterns = patterns('',
    url(r'^$', views.main),
    url(r'^get/$', views.items, name="items-get-list"),
)
