from django.shortcuts import render
from django.conf import settings
import requests

# Create your views here.
from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "ok"})

def prices(request):
    ids = request.GET.get("ids","bitcoin, ethereum")
    vs = request.GET.get("vs", "usd")
    
    params = {
        "ids": ids,
        "vs": vs,
        "include_24hr_change": "true",
    }
    
    url = getattr(settings, "URL_COINGECKO")

    try:
        r = requests.get(url, params=params, timeout=10)
        r.raise_for_status()
        return JsonResponse({"ids": ids.split(","), "vs": vs, "data": r.json()})
    except requests.RequestException as e:
        return JsonResponse({"error": str(e)}, status=502)
    
