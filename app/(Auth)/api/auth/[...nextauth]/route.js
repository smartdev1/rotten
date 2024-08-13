import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [  
    CredentialsProvider({
      name: "credentials",
      credentials: {},  
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const db = await client.db("movies_project");
          const User = await db.collection("users");

          const user = await User.findOne({ email });
          // console.log(user);

          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            console.log('invalid password');
            
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error:", error);
          return null;  
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.role = user.role
        token.password = user.password;
        token.username = user.username; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.id = token.id;
        session.email = token.email;
        session.role = token.role;
        session.password = token.password
        session.username = token.username; 
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
