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
  sectionTitle: string;
  onDelete: () => Promise<void>;
}

export default function DeleteSectionDialog({ sectionTitle, onDelete }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700"
          aria-label={`Supprimer la section ${sectionTitle}`}
        >
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer la section</DialogTitle>
        </DialogHeader>

        <p>Voulez-vous vraiment supprimer la section « {sectionTitle} » ?</p>

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