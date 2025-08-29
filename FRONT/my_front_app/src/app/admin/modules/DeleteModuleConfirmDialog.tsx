'use client';

interface Props {
    moduleTitle: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmDialog({ moduleTitle, onCancel, onConfirm }: Props) {
    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
                <h2 id="dialog-title" className="text-lg font-semibold mb-4">
                    Confirmer la suppression
                </h2>
                <p>Voulez-vous vraiment supprimer le module &quot;{moduleTitle}&quot; ? Cette action est irréversible.</p>
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}