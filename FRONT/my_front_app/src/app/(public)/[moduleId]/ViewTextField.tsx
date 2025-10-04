'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SaveButton } from '@/components/saveButton';
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
          {value}
        </div>
        <div className="mt-4">
          <SaveButton onClick={onClose}>Fermer</SaveButton>
        </div>
      </CardContent>
    </Card>
  );
}
