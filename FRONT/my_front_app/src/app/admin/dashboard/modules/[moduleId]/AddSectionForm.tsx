'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

interface Props {
  moduleId: number;
  onSuccess: () => void;
}

export default function AddSectionForm({ moduleId, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetchWithAuth('/api/sections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, module: moduleId }),
    });

    if (res && res.ok) {
      setTitle('');
      onSuccess(); // déclenche un refresh du module parent
    } else {
      alert('Erreur lors de la création de la section');
    }

    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de la section"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Ajouter'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}