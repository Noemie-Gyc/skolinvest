import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string }}) {
    const cookie = request.headers.get('cookie') || '';
    const { id } = params;

    const res = await fetch(`http://localhost:8000/api/v1/sections/${id}/`, {
        headers: {
            'Content-Type': 'application/json',
            cookie,
        },
    });

    const raw = await res.text();

    if (!res.ok) {
        return NextResponse.json(
            { error: 'Erreur du backend Django',details: raw},
            { status: res.status}
        );
    }
    return new NextResponse(raw, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const cookie = req.headers.get('cookie') || '';
  const { id } = params;

  const res = await fetch(`http://localhost:8000/api/v1/sections/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Erreur Django', details: raw },
      { status: res.status }
    );
  }

  return new NextResponse(raw, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const cookie = req.headers.get('cookie') || '';
  const { id } = params;

  const res = await fetch(`http://localhost:8000/api/v1/sections/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
  });

  if (!res.ok) {
    const raw = await res.text();
    return NextResponse.json(
      { error: 'Erreur Django', details: raw },
      { status: res.status }
    );
  }

  return new NextResponse(null, { status: 204 });
}