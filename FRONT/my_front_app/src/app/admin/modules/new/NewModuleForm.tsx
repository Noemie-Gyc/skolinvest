'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { Input } from '@/components/ui/input';
import { AddButton } from '@/components/addButton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function NewModuleForm() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetchWithAuth('/api/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    setLoading(false);

    if (!res) {
      setError('Authentification échouée. Veuillez vous reconnecter.');
      return;
    }

    if (!res.ok) {
      const data = await res.json();
      setError(data.details || data.error || 'Erreur lors de la création.');
      return;
    }

    const data = await res.json();

    if (data?.id) {
      router.push(`${data.id}`);
    } else {
      setError('Module créé mais ID non reçu.');
    }
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12">
      <Card className="py-15 px-6 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>
            <h1
              id="newModule-heading"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700 text-center mb-6"
              data-testid="newModules-title">
              Nouveau module
            </h1>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            aria-labelledby="formTitle"
            className="flex flex-col items-center justify-center gap-6 w-full"
          >
            <div className="w-full max-w-sm">
              <label
                htmlFor="module-title"
                className="sr-only"
              >
                Titre du module
              </label>
              <Input
                id="module-title"
                name="module-title"
                type="text"
                required
                // pop the infobulle alert if the title is too short
                minLength={3}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Saisissez le nom du module"
                // sm, md for responsive design
                className="
                bg-[#FBF8FF] 
                text-left
                text-sm 
                sm:text-base 
                md:text-lg
                text-gray-700
                py-2 sm:py-3
                px-4 sm:px-6
                transition-colors duration-200
                w-full
                "
                aria-describedby="title-help"
              />

              <p id="title-help" className="text-xs text-gray-500 mt-1">
                Minimum 3 caractères requis
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center" role="alert" aria-live="assertive">
                {error}
              </p>
            )}

            <AddButton
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Ajout en cours...' : 'Ajouter'}
            </AddButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}