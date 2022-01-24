from rest_framework import serializers
from .models import Subject,Questions,Test

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