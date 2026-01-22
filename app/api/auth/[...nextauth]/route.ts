import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "mock_id",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "mock_secret",
      version: "2.0",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Pass the username/handle to the client
      // Note: In Twitter provider 2.0, the 'name' is the display name, 
      // check if we can get the handle. Usually 'sub' is the ID.
      // For this MVP we will rely on default session object.
      return session;
    },
  },
  // Adding debug to help diagnose issues if keys are missing
  debug: true,
});

export { handler as GET, handler as POST };
