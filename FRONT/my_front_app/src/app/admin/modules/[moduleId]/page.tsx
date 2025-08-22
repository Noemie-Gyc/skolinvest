'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import CardSummary from './CardSummary';
import AddSectionForm from './AddSectionForm';
import AddLessonForm from './AddLessonForm';
import EditModuleForm from './EditModuleForm';

export default function ModuleEditPage() {
  const params = useParams();
  // makes sure moduleId contains a string
  const moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;

  const [module, setModule] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingSection, setEditingSection] = useState<null | { id: number; title: string }>(null);
  const [editingLesson, setEditingLesson] = useState<null | { sectionId: number; lesson: { id: number; title: string } | null }>(null);
  const [editingModule, setEditingModule] = useState<null | { id: number; title: string }>(null);

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
        <CardSummary
          module={module}
          onRefresh={() => setRefreshKey((k) => k + 1)}
          onEditSectionClick={setEditingSection}
          onEditModuleClick={setEditingModule}
          onEditLessonClick={(section, lesson) =>
            setEditingLesson({
              sectionId: section?.id ?? undefined,
              lesson,
            })
          }
        />
      </aside>
      <main className="w-full md:w-2/3">
        {editingModule && !editingSection && !editingLesson && (
          <EditModuleForm
            moduleId={module.id}
            moduleData={editingModule}
            onSuccess={() => {
              setRefreshKey((k) => k + 1);
              setEditingModule(null);
            }}
          />
        )}
        {editingSection && !editingLesson && !editingModule && (
          <AddSectionForm
            moduleId={module.id}
            section={editingSection}
            onSuccess={() => {
              setRefreshKey((k) => k + 1);
              setEditingSection(null);
            }}
          />
        )}
        {editingLesson && !editingModule && (
          <AddLessonForm
            moduleId={module.id}
            sectionId={editingLesson?.sectionId ?? undefined}
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
