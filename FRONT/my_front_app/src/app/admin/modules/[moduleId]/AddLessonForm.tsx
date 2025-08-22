'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ReactPlayer from 'react-player';
import { SaveButton } from '@/components/saveButton';

interface Props {
  moduleId: number;
  sectionId: number;
  sections: { id: number; title: string }[];
  lesson: { id: number; title: string } | null;
  onSuccess: () => void;
}

export default function AddLessonForm({ moduleId, sectionId, sections, lesson, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [urlVideo, setUrlVideo] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(lesson ? lesson.title : '');
    setSelectedSection(sectionId ? String(sectionId) : "");
    setUrlVideo((lesson as any)?.url_video ?? "");
  }, [lesson, sectionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isEdit = lesson && lesson.id !== 0;
    const method = isEdit ? 'PATCH' : 'POST';
    const url = isEdit ? `/api/lessons/${lesson.id}` : `/api/lessons`;
    const body = isEdit 
     ? { title, url_video: urlVideo }
     : { title, url_video: urlVideo, section: Number(selectedSection), module: moduleId };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      onSuccess();
      setTitle('');
    } else {
      alert('Erreur lors de l’enregistrement');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {lesson && lesson.id !== 0 ? "Modifier la leçon" : "Nouvelle leçon"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="section-select" className="block text-sm mb-1">
              Section
            </label>
            <select
              id="section-select"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            >
              <option value="" disabled>
                Sélectionner la section
              </option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>
          <Input
            placeholder="Titre de la leçon"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={2}
          />
          {urlVideo && (
            <div className="mb-4">
              <label className="block text-sm mb-1">Aperçu vidéo</label>
              <ReactPlayer src={urlVideo} width="100%" height="250px" controls />
            </div>
          )}
          <Input
            placeholder="URL YouTube/Vimeo (optionnel)"
            value={urlVideo}
            onChange={(e) => setUrlVideo(e.target.value)}
          />

          <SaveButton type="submit" disabled={loading}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </SaveButton>
        </form>
      </CardContent>
    </Card>
  );
}