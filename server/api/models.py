from django.db import models
from django.conf import settings

class Questions(models.Model):
    title = models.CharField(max_length=255)
    type = models.IntegerField()
    def __str__(self):
        return self.title

class Options(models.Model):
    question = models.ForeignKey(Questions,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    marks = models.IntegerField()  
    def __str__(self):
        return self.title

class Results(models.Model):
    startTime = models.TimeField()
    endTime = models.TimeField(blank=True,null=True)
    marks = models.IntegerField(default=0)
    student = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)