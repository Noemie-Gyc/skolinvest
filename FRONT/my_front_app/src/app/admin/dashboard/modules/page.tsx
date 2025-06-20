'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

interface Module {
  id: number | string;
  title: string;
  status: string;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const logout = async () => {
    await fetch('http://localhost:8000/api/auth/logout/', { method: 'POST', credentials: 'include' });
    router.push('/admin/dashboard/login');
  };

  useEffect(() => {
    fetchWithAuth('http://localhost:8000/api/v1/modules/admin/', {
      method: 'GET',
    })
      .then(async (res) => {
        if (!res) {
          alert('Session expirée. Redirection...');
          router.push('/admin/dashboard/login');
          return;
        }

        const data = await res.json();
        setModules(data);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des modules :', err);
        setErrorMsg('Impossible de charger les modules.');
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mes modules</h1>

      <button
        onClick={logout}
        style={{
          marginBottom: '1rem',
          backgroundColor: '#c00',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Déconnexion
      </button>

      {loading && <p>Chargement...</p>}
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