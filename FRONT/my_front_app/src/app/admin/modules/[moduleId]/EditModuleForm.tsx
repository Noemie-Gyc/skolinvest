'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SaveButton } from '@/components/saveButton';

interface Props {
  moduleId: number;
  moduleData: { id: number; title: string } | null;
  onSuccess: () => void;
}

export default function EditModuleForm({ moduleId, moduleData, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(moduleData?.title ?? '');
  }, [moduleData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/modules/${moduleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    setLoading(false);

    if (res.ok) {
      onSuccess();
    } else {
      alert("Erreur lors de l’enregistrement du module");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Modifier le module</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Titre du module"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={2}
          />
          <SaveButton type="submit" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </SaveButton>
        </form>
      </CardContent>
    </Card>
  );
}
