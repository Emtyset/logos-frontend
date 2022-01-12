import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios'


export default NextAuth({
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        newUser: '/auth/signup'
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "logosscholar" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const username = credentials.username
                    const password = credentials.password

                    const user = await axios.post("http://localhost:5000/api/user/login", {
                        username: username,
                        password: password
                    }).then((res) => res.data.user)
                    if (user){
                        return {
                            id: 1,
                            name: username,
                            email: username.email
                        }
                    }
                } catch (err) {
                    console.error(err)
                }
                return null
            }
        })
    ],
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },

    secret: process.env.SECRET,
    
    jwt: {
        secret: process.env.SECRET
    },

})