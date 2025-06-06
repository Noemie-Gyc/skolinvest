'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert } from "@/components/ui/alert"

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

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    router.push('login');
  };

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      alert("Vous devez être connecté.");
      router.push('login');
      setLoading(false);
      return;
    }

    fetch('http://localhost:8000/api/admin/modules/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          alert("Vous n'avez pas les droits pour accéder à cette page.");
          router.push('login');
          throw new Error("Accès refusé");
        }

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