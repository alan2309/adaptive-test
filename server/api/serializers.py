from email.policy import default
from rest_framework import serializers
from .models import CodingTest, MyUser, Results, Subject,Questions,Test,Paraopt,Para,Feedback,Options
from django.contrib.auth.models import User
from django.contrib.admin.models import LogEntry

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields='__all__'

class OptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields='__all__'        

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields='__all__'     

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields='__all__'      
class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Results
        fields='__all__'      
class CodingTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingTest
        fields='__all__'      
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['date_joined','email','first_name','id','is_staff','is_superuser','last_login','last_name']  
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data['is_staff'] == True:
            data['is_staff'] = "True"
        elif not data['is_staff']:
            data['is_staff'] = "False"

        if data['is_superuser'] == True:
            data['is_superuser'] = "True"
        elif not data['is_superuser']:
            data['is_superuser'] = "False"
            
        return data    
class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['email','first_name','id','is_staff','is_superuser','last_name','username']  
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data['is_staff'] == True:
            data['is_staff'] = "True"
        elif not data['is_staff']:
            data['is_staff'] = "False"

        if data['is_superuser'] == True:
            data['is_superuser'] = "True"
        elif not data['is_superuser']:
            data['is_superuser'] = "False"
            
        return data  
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paraopt
        fields='__all__'  

class ParaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Para
        fields='__all__'     
class MyUserSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.email')
    user_is_superuser = serializers.CharField(source='user.is_superuser')
    user_is_staff = serializers.CharField(source='user.is_staff')
    class Meta:
        model = MyUser
        fields='__all__'  
    
class AllUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields='__all__'     
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields='__all__'        
class LogEntrySerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.email')
    class Meta:
        model = LogEntry
        fields=['action_time','change_message','object_repr','user']    
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data['change_message'] == "" or data['change_message'] == "[]":
            data['change_message'] = "Deleted"
        if data['action_time']:
            date_time_arr=data['action_time'].split('.')[0]
            spilt_date_time_arr=date_time_arr.split('T')
            date=spilt_date_time_arr[0]
            time=spilt_date_time_arr[1]
            data['action_time']="{0}     {1}".format(time,date)
        return data