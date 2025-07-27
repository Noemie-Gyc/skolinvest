import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') || '';

  // Premier appel avec access token
  let res = await fetch(`${baseUrl}/api/v1/modules/admin/`, {
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
    credentials: 'include',
  });

  // Si access token expiré, on tente un refresh
  if (res.status === 401) {
    const refreshRes = await fetch(`${baseUrl}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieHeader,
      },
      credentials: 'include',
    });

    if (refreshRes.ok) {
      // IMPORTANT: Récupérer les nouveaux cookies après refresh
      const newCookies = refreshRes.headers.get('set-cookie');

      // Réessayer avec les nouveaux cookies
      res = await fetch(`${baseUrl}/api/v1/modules/admin/`, {
        headers: {
          'Content-Type': 'application/json',
          cookie: newCookies || cookieHeader, // Utiliser les nouveaux cookies
        },
        credentials: 'include',
      });

      // Transmettre les nouveaux cookies au client
      const response = new NextResponse(await res.text(), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });

      if (newCookies) {
        response.headers.set('Set-Cookie', newCookies);
      }

      return response;
    } else {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  const raw = await res.text();

  if (!res.ok) {
    console.error('Erreur Django :', raw);
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






