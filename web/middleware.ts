import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip authentication if BASIC_AUTH_ENABLED is not 'true'
  if (process.env.BASIC_AUTH_ENABLED !== 'true') {
    return NextResponse.next();
  }
  

  const basicAuth = request.headers.get('authorization');
  
  const url = request.nextUrl;
  
  // No longer excluding API routes from basic auth
  // if (url.pathname.startsWith('/api/')) {
  //   return NextResponse.next();
  // }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    const expectedUser = process.env.BASIC_AUTH_USERNAME || 'admin';
    const expectedPwd = process.env.BASIC_AUTH_PASSWORD || 'password';

    if (user === expectedUser && pwd === expectedPwd) {
      return NextResponse.next();
    }
  }

  // Return response with WWW-Authenticate header
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
