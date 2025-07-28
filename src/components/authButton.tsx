import { signIn, signOut } from 'next-auth/react'

export const SignInButton = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      Sign in with Google
    </button>
  )
}

export const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
    >
      Sign out
    </button>
  )
}
