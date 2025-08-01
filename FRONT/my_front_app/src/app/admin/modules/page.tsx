import ModulesListClient from './ModulesListClient';
import { cookies } from 'next/headers';

async function fetchModules() {
  const cookieStore = await cookies();

  // get cookies stored by the browser
  const accessToken = cookieStore.get('access');
  const refreshToken = cookieStore.get('refresh');

  // Construire le header Cookie
  const cookieParts = [];
  if (accessToken) cookieParts.push(`access=${accessToken.value}`);
  if (refreshToken) cookieParts.push(`refresh=${refreshToken.value}`);
  const cookieHeader = cookieParts.join('; ');

  const res = await fetch('http://localhost:3000/api/modules', {
    headers: {
      // send the cookie headers to the backend API
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Erreur lors du chargement des modules');
  }

  return res.json();
}

export default async function ModulesList() {
  // while the request in the fetchModules function are not done, we can't load the client component ModuleListClient
  const modules = await fetchModules();

  return (

    <div className="max-w-6xl mx-auto mt-12 px-4">

      <ModulesListClient modules={modules} />

    </div>
  );
}