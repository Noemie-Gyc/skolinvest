// Sections CRUD elements that concerns every sections (we don't need any specific ID to create an instance or to get the full list of sections)

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const requestBody = await request.json();

  const res = await fetch('http://localhost:8000/api/v1/sections/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
    body: JSON.stringify(requestBody),
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

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';

  const res = await fetch('http://localhost:8000/api/v1/sections/', {
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

