import requests
from django.conf import settings
from django.core.cache import cache

def get_all_countries():
    return [
        {"code": "US", "name": "United States"},
        {"code": "IN", "name": "India"},
        {"code": "FR", "name": "France"},
        {"code": "JP", "name": "Japan"},
        {"code": "GB", "name": "United Kingdom"},
        {"code": "CA", "name": "Canada"},
        {"code": "AU", "name": "Australia"},
        {"code": "BR", "name": "Brazil"},
        {"code": "IT", "name": "Italy"},
        {"code": "ES", "name": "Spain"},
        {"code": "DE", "name": "Germany"},
        {"code": "SG", "name": "Singapore"},
        {"code": "ZA", "name": "South Africa"},
        {"code": "AE", "name": "United Arab Emirates"},
    ]

def fetch_holidays(country, year):
    # Check if data is already cached
    cache_key = f"holidays_{country}_{year}"
    cached_data = cache.get(cache_key)
    if cached_data:
        return cached_data

    # Calendarific API URL
    url = "https://calendarific.com/api/v2/holidays"
    params = {
        "api_key": settings.CALENDARIFIC_API_KEY,
        "country": country,
        "year": year
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        all_holidays = response.json().get("response", {}).get("holidays", [])
        
        # Filter holidays for National and Religious types
        filtered_holidays = [
            {
                "name": holiday["name"],
                "date": holiday["date"]["iso"],
                "type": ", ".join(holiday["type"]),
                "description": holiday.get("description", "No description available"),
            }
            for holiday in all_holidays
            if "Religious" in holiday["type"] or "National holiday" in holiday["type"]
        ]

        # Cache the response for 24 hours
        cache.set(cache_key, filtered_holidays, timeout=86400)
        return filtered_holidays

    print(f"Error: {response.status_code}, {response.text}")  # Debugging
    return []