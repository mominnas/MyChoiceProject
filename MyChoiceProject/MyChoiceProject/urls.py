"""
Definition of urls for MyChoiceProject.
"""

from datetime import datetime
from django.urls import path, include, re_path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from app import forms, views
from rest_framework import routers
from app.api_views import ItemViewSet

router = routers.DefaultRouter()
router.register(r"items", ItemViewSet, basename="item")

urlpatterns = [
    # Admin and API first
    path('admin/', admin.site.urls),
    path('api/', include((router.urls, 'api'))),

    # Legacy pages
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),
    path('login/',
         LoginView.as_view
         (
             template_name='app/login.html',
             authentication_form=forms.BootstrapAuthenticationForm,
             extra_context=
             {
                 'title': 'Log in',
                 'year' : datetime.now().year,
             }
         ),
         name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),

    # Catch-all: serve the React app for any non-API, non-admin path (SPA routing)
    re_path(r'^(?!api/|admin/).*$', views.react_index, name='react_index'),
]
