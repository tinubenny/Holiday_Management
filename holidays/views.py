from .utils import get_all_countries, get_tourist_data
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def country_list(request):
    countries = get_all_countries()
    return Response({"countries": countries})

@api_view(['GET'])
def tourist_spots(request):
    country = request.GET.get("country")
    year = request.GET.get("year")
    
    if not country or not year:
        return Response({"error": "Country and year are required"}, status=400)

    spots = get_tourist_data(country)
    return Response({"spots": spots})
