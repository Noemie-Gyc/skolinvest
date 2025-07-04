import { NextResponse } from 'next/server';

// This way http://localhost:8000/ is never exposed to malicious users. 

export async function POST(request: Request) {
    const cookie = request.headers.get('cookie') || '';
    const body = await request.json();

    const res = await fetch('http://localhost:8000/api/v1/modules/create/', {
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



