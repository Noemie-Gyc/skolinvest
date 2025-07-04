'use client';

import { useState } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { ConnexionButton } from "@/components/connexionButton";

export default function NewModuleForm() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // call to django API from api/routes it means our API routes won't be visible to malicious users via the dev tools (headers, source code on front side) or via tools as
    // Postman, curls, scripts etc.
    // Advantage of protected routes :  if we change API later, all routes are in one place, the api directory.
    const res = await fetchWithAuth('/api/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (!res) {
      setError('Authentification échouée. Veuillez vous reconnecter.');
      return;
    }

    if (!res.ok) {
      const data = await res.json();
      setError(data.details || data.error || 'Erreur lors de la création.');
      return;
    }

    setSuccess(true);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nouveau module :
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          minLength={3}
        />
      </label>

      <ConnexionButton
        type="submit"
        style={{ marginBottom: '1rem' }} // si ConnexionButton accepte style
      >Créer
      </ConnexionButton>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Module créé avec succès !</p>}
    </form>
  );
}