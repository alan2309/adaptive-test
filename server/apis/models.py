from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class MyUser(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    age = models.IntegerField(blank=True)
    gender = models.CharField(max_length=50,blank=True)
    mobile = models.IntegerField(blank=True,null=True)
    percent_10_std=models.FloatField(default=1)
    percent_12_std=models.FloatField(default=1)
    avgCGPA=models.FloatField(default=0)
    backlogs=models.IntegerField(default=0)
    internships=models.IntegerField(default=0)
    branch=models.CharField(max_length=100,default=None)
    college=models.CharField(max_length=100,default=None)
    year=models.CharField(max_length=6,default=0)
    takeFeedback=models.IntegerField(default=1)
    allowTestAlways=models.BooleanField(default=False,null=True,blank=True)
    permission_token = models.CharField(max_length=400,null=True,blank=True)
    change_pass_token = models.CharField(max_length=400,null=True,blank=True)
    view_result_token = models.CharField(max_length=400,null=True,blank=True)

    def __str__(self):
        return self.user.username

class Test(models.Model):
    myuser = models.ForeignKey(MyUser,on_delete=models.CASCADE,null=True,blank=True)
    test_name = models.CharField(max_length=150)
    test_start = models.DateTimeField(blank=True,null=True)
    test_end = models.DateTimeField(blank=True,null=True)
    apt = models.JSONField(null=True, blank=True)
    cf = models.JSONField(null=True, blank=True)
    c = models.JSONField(null=True, blank=True)
    dom = models.JSONField(null=True, blank=True)
    p = models.JSONField(null=True, blank=True)
    aw = models.JSONField(null=True, blank=True)
    totalTestTime = models.CharField(max_length=40,null=True, blank=True)
    token = models.CharField(max_length=400,null=True,blank=True)
    live = models.BooleanField(default=False)
    def __str__(self):
        return self.test_name

class Subject(models.Model):
   sub_name = models.CharField(max_length=255)
   sub_time = models.TimeField()
   sub_qs = models.IntegerField()
   avg_score=models.IntegerField(default=0,null=True,blank=True)
   max_qs=models.IntegerField(default=0,null=True,blank=True)
   def __str__(self):
        return self.sub_name

class Feedback(models.Model):
    user = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField(blank=True)
    def __str__(self):
            return self.user.email

class QuestionJson(models.Model):
    apt= models.JSONField()
    cf=models.JSONField()
    dom = models.JSONField()
    code = models.JSONField()
    aw = models.JSONField()
    personality= models.JSONField()
    test = models.ForeignKey(Test,on_delete=models.CASCADE)

    def __str__(self):
        return self.test.test_name


class Questions(models.Model):
    subject = models.ForeignKey(Subject,on_delete=models.CASCADE)
    title = models.TextField(blank=True,null=True)
    type = models.IntegerField()
    imgId=models.TextField(blank=True,null=True)
    def __str__(self):
        return self.title

class Options(models.Model):
    question = models.ForeignKey(Questions,on_delete=models.CASCADE)
    title = models.TextField(blank=True,null=True)
    marks = models.IntegerField()  
    def __str__(self):
        return self.title

class Results(models.Model):
    startTime = models.DateTimeField(blank=True,null=True)
    endTime = models.DateTimeField(blank=True,null=True)
    marks = models.JSONField(null=True, blank=True)
    prediction=models.IntegerField(null=True, blank=True)
    student = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    test=models.ForeignKey(Test,on_delete=models.CASCADE)

    def __str__(self):
        return self.student.username

class CodingTest(models.Model):
    question=models.TextField(null=True, blank=True)
    marks=models.JSONField(null=True, blank=True)
    type = models.IntegerField()
    input_format=models.TextField(null=True, blank=True)
    output_format=models.TextField(null=True, blank=True)
    constraints=models.TextField(null=True, blank=True)
    sample_input=models.JSONField(null=True, blank=True)
    sample_output=models.JSONField(null=True, blank=True)
    explanation=models.JSONField(null=True, blank=True)
    test_case_input=models.JSONField(null=True, blank=True)
    test_case_output=models.JSONField(null=True, blank=True)
    def __str__(self):
        return self.question

class Para(models.Model):
    title = models.CharField(max_length=200)
    data = models.TextField()
    def __str__(self):
        return self.title

class Paraqs(models.Model):
    para = models.ForeignKey(Para,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    def __str__(self):
        return self.title

class Paraopt(models.Model):
    paraqs = models.ForeignKey(Paraqs,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    marks = models.IntegerField()
    def __str__(self):
        return self.title

class ConstData(models.Model):
    colleges = models.JSONField(null=True, blank=True)
    departments =  models.JSONField(null=True, blank=True)    
    


