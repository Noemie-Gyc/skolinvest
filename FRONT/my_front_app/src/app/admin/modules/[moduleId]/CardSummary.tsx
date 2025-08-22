'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { AddButton } from '@/components/addButton';
import DeleteSectionDialog from './DeleteSectionDialog';
import DeleteLessonDialog from './DeleteLessonDialog';


interface Lesson {
  id: number;
  title: string;
}

// TypeScript : definition of a Section object (proprieties and types)
interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

// cardSummary component requires props
interface Props {
  module: {
    id: number;
    title: string;
    sections: Section[];
    lessons: Lesson[];
  };
  onRefresh: () => void; // Callback to reload datas after a deletion for example
  onEditSectionClick: (section: Section) => void; // Callback to open edition form
  onEditLessonClick: (section: Section, lesson: { id: number; title: string } | null) => void;
  onEditModuleClick: (module: { id: number; title: string }) => void;
}

// Main component to render the summary (for now only section titles list)
export default function CardSummary({ module, onRefresh, onEditSectionClick, onEditLessonClick, onEditModuleClick }: Props) {
  // Asynchronous function to delete a section via API 
  const deleteSection = async (sectionId: number) => {
    // call to our API routes proxy to avoid exposing to our real django URL
    await fetch(`/api/sections/${sectionId}`, { method: 'DELETE' });
    onRefresh(); // Reloading of the list after deletion
  };

  const deleteLesson = async (lessonId: number) => {
  await fetch(`/api/lessons/${lessonId}`, { method: 'DELETE' });
  onRefresh();
};

  return (
    <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle
          className="cursor-pointer hover:underline"
          onClick={() => onEditModuleClick({ id: module.id, title: module.title })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onEditModuleClick({ id: module.id, title: module.title });
          }}
          aria-label={`Modifier le titre du module ${module.title}`}
        >
          {module.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto max-h-full sm:max-h-[70vh]">
        {module.sections.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune section</p>
        ) : (
          // Sections list
          module.sections.map((section) => (
            <div key={section.id} className="space-y-2">
              {/* Titre de section + poubelle alignés */}
              <div className="flex items-center justify-between">
                <p
                  className="font-medium cursor-pointer hover:underline"
                  onClick={() => onEditSectionClick(section)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onEditSectionClick(section);
                  }}
                  aria-label={`Modifier la section ${section.title}`}
                >
                  {section.title}
                </p>

                <DeleteSectionDialog
                  sectionTitle={section.title}
                  onDelete={async () => {
                    await deleteSection(section.id);
                  }}
                />
              </div>

              {/* Liste des leçons sous le titre de section */}
              <div className="pl-4 space-y-1">
                {section.lessons && section.lessons.length > 0 ? (
                  section.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between">
                      <span
                        className="text-sm cursor-pointer hover:underline"
                        onClick={() => onEditLessonClick(section, lesson)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') onEditLessonClick(section, lesson);
                        }}
                        aria-label={`Modifier la leçon ${lesson.title}`}
                      >
                        {lesson.title}
                      </span>

                      <DeleteLessonDialog
                        lessonTitle={lesson.title}
                        onDelete={async () => {
                          await deleteLesson(lesson.id);
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">Aucune leçon</span>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter className="pt-4">
        <AddButton
          onClick={() => onEditSectionClick({ id: 0, title: "", lessons: [] })}
          className="w-auto"
          aria-label="Ajouter une nouvelle section"
        >
          Section
        </AddButton>
        <AddButton
          onClick={() => onEditLessonClick(undefined, null)}
          className="w-auto"
          aria-label="Ajouter une nouvelle leçon"
        >
          Leçon
        </AddButton>
      </CardFooter>
    </Card>
  );
}