from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages as msgs
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("dashboard")
        else:
            msgs.error(request, "Invalid username or password.")

    return render(request, "accounts/login.html")

def logout_view(request):
    logout(request)
    return redirect("login")

@login_required
def dashboard(request):
    return render(request, "accounts/dashboard.html", {"user": request.user})

def login_api(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            return JsonResponse({"success": True, "username": user.username})
        else:
            return JsonResponse({"success": False, "error": "Invalid username or password."}, status=401)
    
    return JsonResponse({"error": "Only POST allowed"}, status=405)