from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', 'rest_framework.authtoken.views.obtain_auth_token'),                       
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^accounts/', include('django.contrib.auth.urls')),
    url(r'^', include('mapApp.urls', namespace="mapApp")),
    url(r'^forum/', include('spirit.urls', namespace="spirit", app_name="spirit")),
    url(r'^robots.txt$', lambda r: HttpResponse("User-agent: *\nDisallow: /experimental", mimetype="text/plain"))
)

# urlpatterns += patterns('',
#     (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
# )
