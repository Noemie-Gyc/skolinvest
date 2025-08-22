'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Definition of proprieties expected by the component
interface Props {
    moduleId: number;
    currentTitle: string; // the currentModule title to edit
    onSuccess: () => void; // Callback called after the registration has succeeded. 
}


// React component : to update the module title name
export default function EditModuleTitleForm({ moduleId, currentTitle, onSuccess }: Props) {
    // local state for title initialised with currentTitle
    const [title, setTitle] = useState(currentTitle);
    const [loading, setLoading] = useState(false);

    // Each time currentTitle changes local state is updated
    useEffect(() => {
        setTitle(currentTitle);
    }, [currentTitle]);

    // Manage submission of the form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // HTTP Method choice : PATCH = update, POST = create
        const res = await fetch(`/api/modules/${moduleId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });
        setLoading(false);

        if (res.ok) {
            onSuccess();
        } else {
            alert("Erreur lors de l'enregistrement du titre du module.");
        }
    };

    return (
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Modifier le titre du module</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulaire module">
                    <div>
                        <label htmlFor="module-title" className="sr-only">
                            Titre du module
                        </label>
                        <Input
                            id="module-title"
                            name="title"
                            placeholder="Titre du module"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            minLength={2}
                            aria-required="true"
                        />
                    </div>

                    <Button
                        type="submit" disabled={loading}
                        aria-busy={loading}
                        className="bg-blue-700 text-white">
                        {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}