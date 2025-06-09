import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/admin/dashboard/modules')) {
    return NextResponse.redirect(new URL('/admin/dashboard/login', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/admin/dashboard/modules', '/admin/dashboard/modules/:path*'],
};
