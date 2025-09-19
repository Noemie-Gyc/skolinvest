import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/modules/public/`, {
      headers: { 'Content-Type': 'application/json' },
    });

    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Proxy error for public modules:', err);
    return NextResponse.json({ error: 'Proxy error', details: err?.message ?? String(err) }, { status: 502 });
  }
}
