import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials'; 
import connectMongo from 'database/config';
import Users from 'models/Schema';
import { compare } from 'bcrypt';
import userService from 'src/utils/userService';

export default NextAuth({
  providers: [
    //Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 30000,
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error;
        });
        //check user existance
        const result = await Users.findOne({ email: credentials.email });

        if (!result) {
          session;
          throw new Error('No user found with this email pls sign up ');
        }

        //compare Password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        if (!checkPassword || result.email !== credentials.email) {
          throw new Error('Username Or Password is not Valid');
        }

        return result;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider !== 'credentials') {
        const providerSchema = await userService({
          username: user.name,
          email: user.email,
          provider: account.provider,
          password: null,
        });
        console.log(providerSchema);
      }
      const userData = {
        email: user.email,
        username: user.username,
      };
      return Promise.resolve(userData);
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user && user.password) {
        token.password = user.password;
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token && token.password) {
        // session.user.password = token.password;
      }
      // console.log(session, 'this is session');
      return session;
    },
  },
});
