import { withAuth } from "next-auth/middleware";

// redirect to login page when log out

export default withAuth({
  pages: {
    signIn: "/",
  },
});
// protect route (redirect to "/" page when we get some path like below)

export const config = {
  matcher: ["/users/:path*", "/conversations/:path*"],
};
