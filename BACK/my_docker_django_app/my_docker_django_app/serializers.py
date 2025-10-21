from rest_framework import serializers
import logging
from .models import Module, Section, Lesson
# regex for regular expression
import re
logger = logging.getLogger(__name__)

class SectionTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'title']

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
    # This function ensures the video URL is either from YouTube or Vimeo
    def validate_url_video(self, value):
        youtube_regex = r'(https?://)?(www\.)?(youtube\.com|youtu\.be)/.+'
        vimeo_regex = r'(https?://)?(www\.)?vimeo\.com/.+'

        if not (re.match(youtube_regex, value) or re.match(vimeo_regex, value)):
            logger.warning(f"Validation failed for url_video: {value}")
            raise serializers.ValidationError("L’URL doit être un lien YouTube ou Vimeo.")
        return value

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