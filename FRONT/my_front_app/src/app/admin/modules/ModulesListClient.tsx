'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import DeleteConfirmDialog from './DeleteModuleConfirmDialog';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { AddButton } from '@/components/addButton';

interface Module {
    id: number;
    title: string;
    thumbnail?: string;
}

interface Props {
    modules: Module[];
}

export default function ModulesListClient({ modules }: Props) {
    const [moduleList, setModuleList] = useState(modules);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
    const [imageErrors, setImageErrors] = useState<{ [id: number]: boolean }>({});

    // Enable getting a thumbnail picture by default. If there is a thumbnail found in the database and the path is unvalid et make an error, then it will use the default image.
    function getThumbnailSrc(thumbnail?: string, id?: number): string {
        const hasError = id ? imageErrors[id] : false;
        if (hasError || !thumbnail || thumbnail.trim() === '') {
            return '/imageTest.jpg';
        }
        if (thumbnail.startsWith('http://') || thumbnail.startsWith('https://')) {
            return thumbnail;
        }
        return thumbnail.startsWith('/') ? thumbnail : '/' + thumbnail;
    }

    async function deleteModule(id: number) {
        const res = await fetchWithAuth(`/api/modules/${id}`, { method: 'DELETE' });
        if (res?.ok) {
            setModuleList(list => list.filter(m => m.id !== id));
            setConfirmDeleteId(null);
        } else {
            alert('Erreur lors de la suppression');
        }
    }

    return (
        <>
            <div className="px-4 md:px-8">
                <div className="flex justify-between items-center mb-6 px-4 flex-wrap gap-2">
                    <h2 className="text-blue-700 text-2xl font-bold">MES MODULES</h2>
                    <AddButton href="/admin/modules/new" className="text-lg">+ Nouveau</AddButton>
                </div>

                <div className="flex flex-col gap-4">
                    {moduleList.length === 0 ? (
                        <p className="text-gray-600">Aucun module disponible.</p>
                    ) : (
                        moduleList.map(module => {
                            const imageSrc = getThumbnailSrc(module.thumbnail, module.id);

                            return (
                                <Card
                                    key={module.id}
                                    className="flex flex-row items-start gap-4 p-4"
                                >
                                    {/* Image */}
                                    <div className="relative w-32 h-32 flex-shrink-0">
                                        <Image
                                            src={imageSrc}
                                            alt={`Vignette du module ${module.title}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 128px"
                                            className="object-cover rounded bg-gray-100"
                                            onError={() => setImageErrors(prev => ({ ...prev, [module.id]: true }))}
                                        />
                                    </div>

                                    {/* Titre + actions mobiles */}
                                    <div className="flex flex-col justify-between flex-grow min-w-0">
                                        <Link
                                            href={`/admin/modules/${module.id}`}
                                            className="
                                            text-neutral-950 
                                            font-semibold 
                                            text-lg 
                                            hover:underline 
                                            focus:outline-none 
                                            focus:ring-2 
                                            focus:ring-blue-500"
                                            aria-label={`Éditer le module ${module.title}`}
                                        >
                                            {module.title}
                                        </Link>

                                        {/* Actions visibles uniquement sur mobile */}
                                        <div className="flex md:hidden flex-row flex-wrap mt-2 gap-2 text-sm">
                                            <Link
                                                href={`/admin/modules/${module.id}`}
                                                className="
                                                text-blue-600
                                                bg-blue-100 
                                                rounded-full 
                                                px-3 
                                                py-1 
                                                font-medium 
                                                hover:underline 
                                                focus:outline-none 
                                                focus:ring-2 
                                                focus:ring-blue-400
                                                text-sm 
                                                sm:text-xs 
                                                sm:px-2 sm:py-0.5
                                                "
                                                aria-label={`Modifier ${module.title}`}
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => setConfirmDeleteId(module.id)}
                                                className="
                                                text-red-600 
                                                bg-red-100 
                                                rounded-full 
                                                px-3 
                                                py-1 
                                                font-medium 
                                                hover:underline 
                                                focus:outline-none 
                                                focus:ring-2 
                                                focus:ring-red-400
                                                text-sm 
                                                sm:text-xs 
                                                sm:px-2 sm:py-0.5
                                                "
                                                aria-label={`Supprimer ${module.title}`}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>

                                    {/* Menu ⋮ visible uniquement sur desktop */}
                                    <div className="hidden md:flex flex-shrink-0">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    aria-label={`Options pour le module ${module.title}`}
                                                >
                                                    ⋮
                                                </button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/modules/${module.id}`}>✏️ Éditer</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onSelect={e => {
                                                        e.preventDefault();
                                                        setConfirmDeleteId(module.id);
                                                    }}
                                                    className="text-red-600 focus:bg-red-100"
                                                >
                                                    🗑️ Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </Card>
                            );
                        })
                    )}
                </div>
            </div>
            {confirmDeleteId !== null && (
                <DeleteConfirmDialog
                    moduleTitle={moduleList.find(m => m.id === confirmDeleteId)?.title || ''}
                    onCancel={() => setConfirmDeleteId(null)}
                    onConfirm={() => deleteModule(confirmDeleteId)}
                />
            )}
        </>
    );
}