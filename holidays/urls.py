from django.urls import path
from .views import country_list, holiday_list

urlpatterns = [
    path("countries/", country_list, name="country_list"),
    path("holidays/", holiday_list, name="holiday_list"),
]
