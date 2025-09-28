'use client';

import { useState, useEffect, useId } from 'react';
import { Input } from '@/components/ui/input';
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

export default function DisplayLessonForm({ moduleId, sectionId, sections, lesson, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [urlVideo, setUrlVideo] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formTitleId = useId();
  const titleInputId = useId();
  const urlInputId = useId();
  const sectionSelectId = useId();

  useEffect(() => {
    setTitle(lesson ? lesson.title : '');
    setSelectedSection(sectionId ? String(sectionId) : "");
    setUrlVideo((lesson as any)?.url_video ?? "");
  }, [lesson, sectionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation needed for accessibility
    if (!selectedSection) {
      setLoading(false);
      setError('Veuillez sélectionner une section');
      return;
    }
    if (!title || title.trim().length < 2) {
      setLoading(false);
      setError('Le titre de la leçon doit contenir au moins 2 caractères');
      return;
    }

    const isEdit = lesson && lesson.id !== 0;
    const method = isEdit ? 'PATCH' : 'POST';
    const url = isEdit ? `/api/lessons/${lesson.id}` : `/api/lessons`;
  const body = isEdit
    ? { title, url_video: urlVideo, section: Number(selectedSection) }
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
      setUrlVideo('');
    } else {
      try {
        const data = await res.json();
        setError(data?.details || data?.error || 'Erreur lors de l’enregistrement');
      } catch {
        setError('Erreur lors de l’enregistrement');
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle id={formTitleId}>
          {lesson && lesson.id !== 0 ? "Modifier la leçon" : "Nouvelle leçon"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Live region for async status / errors */}
        {error && (
          <p role="alert" aria-live="assertive" className="text-sm text-red-600 mb-2">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby={formTitleId}>
          <div>
            <label htmlFor={sectionSelectId} className="block text-sm mb-1">
              Section
            </label>
            <select
              id={sectionSelectId}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
              aria-required="true"
              aria-invalid={selectedSection === ''}
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
          <div>
            <label htmlFor={titleInputId} className="block text-sm mb-1">
              Titre de la leçon
            </label>
            <Input
              id={titleInputId}
              name="lesson-title"
              placeholder="Ex. Introduction à l’investissement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-required="true"
              aria-invalid={!!title && title.trim().length < 2}
              aria-describedby={`${titleInputId}-help`}
              minLength={2}
            />
            <p id={`${titleInputId}-help`} className="text-xs text-gray-500 mt-1">
              Minimum 2 caractères.
            </p>
          </div>
          {urlVideo && (
            <figure className="mb-4" aria-labelledby={`${urlInputId}-preview-label`}>
              <figcaption id={`${urlInputId}-preview-label`} className="block text-sm mb-1">
                Aperçu vidéo
              </figcaption>
              <ReactPlayer src={urlVideo} width="100%" height="250px" controls />
            </figure>
          )}
          <div>
            <label htmlFor={urlInputId} className="block text-sm mb-1">
              URL de la vidéo (YouTube/Vimeo)
            </label>
            <Input
              id={urlInputId}
              name="url-video"
              placeholder="https://www.youtube.com/watch?v=..."
              value={urlVideo}
              onChange={(e) => setUrlVideo(e.target.value)}
              aria-describedby={`${urlInputId}-help`}
              inputMode="url"
              type="url"
            />
            <p id={`${urlInputId}-help`} className="text-xs text-gray-500 mt-1">
              URL de la vidéo
            </p>
          </div>

          <SaveButton type="submit" disabled={loading} aria-busy={loading} aria-live="polite">
            {loading ? "Enregistrement..." : "Enregistrer"}
          </SaveButton>
        </form>
      </CardContent>
    </Card>
  );
}