from django.shortcuts import render
from .models import HeroSection, AboutSection, Skill, Project, Experience, SocialLink

def index(request):
    hero = HeroSection.objects.first()
    about = AboutSection.objects.first()
    skills = Skill.objects.all()
    projects = Project.objects.all()
    experiencelist = Experience.objects.all().order_by('-start_year')
    social_links = SocialLink.objects.all()
    
    context = {
        'hero': hero,
        'about': about,
        'skills': skills,
        'projects': projects,
        'experiencelist': experiencelist,
        'social_links': social_links
    }
    return render(request, 'index.html', context)
