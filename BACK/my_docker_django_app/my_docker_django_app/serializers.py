from rest_framework import serializers
from .models import Module, Section, Lesson

class SectionTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'title']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    class Meta:
        model = Section
        fields = '__all__'

class ModuleSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    class Meta:
        model = Module
        fields = [
            'id',
            'title',
            'introduction',
            'detail',
            'status',
            'thumbnail',
            'publication_date',
            'modification_date',
            'sections'
        ]
        # we want manipulate and update the user field on the module instance
        read_only_fields = ['user']       