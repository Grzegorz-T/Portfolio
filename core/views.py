import os
from django.shortcuts import render
from .models import Project
from django.db.models.functions import TruncMonth
from django.db.models import Count
from django.apps import apps

def home(request):
    projects = Project.objects.all().order_by('-created_at')
    return render(request, "core/home.html", {
        "projects": projects
    })

def projects(request):
    projects = Project.objects.all()
    return render(request, "core/projects.html", {
        "projects": projects
    })

def about(request):
    return render(request, 'core/about.html')

def dashboard(request):
    data = (
        Project.objects
        .annotate(month=TruncMonth('created_at'))
        .values('month')
        .annotate(count=Count('id'))
        .order_by('month')
    )

    labels = [item['month'].strftime('%Y-%m') for item in data]
    counts = [item['count'] for item in data]

    return render(request, "core/dashboard.html", {
        "labels": labels,
        "counts": counts
    })

def wallpapers(request):
    core_app = apps.get_app_config("core")
    wallpapers_dir = os.path.join(
        core_app.path,
        "static",
        "img",
        "wallpapers"
    )

    wallpapers = []

    if os.path.exists(wallpapers_dir):
        wallpapers = sorted(
            f for f in os.listdir(wallpapers_dir)
            if f.lower().endswith((".jpg", ".png", ".webp"))
        )

    return render(request, "core/wallpapers.html", {
        "wallpapers": wallpapers
    })