import requests
from django.core.cache import cache
from django.conf import settings

def fetch_holidays(country, year):
    cache_key = f"holidays_{country}_{year}"
    cached_data = cache.get(cache_key)
    if cached_data:
        return cached_data

    url = "https://calendarific.com/api/v2/holidays"
    params = {
        "api_key": settings.CALENDARIFIC_API_KEY,
        "country": country,
        "year": year,
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json().get("response", {}).get("holidays", [])
        cache.set(cache_key, data, 24 * 60 * 60)  # Cache for 24 hours
        return data
    return {"error": response.text}
