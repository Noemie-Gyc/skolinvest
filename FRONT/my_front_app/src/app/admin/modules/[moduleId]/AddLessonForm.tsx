'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Props {
  sectionId: number;
  lesson: { id: number; title: string } | null;
  onSuccess: () => void;
}

export default function AddLessonForm({ sectionId, lesson, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(lesson ? lesson.title : '');
  }, [lesson]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isEdit = lesson && lesson.id !== 0;
    const method = isEdit ? 'PATCH' : 'POST';
    const url = isEdit ? `/api/lessons/${lesson.id}` : `/api/lessons`;
    const body = isEdit ? { title } : { title, section: sectionId };

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
          {lesson && lesson.id !== 0 ? 'Modifier la leçon' : 'Nouvelle leçon'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Titre de la leçon"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            minLength={2}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}