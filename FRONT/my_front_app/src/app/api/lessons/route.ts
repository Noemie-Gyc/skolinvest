import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export async function POST(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const requestBody = await request.json();

  const res = await fetch(`${baseUrl}/api/v1/lessons/`, {
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

  const res = await fetch(`${baseUrl}/api/v1/lessons/`, {
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

