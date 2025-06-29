'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { AddButton } from '@/components/addButton';
import { Trash2 } from 'lucide-react';

interface Section {
  id: number;
  title: string;
  lessons?: { id: number; title: string }[];
}

interface Props {
  module: {
    id: number;
    title: string;
    sections: Section[];
  };
  onRefresh: () => void;
  onEditSectionClick: (section: Section) => void;
}

export default function CardSommaire({ module, onRefresh, onEditSectionClick }: Props) {
  const deleteSection = async (sectionId: number) => {
    await fetch(`/api/sections/${sectionId}`, { method: 'DELETE' });
    onRefresh();
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle>Sommaire</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 overflow-y-auto max-h-[70vh]">
          {module.sections.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucune section</p>
          ) : (
            module.sections.map(section => (
              <div key={section.id} className="flex items-start justify-between">
                <p
                  className="font-medium cursor-pointer hover:underline"
                  onClick={() => onEditSectionClick(section)}
                >
                  {section.title}
                </p>
                <button
                  onClick={() => deleteSection(section.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </CardContent>
      </div>
      <CardFooter className="pt-4">
        <AddButton onClick={() => onEditSectionClick({ id: 0, title: '' })} className="w-full">
          une section
        </AddButton>
      </CardFooter>
    </Card>
  );
}