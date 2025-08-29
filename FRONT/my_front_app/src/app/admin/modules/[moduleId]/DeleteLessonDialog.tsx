'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Props {
  lessonTitle: string;
  onDelete: () => Promise<void>;
}

export default function DeleteLessonDialog({ lessonTitle, onDelete }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700"
          aria-label={`Supprimer la leçon ${lessonTitle}`}
        >
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer la leçon</DialogTitle>
        </DialogHeader>

        <p>Voulez-vous vraiment supprimer la leçon « {lessonTitle} » ?</p>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Annuler</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant="destructive" onClick={onDelete}>
              Supprimer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
