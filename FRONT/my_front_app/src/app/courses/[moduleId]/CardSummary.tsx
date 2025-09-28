'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { AddButton } from '@/components/addButton';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
}

interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Props {
  module: {
    id: number;
    title: string;
    introduction?: string;
    detail?: string;
    sections: Section[];
    lessons: Lesson[];
  };
  onRefresh: () => void;
  onEditSectionClick: (section: Section) => void;
  onEditLessonClick: (section: Section, lesson: { id: number; title: string } | null) => void;
  onEditModuleClick: (payload: { id: number; title?: string; introduction?: string; detail?: string; field?: 'title' | 'introduction' | 'detail' }) => void;
}

export default function CardSummary({ module, onRefresh, onEditSectionClick, onEditLessonClick, onEditModuleClick }: Props) {
  const deleteSection = async (sectionId: number) => {
    await fetch(`/api/sections/${sectionId}`, { method: 'DELETE' });
    onRefresh();
  };

  const deleteLesson = async (lessonId: number) => {
    await fetch(`/api/lessons/${lessonId}`, { method: 'DELETE' });
    onRefresh();
  };

  // For editing introduction and detail fields
  const renderEditableH2 = (field: 'introduction' | 'detail', label: string) => (
    <h2
      onClick={() => onEditModuleClick({ id: module.id, field, [field]: module[field] })}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onEditModuleClick({ id: module.id, field, [field]: module[field] });
      }}
      role="button"
      aria-label={`Modifier le contenu de ${label}`}
      className="text-blue-700 cursor-pointer hover:underline"
    >
      {label}
    </h2>
  );

  return (
    <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          <h1
            id="editModule-heading"
            className="text-blue-700 text-xl sm:text-2xl font-bold cursor-pointer hover:underline"
            data-testid="editModule-title"
            onClick={() => onEditModuleClick({ id: module.id, title: module.title })}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") onEditModuleClick({ id: module.id, title: module.title });
            }}
            role="button"
            aria-label="Modifier le titre du module"
          >
            {module.title}
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto max-h-full sm:max-h-[70vh]">
        {renderEditableH2('introduction', 'Introduction du module')}
        {renderEditableH2('detail', 'Details du module')}
        {module.sections.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune section</p>
        ) : (
          module.sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <div className="flex items-center justify-between text-blue-700">
                <p
                  className="font-medium cursor-pointer hover:underline"
                  onClick={() => onEditSectionClick(section)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter") onEditSectionClick(section); }}
                  aria-label={`Modifier la section ${section.title}`}
                >
                  {section.title}
                </p>
              </div>
              <div className="pl-4 space-y-1">
                {section.lessons && section.lessons.length > 0 ? (
                  section.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between">
                      <span
                        className="text-sm cursor-pointer hover:underline"
                        onClick={() => onEditLessonClick(section, lesson)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter") onEditLessonClick(section, lesson); }}
                        aria-label={`Modifier la leçon ${lesson.title}`}
                      >
                        {lesson.title}
                      </span>
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
      <CardFooter className="flex gap-4">
        <AddButton
        //  onClick={() => }
          className="w-auto"
          aria-label="Accéder à la leçon précédente"
        >
          <CircleArrowLeft className="w-4 h-4" /> Précédent
        </AddButton>
        <AddButton
         // onClick={() =>}
          className="w-auto"
          aria-label="Accéder à la leçon suivante"
        >
          <CircleArrowRight className="w-4 h-4" /> Suivant
        </AddButton>
      </CardFooter>
    </Card>
  );
}
