import { auth } from "./app/_lib/auth";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/home", request.url));
// }

// export const config = {
//   matcher: '/about/:path*',
// }

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
