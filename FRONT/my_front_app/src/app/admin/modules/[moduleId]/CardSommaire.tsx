'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { AddButton } from '@/components/addButton';
import { Trash2 } from 'lucide-react';

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
  onEditSectionClick: (section: Section) => void; // Callback to open edition form
}

// Main component to render the summary (for now only section titles list)
export default function CardSommaire({ module, onRefresh, onEditSectionClick }: Props) {
  // Asynchronous function to delete a section via API 
  const deleteSection = async (sectionId: number) => {
    // call to our API routes proxy to avoid exposing to our real django URL
    await fetch(`/api/sections/${sectionId}`, { method: 'DELETE' });
    onRefresh(); // Reloading of the list after deletion
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
          module.sections.map(section => (
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
                  if (e.key === 'Enter') onEditSectionClick(section);
                }} // enables user to clik via the "enter" keyboard button
                aria-label={`Modifier la section ${section.title}`}
              >
                {section.title}
              </p>

              <button
                onClick={() => deleteSection(section.id)}
                className="text-red-500 hover:text-red-700"
                // Aria-label added for accessibility
                aria-label={`Supprimer la section ${section.title}`}
              >
                <Trash2 size={16} />
              </button>
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
          une section
        </AddButton>
      </CardFooter>
    </Card>
  );
}