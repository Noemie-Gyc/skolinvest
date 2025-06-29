// path('<int:pk>/update/', ModuleUpdateView.as_view(), name='module-update'), pour éditer le titre du module ou s'il passe en publié.
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: Request, props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const cookieHeader = request.headers.get('cookie') || '';
    const { id } = params;

  const res = await fetch(`http://localhost:8000/api/v1/modules/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
  });

  const raw = await res.text();

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Erreur du backend Django', details: raw },
      { status: res.status }
    );
  }

  return new NextResponse(raw, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
