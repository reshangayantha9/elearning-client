import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID || '',
            clientSecret:process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID || '',
            clientSecret:process.env.GITHUB_CLIENT_SECRET || ''
        }),
        CredentialsProvider({
            name:"credentials",
            credentials:{},
            async authorize(credentials){
                const user=credentials as any
                if(user){
                    return user;
                }else{
                    return null
                }
            }

        })
        
    ],
    
    secret:process.env.SECRET
}
export default NextAuth(authOptions)