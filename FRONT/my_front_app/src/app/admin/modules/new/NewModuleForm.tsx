'use client';

import { useState } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { ConnexionButton } from "@/components/connexionButton";
import '@/styles/styles.css';

export default function NewModuleForm() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

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
    <div className="form-card">
      <form onSubmit={handleSubmit} aria-labelledby="formTitle">
        <div className="form-group">
          <label htmlFor="moduleTitle">Nouveau module :</label>
          <input
            id="moduleTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            aria-describedby="moduleTitleDesc"
            placeholder="Entrez le titre du module"
          />
          <small id="moduleTitleDesc">Veuillez entrer au moins 3 caractères.</small>
        </div>

        <ConnexionButton
          type="submit"
          style={{ marginBottom: '1rem' }}
        >
          Ajouter
        </ConnexionButton>

        {error && <p className="error" aria-live="assertive">{error}</p>}
        {success && <p className="success" aria-live="polite">Module créé avec succès !</p>}
      </form>
    </div>
  );
}