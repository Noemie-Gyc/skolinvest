'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import CardSommaire from './CardSommaire';
import AddSectionForm from './AddSectionForm';
import EditModuleTitleForm from './EditModuleTitleForm';

export default function ModuleEditPage() {
  const params = useParams();
  const moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;
  const [module, setModule] = useState<any>(null);
  // update the state to load updated data after an edition
  const [refreshKey, setRefreshKey] = useState(0);
  // Two options : either there is a section to edit, either null
  const [editingSection, setEditingSection] = useState<null | { id: number; title: string }>(null);
  // state becomes true if the user clicked on the module title (false by default)
  const [isEditingModuleTitle, setIsEditingModuleTitle] = useState(false);

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
        <CardSommaire
          module={module}
          onRefresh={() => setRefreshKey(k => k + 1)}
          // action when clicking on the section title to open the edition form
          onEditSectionClick={section => {
            setIsEditingModuleTitle(false); // unset module title edition mode
            setEditingSection(section);
          }}
          // action when clicking on the module title to open the edition form
          onEditModuleTitleClick={() => {
            setEditingSection(null);
            setIsEditingModuleTitle(true);
          }}
        />
      </aside>

      {/* right column : edition module title form or section module form */}
      <main className="w-full md:w-2/3">
        {/* Conditional rendering : if isEditingModuleTitle is set, and we have the moduleId and a title, then the form can be opened*/}
        {isEditingModuleTitle && (
          <EditModuleTitleForm
            moduleId={module.id}
            currentTitle={module.title}
            onSuccess={() => {
              setIsEditingModuleTitle(false);
              setRefreshKey(k => k + 1);
            }}
          />
        )}
        {/*Conditional rendering : if editingSection is set, and we have the moduleId and a section, then the form can be opened*/}
        {editingSection && (
          <AddSectionForm
            moduleId={module.id}
            section={editingSection}
            onSuccess={() => {
              setRefreshKey(k => k + 1);
              setEditingSection(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
