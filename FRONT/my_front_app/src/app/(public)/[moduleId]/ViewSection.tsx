'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SaveButton } from '@/components/saveButton';

interface Props {
  moduleId: number;
  section: { id: number; title: string } | null;
  onClose: () => void;
}

export default function ViewSection({ moduleId, section, onClose }: Props) {
  if (!section) return null;
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Affichage en lecture seule de la section. Aucune modification possible depuis l'espace public.</p>
        <div className="mt-4">
          <SaveButton onClick={onClose}>Fermer</SaveButton>
        </div>
      </CardContent>
    </Card>
  );
}
