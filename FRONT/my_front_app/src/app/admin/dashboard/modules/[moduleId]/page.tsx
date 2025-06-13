'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

interface Section {
  id: number | string;
  title: string;
}

interface Module {
  id: number | string;
  title: string;
  status: string;
  sections: Section[];
}

export default function ModuleDetailPage() {
  const params = useParams();
  const moduleId = params?.moduleId; 
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const logout = async () => {
  await fetch('http://localhost:8000/api/auth/logout/', { method: 'POST', credentials: 'include' });
  router.push('/admin/dashboard/login');
  };


  useEffect(() => {
    if (!moduleId) return;

    fetchWithAuth(`http://localhost:8000/api/modules/${moduleId}/`, {
      method: 'GET',
    })
      .then(async (res) => {
        if (!res) {
          alert('Session expirée. Redirection...');
          router.push('/admin/dashboard/login');
          return;
        }
        const data = await res.json();
        setModule(data);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement du module :', err);
        setErrorMsg('Impossible de charger le module.');
      })
      .finally(() => setLoading(false));
  }, [moduleId, router]);

  if (loading) return <p>Chargement...</p>;
  if (errorMsg) return <p style={{ color: 'red' }}>{errorMsg}</p>;
  if (!module) return <p>Module non trouvé</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{module.title}</h1>

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
      <p>Status : {module.status}</p>

      <h2>Sections</h2>
      <ul>
        {module.sections.length === 0 ? (
          <li><em>Aucune section</em></li>
        ) : (
          module.sections.map((section) => (
            <li key={section.id}>{section.title}</li>
          ))
        )}
      </ul>
    </div>
  );
}
