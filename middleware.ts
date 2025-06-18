import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/clerk", "/api/webhooks/stripe"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export function middleware(request: { url: string }) {
  const response = NextResponse.next();
  response.headers.set("x-url", request.url);
  return response;
}
