from django.urls import path
from .views import country_list, tourist_spots

urlpatterns = [
    path("countries/", country_list, name="country_list"),
    path("spots/", tourist_spots, name="tourist_spots"),
]
