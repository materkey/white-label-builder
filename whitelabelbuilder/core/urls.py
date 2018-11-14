from django.urls import path

from core.views import cabinet_view, login_view, logout_view

app_name = 'core'
urlpatterns = [
    path('profile/', cabinet_view, name='cabinet'),
    path('login/', login_view, name='login'),
    path('logout', logout_view, name='logout'),
]