from django.db import models

class Questions(models.Model):
    title = models.CharField(max_length=255)
    type = models.IntegerField()

class Options(models.Model):
    question = models.ForeignKey(Questions,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    marks = models.IntegerField()  
