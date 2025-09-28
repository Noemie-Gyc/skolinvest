'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  moduleId: number;
  fieldName: string;
  fieldLabel: string;
  value?: string | null;
  onClose: () => void;
}

export default function ViewTextField({ moduleId, fieldName, fieldLabel, value, onClose }: Props) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{fieldLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-full">
          {value ? <div dangerouslySetInnerHTML={{ __html: value }} /> : <p className="text-sm text-muted-foreground">Aucun contenu pour le moment.</p>}
        </div>
        <div className="mt-4">
          <Button onClick={onClose} variant="ghost">Fermer</Button>
        </div>
      </CardContent>
    </Card>
  );
}
