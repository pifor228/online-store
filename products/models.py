from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(default='', blank=True)
    def __str__(self):
        return self.title
    
