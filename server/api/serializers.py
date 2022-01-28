from rest_framework import serializers
from .models import CodingTest, Results, Subject,Questions,Test

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
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