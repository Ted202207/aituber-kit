import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const allowedDomain = process.env.GOOGLE_ALLOWED_DOMAIN
        if (allowedDomain && profile?.email?.endsWith(allowedDomain)) {
          return true
        }
      }
      return false
    },
  },
})
