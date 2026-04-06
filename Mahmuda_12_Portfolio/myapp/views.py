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
        'social_links': social_links,
        'is_home': True
    }
    return render(request, 'index.html', context)

def about(request):
    about = AboutSection.objects.first()
    hero = HeroSection.objects.first()
    social_links = SocialLink.objects.all()
    return render(request, 'about.html', {
        'about': about, 
        'hero': hero, 
        'social_links': social_links
    })

def skills(request):
    skills = Skill.objects.all()
    social_links = SocialLink.objects.all()
    return render(request, 'skills.html', {'skills': skills, 'social_links': social_links})

def projects(request):
    projects = Project.objects.all()
    social_links = SocialLink.objects.all()
    return render(request, 'projects.html', {'projects': projects, 'social_links': social_links})

def experience(request):
    experiencelist = Experience.objects.all().order_by('-start_year')
    social_links = SocialLink.objects.all()
    return render(request, 'experience.html', {'experiencelist': experiencelist, 'social_links': social_links})

def contact(request):
    social_links = SocialLink.objects.all()
    return render(request, 'contact.html', {'social_links': social_links})
