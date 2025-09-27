'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import CardSummary from './CardSummary';
import AddSectionForm from './AddSectionForm';
import AddLessonForm from './AddLessonForm';
import EditModuleForm from './EditModuleForm';
import EditTextFieldForm from './EditTextFieldForm';

export default function ModuleEditPage() {
  const params = useParams();
  const moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;
  const [module, setModule] = useState<any>(null);
  // update the state to load updated data after an edition
  const [refreshKey, setRefreshKey] = useState(0);
  // Two options : either there is a section to edit, either null
  const [editingSection, setEditingSection] = useState<null | { id: number; title: string }>(null);
  const [editingLesson, setEditingLesson] = useState<null | { sectionId: number; lesson: { id: number; title: string } | null }>(null);
  const [editingModule, setEditingModule] = useState<null | { id: number; title?: string; field?: 'title'|'introduction'|'detail'; introduction?: string; detail?: string }>(null);


  useEffect(() => {
    if (!moduleId) return;
    // get the module data from the moduleId in the url's params
    async function loadModule() {
      const res = await fetchWithAuth(`/api/modules/${moduleId}/`);
      if (!res || !res.ok) return;
      const data = await res.json();
      setModule(data);
    }
    // loadModule is called if moduleId or refreshKey change
    loadModule();
  }, [moduleId, refreshKey]);

  if (!module) return <p>Chargement...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* left part of the screen : summary */}
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

      {/* right column : edition module title form or section module form */}
      <main className="w-full md:w-2/3">
        {editingModule && !editingSection && !editingLesson && (
          // If editing field is 'title', show EditModuleForm, otherwise show the generic text field form
          editingModule.field === 'title' || !editingModule.field ? (
            <EditModuleForm
              moduleId={module.id}
              moduleData={{ id: module.id, title: editingModule.title ?? module.title }}
              onSuccess={() => {
                setRefreshKey((k) => k + 1);
                setEditingModule(null);
              }}
            />
          ) : (
            // Lazy-load the EditTextFieldForm component client-side import
            <EditTextFieldForm
              moduleId={module.id}
              fieldName={editingModule.field as 'introduction' | 'detail'}
              fieldLabel={editingModule.field === 'introduction' ? 'Introduction du module' : 'Détail du module'}
              initialValue={editingModule.field === 'introduction' ? (editingModule.introduction ?? module.introduction) : (editingModule.detail ?? module.detail)}
              onSuccess={() => {
                setRefreshKey((k) => k + 1);
                setEditingModule(null);
              }}
            />
          )
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
