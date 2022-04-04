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
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paraopt
        fields='__all__'  

class ParaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Para
        fields='__all__'     
class MyUserSerializer(serializers.ModelSerializer):
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
        return data