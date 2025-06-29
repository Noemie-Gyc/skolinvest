'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  moduleId: number;
  section: { id: number; title: string } | null;
  onSuccess: () => void;
}

export default function AddSectionForm({ moduleId, section, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (section) setTitle(section.title);
  }, [section]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = section && section.id !== 0 ? 'PATCH' : 'POST';
    const url = section && section.id !== 0 ? `/api/sections/${section.id}` : `/api/sections`;

    const body = section && section.id !== 0 ? { title } : { title, module: moduleId };

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold">
        {section && section.id !== 0 ? 'Modifier la section' : 'Nouvelle section'}
      </h2>
      <Input
        placeholder="Titre de la section"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        minLength={2}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Enregistrement...' : 'Enregistrer'}
      </Button>
    </form>
  );
}