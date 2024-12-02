import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      console.log("1");
      await dbConnect();
      console.log("2");

      // On first sign in, assign 'Employee' role if user doesn't exist
      if (account && profile) {
        console.log("3");

        const existingUser = await User.findOne({ email: profile.email });

        console.log("4");

        if (!existingUser) {
          const newUser = await User.create({
            name: profile.name,
            email: profile.email,
            role: "Employee", // Default role
          });
          console.log("5");

          token.role = newUser.role; // Assign default role 'Employee'
          token.id = newUser._id;
        } else {
          console.log("6");

          token.role = existingUser.role; // Use existing user's role
          token.id = existingUser._id;
        }
      }
      console.log("7");

      return token; // Add role and ID to the JWT
    },
    async session({ session, token }) {
      session.user.role = token.role; // Pass role to session
      session.user.id = token.id;
      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    // encryption: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
