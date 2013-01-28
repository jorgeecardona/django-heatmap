from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from heatmap.resources import MouseEventResource
from tastypie.api import Api

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

api = Api(api_name='v1')
api.register(MouseEventResource())

urlpatterns = patterns(
    '',
    # Examples:
    # url(r'^$', 'test_site.views.home', name='home'),
    # url(r'^test_site/', include('test_site.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
                       
    (r'^api/', include(api.urls)),
)

urlpatterns += patterns(
    'django.views.generic.simple', 
    
    (r'^$', 'direct_to_template', {'template': 'index.html'}),
)

urlpatterns += staticfiles_urlpatterns()
