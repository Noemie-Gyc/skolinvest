'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SaveButton } from '@/components/saveButton';

interface Lesson {
  id: number;
  title: string;
  url_video?: string;
}

interface Props {
  moduleId: number;
  sectionId?: number;
  sections: { id: number; title: string }[];
  lesson: Lesson | null;
  onClose: () => void;
}

export default function ViewLesson({ moduleId, sectionId, sections, lesson, onClose }: Props) {
  if (!lesson) return <p>Aucune leçon sélectionnée.</p>;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {lesson.url_video ? (
          <div className="mb-4">
            {/* Basic embed for YouTube/Vimeo or link fallback */}
            {lesson.url_video.includes('youtube.com') || lesson.url_video.includes('youtu.be') ? (
              <iframe
                title={lesson.title}
                src={lesson.url_video.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                width="100%"
                height="360"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : lesson.url_video.includes('vimeo.com') ? (
              <iframe
                title={lesson.title}
                src={lesson.url_video.replace('vimeo.com/', 'player.vimeo.com/video/')}
                width="100%"
                height="360"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <a href={lesson.url_video} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                Ouvrir la ressource vidéo
              </a>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Aucune vidéo pour cette leçon.</p>
        )}
        <div className="mt-4">
          <SaveButton onClick={onClose}>Fermer</SaveButton>
        </div>
      </CardContent>
    </Card>
  );
}
