from django.db import models
from django.conf import settings

class Subject(models.Model):
   sub_name = models.CharField(max_length=255)
   sub_time = models.TimeField()
   sub_qs = models.IntegerField()
   def __str__(self):
        return self.sub_name

class Questions(models.Model):
    subject = models.ForeignKey(Subject,on_delete=models.CASCADE)
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
    marks = models.JSONField(null=True, blank=True)
    student = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)

    def __str__(self):
        return self.student.username