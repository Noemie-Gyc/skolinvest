'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import CardSommaire from './CardSommaire';
import AddSectionForm from './AddSectionForm';

export default function ModuleEditPage() {
  const params = useParams();
  // makes sure moduleId contains a string
  const moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;

  const [module, setModule] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingSection, setEditingSection] = useState<null | { id: number; title: string }>(null);

  useEffect(() => {
    if (!moduleId) return;

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
    // w-full manage the responsivness according to the size of the screen.
    // The repartition is different for md (desktop)
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <aside className="w-full md:w-1/3">
        <CardSommaire
          module={module}
          onRefresh={() => setRefreshKey(k => k + 1)}
          onEditSectionClick={(section) => setEditingSection(section)}
        />
      </aside>
      <main className="w-full md:w-2/3">
        <AddSectionForm
          moduleId={module.id}
          section={editingSection}
          onSuccess={() => {
            setRefreshKey(k => k + 1);
            setEditingSection(null);
          }}
        />
      </main>
    </div>
  );
}
