'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import CardSommaire from './CardSommaire';
import AddSectionForm from './AddSectionForm';

export default function ModuleEditPage() {
  const { moduleId } = useParams();
  const [module, setModule] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function loadModule() {
      const res = await fetchWithAuth(`/api/modules/${moduleId}/`);
      if (!res || !res.ok) return;
      const data = await res.json();
      setModule(data);
    }

    loadModule();
  }, [moduleId, refreshKey]);

  if (!module) return <p>Chargement...</p>;

  return (
    <div className="flex gap-6 p-6">
      <aside className="w-1/3">
        <CardSommaire module={module} onRefresh={() => setRefreshKey(k => k + 1)} />
      </aside>
      <main className="w-2/3">
        <AddSectionForm moduleId={module.id} onSuccess={() => setRefreshKey(k => k + 1)} />
      </main>
    </div>
  );
}
