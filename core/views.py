from django.shortcuts import render
from .models import Project
from django.db.models.functions import TruncMonth
from django.db.models import Count

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