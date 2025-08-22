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
import { Eye } from 'lucide-react';

// Define all the types and fields used in the module list
interface Module {
    id: number;
    title: string;
    thumbnail?: string;
    status?: string;
}

interface Props {
    modules: Module[];
}

export default function ModulesListClient({ modules }: Props) {
    const [moduleList, setModuleList] = useState(modules); // ModuleList is a list of Module objects
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null); // module ID to delete or, value remains null

    // When the react component image is loaded on the page. If it can't read the path of the thumbnail associated to the module id, 
    // the javascript dictionnary imageErrors is incremented by the key/value {moduleId: true}.
    const [imageErrors, setImageErrors] = useState<{ [id: number]: boolean }>({}); // state for broken images with wrong paths

    // Determine the image source for thumbnails
    function getThumbnailSrc(thumbnail?: string, id?: number): string {
        //hasError takes the value true if the module id is found in the imageErrors dictionary.
        const hasError = id ? imageErrors[id] : false;
        if (hasError || !thumbnail || thumbnail.trim() === '') {
            return '/financeMiniature.webp'; // default image given for broken paths or missing thumbnails
        }
        return thumbnail.startsWith('http') ? thumbnail : '/' + thumbnail;
    }

    // delete the module with the delete route from the API via fetchWithAuth to check both cookies and via proxy api/route to protect backend url
    async function deleteModule(id: number) {
        const res = await fetchWithAuth(`/api/modules/${id}`, { method: 'DELETE' });
        if (res?.ok) {
            // using filter avoid reloading the page and remake a request to our backend API.
            setModuleList(list => list.filter(m => m.id !== id)); // update the current moduleList by removing the id of the deleted module. 
            setConfirmDeleteId(null);
        } else {
            alert('Erreur lors de la suppression');
        }
    }

    return (
        <>
            <div className="px-4 md:px-8">
                {/* Page title accessible */}
                <section aria-labelledby="modules-heading" data-testid="modules-section">
                    {/* responsive header (title + button + counter) */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 px-4 gap-2 text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start">
                            <h1 id="modules-heading" className="text-blue-700 text-xl sm:text-2xl font-bold" data-testid="modules-title">
                                MES MODULES
                            </h1>
                            {moduleList.length > 0 && (
                                <span className="text-sm sm:text-base text-purple-800" data-testid="modules-count">
                                    {moduleList.length} {moduleList.length > 1 ? 'modules' : 'module'}
                                </span>
                            )}
                        </div>
                        <div className="mt-2 md:mt-0 self-center md:self-auto">
                            {/* button add a module */}
                            <AddButton
                                href="/admin/modules/new"
                                className="text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded full-md"
                                data-testid="add-module-button"
                            >
                                + Nouveau
                            </AddButton>
                        </div>
                    </div>

                    {/* ModuleList*/}
                    <div role="list" className="flex flex-col gap-4" data-testid="modules-list">
                        {moduleList.length === 0 ? (
                            <p className="text-gray-600 text-center md:text-left" data-testid="no-modules-message">
                                Aucun module disponible.
                            </p>
                        ) : (
                            moduleList.map((module, index) => {
                                const imageSrc = getThumbnailSrc(module.thumbnail, module.id);

                                return (
                                    <Card
                                        key={module.id}
                                        role="listitem"
                                        className="flex flex-row items-start gap-2 p-2 sm:gap-4 sm:p-4"
                                        data-testid={`module-card-${module.id}`}
                                    >
                                        {/* module miniature */}
                                        <div className="relative w-20 h-20 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded">
                                            <Image
                                                src={imageSrc}
                                                alt={`miniature du module ${module.title}`}
                                                width={128}
                                                height={128}
                                                // load the image only if visible on viewport by user
                                                priority={index === 0}
                                                loading={index === 0 ? "eager" : "lazy"}
                                                sizes="(max-width: 768px) 80px, 128px"
                                                className="object-cover w-full h-full"
                                                data-testid={`module-thumbnail-${module.id}`}
                                                // Register if the moduleId thumbnail is broken.
                                                onError={() =>
                                                    setImageErrors(prev => ({ ...prev, [module.id]: true }))
                                                }
                                            />
                                        </div>

                                        {/* Module title */}
                                        <div className="flex flex-col justify-between flex-grow min-w-0">
                                            <Link
                                                href={`/admin/modules/${module.id}`}
                                                className="text-neutral-950 font-semibold text-sm sm:text-base md:text-lg break-words max-w-[12rem] sm:max-w-none"
                                                aria-label={`Éditer le module ${module.title}`}
                                                data-testid={`module-title-link-${module.id}`}
                                            >
                                                {module.title}
                                            </Link>
                                        </div>

                                        {/* Status */}
                                        <div className="flex flex-col items-center justify-start w-24 flex-shrink-0 text-center pt-1">
                                            {index === 0 && (
                                                <span className="text-xs sm:text-sm text-purple-800 font-bold tracking-wide mb-1" data-testid="status-header">
                                                    Statuts
                                                </span>
                                            )}
                                            <span
                                                className="flex items-center justify-center gap-1 text-sm text-gray-600"
                                                data-testid={`module-status-${module.id}`}
                                            >
                                                {module.status === 'published' && (
                                                    <Eye size={16} className="text-gray-600" aria-hidden="true" />
                                                )}
                                                {module.status}
                                            </span>
                                        </div>

                                        {/* Dropdown menu : edit or delete a module */}
                                        <div className="flex items-start pt-1 pl-2 ml-auto">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        aria-label={`Options pour le module ${module.title}`}
                                                        aria-haspopup="menu"
                                                        // informs user if popup is open or closed
                                                        aria-expanded="false"
                                                        data-testid={`module-options-${module.id}`}
                                                    >
                                                        <span aria-hidden="true">⋮</span>
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" data-testid={`module-dropdown-${module.id}`}>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/admin/modules/${module.id}`}
                                                            data-testid={`edit-module-${module.id}`}
                                                        >
                                                            Éditer
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onSelect={e => {
                                                            e.preventDefault();
                                                            setConfirmDeleteId(module.id);
                                                        }}
                                                        className="text-red-600 focus:bg-red-100"
                                                        data-testid={`delete-module-${module.id}`}
                                                    >
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </Card>
                                );
                            })
                        )}
                    </div>
                </section>
            </div>

            {/* modal to confirm deletion of the module */}
            {confirmDeleteId !== null && (
                /* confirmDeletedId is not null if the user clicked on the deleted button */
                <DeleteConfirmDialog
                    moduleTitle={moduleList.find(m => m.id === confirmDeleteId)?.title || ''}
                    // if user clicks on the button on cancel, confirmDeleteId is set to null
                    onCancel={() => setConfirmDeleteId(null)}
                    onConfirm={() => deleteModule(confirmDeleteId)}
                    data-testid="delete-confirm-dialog"
                />
            )}
        </>
    );
}