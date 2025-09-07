'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SaveButton } from '@/components/saveButton';

// Definition of proprieties expected by the component
interface Props {
  moduleId: number;
  section: { id: number; title: string } | null; // section to edit or null if no section
  onSuccess: () => void; // Callback called after the registration has succeeded. 
}


// React component : to add or update a section
export default function AddSectionForm({ moduleId, section, onSuccess }: Props) {
  // local state for section title
  const [title, setTitle] = useState('');

  // state to inform if the form is being submitted 
  const [loading, setLoading] = useState(false);

  // Each time section changes local state is updated
  useEffect(() => {
    if (section) setTitle(section.title);
  }, [section]);

  // Manage submission of the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // HTTP Method choice : PATCH = update, POST = create
    const isEdit = section && section.id !== 0;
    const method = isEdit ? 'PATCH' : 'POST';
    const url = isEdit ? `/api/sections/${section.id}` : `/api/sections`;
    const body = isEdit ? { title } : { title, module: moduleId };

    // call to the API
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
    <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {section && section.id !== 0 ? 'Modifier la section' : 'Nouvelle section'}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulaire section">
          <div>
            <label htmlFor="section-title" className="sr-only">Titre de la section</label>
            <Input
              id="section-title"
              name="title"
              placeholder="Titre de la section"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={2}
              aria-required="true"
            // Check if the below attribute is usefull, border becomes red if number of letters<2
            // aria-invalid={title.length < 2}
            />
          </div>

          <SaveButton type="submit" disabled={loading} aria-busy={loading} data-testid="save-section-button">
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </SaveButton>
        </form>
      </CardContent>
    </Card>
  );
}