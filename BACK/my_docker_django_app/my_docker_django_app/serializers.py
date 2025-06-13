from rest_framework import serializers
from .models import Module, Section

class SectionTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'title']

class ModuleSerializer(serializers.ModelSerializer):
    sections = SectionTitleSerializer(many=True, read_only=True)
    class Meta:
        model = Module
        fields = ['id','title','status', 'sections']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

