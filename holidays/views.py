from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import get_all_countries, fetch_holidays

@api_view(['GET'])
def country_list(request):
    """
    API endpoint to fetch the list of countries.
    """
    countries = get_all_countries()
    return Response({"countries": countries})

@api_view(["GET"])
def holiday_list(request):
    """
    API endpoint to fetch holidays for a specific country and year.
    Example: /api/holidays/?country=IN&year=2024
    """
    country = request.GET.get("country")
    year = request.GET.get("year")

    if not country or not year:
        return Response({"error": "Country and year are required"}, status=400)

    holidays = fetch_holidays(country, year)
    if not holidays:
        return Response({"error": "No holidays found for the selected filters"}, status=404)
    
    return Response({"holidays": holidays})
