"""whitelabelbuilder URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from whitelabelbuilder import settings
from core.views import UserViewSet
from whitelabel.views import TaskViewSet
from whitelabelbuilder import index
from django.conf.urls.static import static

router = DefaultRouter()
router.register('users', UserViewSet, base_name='user')
router.register('tasks', TaskViewSet, base_name='tasks')

urlpatterns = [
                  # path('', RedirectView.as_view(url='accounts/login')),
                  path('admin/', admin.site.urls),
                  path('accounts/', include('core.urls', namespace='core')),
                  path('social/', include('social_django.urls', namespace='social')),
                  path('api/v1/', include(router.urls)),

                  re_path(r'^$', index.index, name='index_page'),
                  re_path(r'^.*?/$', index.index),
              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# if settings.DEBUG:
#     import debug_toolbar
#
#     urlpatterns = [
#                       url(r'^__debug__/', include(debug_toolbar.urls)),
#                   ] + urlpatterns
