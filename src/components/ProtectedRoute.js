// import { getSession } from 'next-auth/react';
// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//   const session = await getSession(req);
//   if (session) {
//     console.log('User is authenticated:', session);
//   } else {
//     console.log('User is NOT');
//   }

//   return NextResponse.next();
// }

// export { default } from 'next-auth/middleware';
// export const config = { matcher: ['/todo'] };

// components/ProtectedRoute.js

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = (WrappedComponent) => {
  const WithProtection = (props) => {
    const router = useRouter();
    useEffect(() => {
      const checkAuth = async () => {
        const session = await getSession();
        console.log(session, 'this is session ');
        if (!session) {
          router.replace('/login');
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithProtection;
};

export default ProtectedRoute;
