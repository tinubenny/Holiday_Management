from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import fetch_holidays

@api_view(['GET'])
def get_holidays(request):
    country = request.query_params.get('country')
    year = request.query_params.get('year')
    if not country or not year:
        return Response({"error": "Country and year are required."}, status=400)
    holidays = fetch_holidays(country, year)
    return Response(holidays)

@api_view(['GET'])
def search_holidays(request):
    query = request.query_params.get('query', '').lower()
    country = request.query_params.get('country')
    year = request.query_params.get('year')
    holidays = fetch_holidays(country, year)
    filtered_holidays = [
        holiday for holiday in holidays if query in holiday['name'].lower()
    ]
    return Response(filtered_holidays)
