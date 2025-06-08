'use client';
import React, { useEffect, useState } from 'react';


interface Module {
  id: number | string;
  title: string;
  status: string;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/modules/', {
      method: 'GET',
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Erreur HTTP ${res.status} : ${text}`);
        }
        return res.json();
      })
      .then((data) => setModules(data))
      .catch((err) => {
        console.error('Erreur lors du chargement des modules :', err);
        setErrorMsg('Impossible de charger les modules.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mes modules</h1>

      {loading && <p>Roulement de tambour...</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <ul>
        {modules.map((module) => (
          <li key={module.id}>
            <strong>{module.title}</strong> — {module.status}
          </li>
        ))}
      </ul>
    </div>
   
  );
}