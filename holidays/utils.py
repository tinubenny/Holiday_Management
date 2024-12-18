import requests
from django.conf import settings
from django.core.cache import cache

# Function to return the list of countries
def get_all_countries():
    """
    Returns a list of countries with their ISO 3166-1 alpha-2 codes and names.
    """
    countries = [
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
    return countries


# Function to get tourist spots data for a specific country
def get_tourist_data(country):
    """
    Returns a list of sample tourist spots for a given country code.
    """
    tourist_data = {
        "US": [
            {"name": "Statue of Liberty", "image": "/images/statue_of_liberty.jpg", "description": "Icon of freedom in New York."},
            {"name": "Grand Canyon", "image": "/images/grand_canyon.jpg", "description": "A vast, breathtaking canyon in Arizona."},
        ],
        "IN": [
            {"name": "Taj Mahal", "image": "/images/taj_mahal.jpg", "description": "A white marble mausoleum in Agra."},
            {"name": "Qutub Minar", "image": "/images/qutub_minar.jpg", "description": "A historic monument in Delhi."},
        ],
        "FR": [
            {"name": "Eiffel Tower", "image": "/images/eiffel_tower.jpg", "description": "A wrought-iron tower in Paris."},
            {"name": "Louvre Museum", "image": "/images/louvre.jpg", "description": "The world's largest art museum."},
        ],
        "JP": [
            {"name": "Mount Fuji", "image": "/images/mount_fuji.jpg", "description": "The iconic volcanic mountain of Japan."},
            {"name": "Tokyo Tower", "image": "/images/tokyo_tower.jpg", "description": "A communications and observation tower in Tokyo."},
        ],
        "GB": [
            {"name": "Big Ben", "image": "/images/big_ben.jpg", "description": "The iconic clock tower in London."},
            {"name": "Stonehenge", "image": "/images/stonehenge.jpg", "description": "A prehistoric monument in Wiltshire, England."},
        ],
    }
    return tourist_data.get(country.upper(), [])


# Function to fetch holiday data from the Calendarific API
def fetch_holidays(country, year):
    """
    Fetches holiday data for the given country and year from the Calendarific API.
    Caches the data for 24 hours to reduce redundant API calls.
    """
    cache_key = f"holidays_{country}_{year}"
    cached_data = cache.get(cache_key)
    if cached_data:
        return cached_data

    # Calendarific API URL
    url = "https://calendarific.com/api/v2/holidays"

    # API Parameters
    params = {
        "api_key": settings.CALENDARIFIC_API_KEY,  # API key from .env file
        "country": country,
        "year": year,
    }

    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            holidays = response.json().get("response", {}).get("holidays", [])
            # Cache the data for 24 hours
            cache.set(cache_key, holidays, timeout=86400)
            return holidays
        else:
            print(f"Error fetching holidays: {response.status_code}")
            return []
    except Exception as e:
        print(f"Exception occurred while fetching holidays: {e}")
        return []
