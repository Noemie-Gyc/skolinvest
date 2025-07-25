import { NextResponse } from 'next/server';

// This way http://localhost:8000/ is never exposed to malicious users. 

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const body = await request.json();

  const res = await fetch(`${baseUrl}/api/v1/modules/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();

  if (!res.ok) {
    console.error('Erreur Django :', raw);
    return new NextResponse(
      JSON.stringify({
        error: 'Erreur du backend Django',
        details: raw,
      }),
      {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  return new NextResponse(raw, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';

  const res = await fetch(`${baseUrl}/api/v1/modules/admin/`, {
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



