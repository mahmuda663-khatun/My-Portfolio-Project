from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=50)
    percentage = models.IntegerField(default=50)
    is_backend = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    tech_stack = models.CharField(max_length=200, help_text="Comma separated e.g. React, Django")
    live_link = models.URLField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def tech_stack_list(self):
        return [tech.strip() for tech in self.tech_stack.split(',') if tech.strip()]

    def __str__(self):
        return self.title

class Experience(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_year = models.CharField(max_length=10)
    end_year = models.CharField(max_length=10, default="Present")
    description = models.TextField()

    def __str__(self):
        return f"{self.title} at {self.company}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"

class HeroSection(models.Model):
    subtitle = models.CharField(max_length=50, default="Hello, I'm")
    name = models.CharField(max_length=100)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    description = models.TextField()
    cv_link = models.URLField(blank=True, null=True, help_text="Link to your resume/CV")

    def __str__(self):
        return "Hero Section Details"

class AboutSection(models.Model):
    title = models.CharField(max_length=100, default="About Me")
    paragraph_1 = models.TextField()
    paragraph_2 = models.TextField(blank=True, null=True)
    years_experience = models.CharField(max_length=10)
    projects_completed = models.CharField(max_length=10)
    happy_clients = models.CharField(max_length=10)

    def __str__(self):
        return "About Section Details"

class SocialLink(models.Model):
    name = models.CharField(max_length=50, help_text="e.g. Facebook, GitHub, LinkedIn")
    url = models.URLField()
    icon_class = models.CharField(max_length=50, help_text="e.g. fab fa-facebook")

    def __str__(self):
        return self.name
