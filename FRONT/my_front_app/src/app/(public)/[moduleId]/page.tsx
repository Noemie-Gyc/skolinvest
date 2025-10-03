'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CardSummary from './CardSummary';
import ViewTextField from './ViewTextField';
import ViewSection from './ViewSection';
import ViewLesson from './ViewLesson';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import PublicHeader from "@/components/publicHeader";
import Footer from "@/components/footer";

export default function ModuleEditPage() {
  const params = useParams();
  const moduleId = Array.isArray(params.moduleId) ? params.moduleId[0] : params.moduleId;
  const [module, setModule] = useState<any>(null);
  // refresh key in case we need to refetch
  const [refreshKey, setRefreshKey] = useState(0);
  // Viewing states for the public read-only UI
  const [viewingSection, setViewingSection] = useState<null | { id: number; title: string }>(null);
  const [viewingLesson, setViewingLesson] = useState<null | { sectionId?: number; lesson: { id: number; title: string; url_video?: string } | null }>(null);
  const [viewingModule, setViewingModule] = useState<null | { id: number; field?: 'title'|'introduction'|'detail'; introduction?: string; detail?: string }>(null);


  useEffect(() => {
    if (!moduleId) return;
    // get the module data from the moduleId in the url's params
    async function loadModule() {
      try {
  // public view performs only GETs to display content. Use frontend proxy to backend public detail
  const res = await fetch(`/api/modules/${moduleId}`);
        if (!res || !res.ok) return;
        const data = await res.json();
        setModule(data);
      } catch (e) {
        // silent fail for public view; module stays null
      }
    }
    // loadModule is called if moduleId or refreshKey change
    loadModule();
  }, [moduleId, refreshKey]);

  if (!module) return <p>Chargement...</p>;

  return (
    <>
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b" role="banner">
        <PublicHeader />
      </header>

    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* left part of the screen : summary */}
      <aside className="w-full md:w-1/3">
        <CardSummary
          module={module}
          onRefresh={() => setRefreshKey((k) => k + 1)}
          onViewSectionClick={setViewingSection}
          onViewModuleClick={setViewingModule}
          onViewLessonClick={(section, lesson) =>
            setViewingLesson({
              sectionId: section?.id ?? undefined,
              lesson,
            })
          }
        />
      </aside>

      {/* right column : edition module title form or section module form */}
      <main className="w-full md:w-2/3">
          {viewingModule && !viewingSection && !viewingLesson && (
            <ViewTextField
              moduleId={module.id}
              fieldName={viewingModule.field ?? 'introduction'}
              fieldLabel={viewingModule.field === 'introduction' ? 'Introduction du module' : 'Détail du module'}
              value={viewingModule.field === 'introduction' ? (viewingModule.introduction ?? module.introduction) : (viewingModule.detail ?? module.detail)}
              onClose={() => setViewingModule(null)}
            />
          )}

          {viewingSection && !viewingLesson && !viewingModule && (
            <ViewSection
              moduleId={module.id}
              section={viewingSection}
              onClose={() => setViewingSection(null)}
            />
          )}

          {viewingLesson && !viewingModule && (
            <ViewLesson
              moduleId={module.id}
              sectionId={viewingLesson?.sectionId ?? undefined}
              sections={module.sections}
              lesson={viewingLesson.lesson}
              onClose={() => setViewingLesson(null)}
            />
          )}
      </main>
    </div>
    <Footer role="contentinfo" />
    </>
  );
}
