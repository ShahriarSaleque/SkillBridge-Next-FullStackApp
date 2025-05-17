import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"],    
  // Only apply middleware to paths that start with /profile or /dashboard
  // and are not the login page
};