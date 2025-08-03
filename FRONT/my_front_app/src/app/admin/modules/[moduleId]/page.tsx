'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import CardSommaire from './CardSommaire';
import AddSectionForm from './AddSectionForm';
import AddLessonForm from './AddLessonForm';

export default function ModuleEditPage() {
  const params = useParams();
  // makes sure moduleId contains a string
  const moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;

  const [module, setModule] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingSection, setEditingSection] = useState<null | { id: number; title: string }>(null);
  const [editingLesson, setEditingLesson] = useState<null | { sectionId: number; lesson: { id: number; title: string } | null }>(null);

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
          onRefresh={() => setRefreshKey((k) => k + 1)}
          onEditSectionClick={setEditingSection}
          onEditLessonClick={(section, lesson) =>
            setEditingLesson({ sectionId: section.id, lesson })
          }
        />
      </aside>
      <main className="w-full md:w-2/3">
        {editingSection && !editingLesson && (
          <AddSectionForm
            moduleId={module.id}
            section={editingSection}
            onSuccess={() => {
              setRefreshKey((k) => k + 1);
              setEditingSection(null);
            }}
          />
        )}
        {editingLesson && (
          <AddLessonForm
            moduleId={module.id}
            sectionId={editingLesson?.sectionId ?? module.sections[0]?.id}
            sections={module.sections}
            lesson={editingLesson.lesson}
            onSuccess={() => {
              setRefreshKey((k) => k + 1);
              setEditingLesson(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
