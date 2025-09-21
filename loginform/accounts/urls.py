from django.urls import path
from . import views

urlpatterns = [
    path("login/", view=views.login_view, name="login"),
    path("logout/", view=views.logout_view, name="logout"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("login-api/", views.login_api, name="login_api"),

    path("register/", views.register_page, name="register"),
    path("register-api/", views.register_api, name="register_api"),

]