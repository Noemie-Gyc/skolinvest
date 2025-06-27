// Ici mettre les routes du CRUD sections

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const body = await req.json();

  const res = await fetch('http://localhost:8000/api/v1/sections/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();

  if (!res.ok) {
    return NextResponse.json({ error: 'Erreur Django', details: raw }, { status: res.status });
  }

  return new NextResponse(raw, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(request: Request, { params }: { params: { id: string }}) {
    const cookie = request.headers.get('cookie') || '';

    const res = await fetch('http://localhost:8000/api/v1/sections/', {
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

