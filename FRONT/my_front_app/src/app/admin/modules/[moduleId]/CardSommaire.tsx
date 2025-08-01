'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { AddButton } from '@/components/addButton';
import DeleteSectionDialog from './DeleteSectionDialog';


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

// cardSommaire component requires props 
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
}

// Main component to render the summary (for now only section titles list)
export default function CardSommaire({ module, onRefresh, onEditSectionClick, onEditLessonClick }: Props) {
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
        <CardTitle>Sommaire</CardTitle>
      </CardHeader>

      {/* Main content for now with section list */}
      <CardContent className="space-y-4 overflow-y-auto max-h-full sm:max-h-[70vh]">
        {module.sections.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune section</p>
        ) : (
          // Sections list
          module.sections.map((section) => (
            <div
              key={section.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0"
            >
              <p
                // Accessibility
                // Style to make more interaction with user.
                className="font-medium cursor-pointer hover:underline"
                onClick={() => onEditSectionClick(section)}
                role="button" // this informs user explicitly the behaviour of the title is like a button.
                tabIndex={0} // makes possible to focus on the keyboard
                onKeyDown={(e) => {
                  if (e.key === "Enter") onEditSectionClick(section);
                }} // enables user to clik via the "enter" keyboard button
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



              {/* Button to edit the section */}
              <button
                className="text-blue-600 text-xs mt-2"
                onClick={() => onEditSectionClick(section)}
              >
                Modifier la section
              </button>
              {/* Liste des lessons */}
              <div className="pl-4 mt-2 space-y-1">
                {section.lessons && section.lessons.length > 0 ? (
                  section.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{lesson.title}</span>
                      {/* Ajoute ici un bouton pour éditer la lesson */}
                      <button
                        className="text-blue-600 text-xs ml-2"
                        onClick={() => onEditLessonClick(section, lesson)}
                      >
                        Modifier
                      </button>
                      {/* Ajoute ici un bouton pour supprimer la lesson */}
                      <button
                        className="text-red-500 text-xs ml-2"
                        onClick={() => deleteLesson(lesson.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Aucune leçon
                  </span>
                )}
                {/* Bouton pour ajouter une lesson */}
                <button
                  className="text-green-600 text-xs mt-2"
                  onClick={() => onEditLessonClick(section, null)}
                >
                  + Ajouter une leçon
                </button>
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
      </CardFooter>
    </Card>
  );
}