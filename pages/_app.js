import '../styles/app.scss'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'

// https://nextjs.org/docs/basic-features/layouts
export default function App({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session} >
			<Head>
				<title>Logos</title>
				<link rel="shortcut icon" href="/static/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</SessionProvider>
	)
}