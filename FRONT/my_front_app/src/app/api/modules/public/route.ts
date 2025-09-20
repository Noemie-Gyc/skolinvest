import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/modules/public/`, {
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();

    return NextResponse.json(json, { status: res.status });
  } catch (err: any) {
    console.error('Proxy error for public modules:', err);
    return NextResponse.json({ error: 'Proxy error', details: err?.message ?? String(err) }, { status: 502 });
  }
}
