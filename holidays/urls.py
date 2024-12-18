from django.urls import path
from .views import get_holidays, search_holidays

urlpatterns = [
    path('holidays/', get_holidays, name='get_holidays'),
    path('holidays/search/', search_holidays, name='search_holidays'),
]
