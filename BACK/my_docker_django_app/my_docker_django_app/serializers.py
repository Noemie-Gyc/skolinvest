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
        fields = [
            'id',
            'title',
            'status',
            'thumbnail',
            'publication_date',
            'modification_date',
            'sections'
        ]
        # we want manipulate and update the user field on the module instance
        read_only_fields = ['user']

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'

