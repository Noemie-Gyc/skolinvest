'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
          <Button onClick={onClose} variant="ghost">Fermer</Button>
        </div>
      </CardContent>
    </Card>
  );
}
