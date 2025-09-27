'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SaveButton } from '@/components/saveButton';

interface Props {
  moduleId: number;
  fieldName: string;
  fieldLabel: string; 
  initialValue?: string | null;
  onSuccess: () => void;
}

export default function EditTextFieldForm({ moduleId, fieldName, fieldLabel, initialValue, onSuccess }: Props) {
  const [value, setValue] = useState(initialValue ?? '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(initialValue ?? '');
  }, [initialValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body: any = {};
    body[fieldName] = value;

    const res = await fetch(`/api/modules/${moduleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      onSuccess();
    } else {
      alert('Erreur lors de l’enregistrement');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{fieldLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={value}
            onChange={(e) => setValue((e.target as HTMLTextAreaElement).value)}
            placeholder={fieldLabel}
            rows={8}
            className="w-full p-2 border rounded"
          />
          <SaveButton type="submit" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </SaveButton>
        </form>
      </CardContent>
    </Card>
  );
}
