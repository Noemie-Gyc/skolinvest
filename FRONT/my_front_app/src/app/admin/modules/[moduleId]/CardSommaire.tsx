'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { AddButton } from '@/components/addButton';
import DeleteSectionDialog from './DeleteSectionDialog';
import { CirclePlus } from 'lucide-react';


// TypeScript : definition of a Section object (proprieties and types)
interface Section {
  id: number;
  title: string;
  lessons?: { id: number; title: string }[];
}

// cardSommaire component requires props 
interface Props {
  module: {
    id: number;
    title: string;
    sections: Section[];
  };
  onRefresh: () => void; // Callback to reload datas after a deletion for example
  onEditSectionClick: (section: Section) => void;
  onEditModuleTitleClick: () => void; // Callback to open edition form
}

// Main component to render the summary composed of the module title, the sections and the lessons
export default function CardSommaire({ module, onRefresh, onEditSectionClick, onEditModuleTitleClick }: Props) {
  // Asynchronous function to delete a section via API 
  const deleteSection = async (sectionId: number) => {
    // call to our API routes proxy to avoid exposing our backend URL
    await fetch(`/api/sections/${sectionId}`, { method: 'DELETE' });
    onRefresh(); // Reloading of the list after deletion
  };

  return (
    <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          <h1
            id="editModule-heading"
            className="text-blue-700 text-xl sm:text-2xl font-bold cursor-pointer hover:underline"
            data-testid="editModule-title"
            onClick={onEditModuleTitleClick}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onEditModuleTitleClick();
            }}
            role="button"
            aria-label="Modifier le titre du module"
          >
            {module.title}
          </h1>
        </CardTitle>
      </CardHeader>

      {/* Main content for now with section list */}
      <CardContent className="space-y-4 overflow-y-auto max-h-full sm:max-h-[70vh]">
        {module.sections.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune section</p>
        ) : (
          // Sections list
          module.sections.map(section => (
            <div
              key={section.id}
              className="bg-[#FBF8FF]  text-blue-700 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0"
            >
              <p
                className="font-medium cursor-pointer hover:underline"
                onClick={() => onEditSectionClick(section)}
                role="button" // this explicitly informs user that clicking on the title behaves like a button. 
                tabIndex={0} // makes possible focusing on the keyboard
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onEditSectionClick(section);
                }} // enables user clicking via the "enter" keyboard button
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
          ))
        )}
      </CardContent>
      <CardFooter className="pt-4">
        <AddButton
          onClick={() => onEditSectionClick({ id: 0, title: '' })}
          className="w-auto"
          aria-label="Ajouter une nouvelle section"
        >
          <CirclePlus className="w-4 h-4" /> Section
        </AddButton>
      </CardFooter>
    </Card>
  );
}