// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// export const { handlers, auth, signIn, signOut } = NextAuth({
//     providers: [GitHub],
//     callbacks: {
//         authorized({ request, auth }) {
//             const { pathname } = request.nextUrl
//             if (pathname.startsWith("/note/edit")) return !!auth
//             return true
//         },
//     }
// })

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials";
// import { addUser, getUser } from "@/lib/redis";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers:
        [GitHub],
    // pages: {
    //     signIn: '/auth/signin'
    // },
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname.startsWith("/note/edit")) return !!auth
            return true
        },
    }
})
