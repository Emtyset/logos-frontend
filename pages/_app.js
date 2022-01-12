import '../styles/app.scss'
import { SessionProvider } from "next-auth/react"

// https://nextjs.org/docs/basic-features/layouts
export default function App ({ Component, pageProps }) {
    return (
      <SessionProvider session={pageProps.session} >
        <Component {...pageProps} />
      </SessionProvider>
    )
  }