import BackgroundWrapper from '../components/BackgroundWrapper'
import Navbar from "../components/Navbar"

import { getSession, useSession } from 'next-auth/react'
import styles from "../styles/Landing.module.scss"
import Link from 'next/link'


export default function LandingPage() {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    return <>
        <Navbar />
        <BackgroundWrapper navbarOn={true} content={<>
            <div className={styles.landing__window}>
                <h1 className={styles.landing__headline}><span className={styles.landing__logos}></span> — Поможем Вам избавиться от Ваших дефектов речи!</h1>
                <div className={styles.landing_button_wrapper}>
                    <Link href="/auth/signup"><a className={styles.landing__button}>Начать</a></Link>
                    <Link href="/auth/signin"><a className={styles.landing__button}>Уже есть аккаунт</a></Link>
                </div>
            </div>
        </>} />
    </>
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (session && session.user) {
        return {
            redirect: {
                destination: "/learn",
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}