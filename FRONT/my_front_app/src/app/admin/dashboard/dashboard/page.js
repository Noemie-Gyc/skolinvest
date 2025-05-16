'use client'; // uniquement si tu utilises App Router (Next.js 13+)

import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/home/', {
      method: 'GET',
      credentials: 'include', // important pour les cookies de session
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text(); // pour afficher le message d'erreur côté Django
          throw new Error(`Erreur HTTP ${res.status} : ${text}`);
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setError('');
      })
      .catch((err) => {
        console.error('Erreur de requête :', err);
        setError('Accès refusé ou erreur serveur.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard Admin</h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}