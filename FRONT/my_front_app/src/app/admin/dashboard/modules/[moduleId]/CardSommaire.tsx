'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
}

export default function CardSommaire({ module, onRefresh }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sommaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {module.sections.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune section</p>
        ) : (
          module.sections.map(section => (
            <div key={section.id}>
              <p className="font-medium">{section.title}</p>
              <ul className="ml-4 text-sm text-muted-foreground list-disc">
                {section.lessons?.length ? (
                  section.lessons.map(lesson => (
                    <li key={lesson.id}>{lesson.title}</li>
                  ))
                ) : (
                  <li><em>Aucune leçon</em></li>
                )}
              </ul>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}