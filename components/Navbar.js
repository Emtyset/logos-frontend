import { useSession } from "next-auth/react"

import Link from 'next/link'
import styles from './Navbar.module.scss'

function getAccountElems(session) {
    if (session) {
        return <>
            <li  className={styles.header__list_elem_login}><Link href="/"><a>{session.user.name}</a></Link></li>
            <li  className={styles.header__list_elem_login}><Link href="/api/auth/signout"><a>Выйти</a></Link></li>
        </>
    } else {
        return <>
            <li  className={styles.header__list_elem_login}><Link href="/auth/signin"><a>Войти</a></Link></li>
            <li  className={styles.header__list_elem_signup}><Link href="/auth/signup"><a>Регистрация</a></Link></li>
        </>
    }
}

// https://dev.to/javascriptacademy/responsive-navigation-bar-with-mobile-menu-using-html-css-2hpd
export default function Header() {
    const { data: session, status } = useSession()
    const loading = status === "loading"
    console.log("Session for some reason is", session)
    return <>
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <Link href="/"><a>λόγος</a></Link>
            </div>
            <nav className={styles.header__nav}>
                <ul className={styles.header__list}>
                    <li  className={styles.header__list_elem}><Link href="/"><a>Справка</a></Link></li>
                    <li  className={styles.header__list_elem}><Link href="/db"><a>База заданий</a></Link></li>
                    <li  className={styles.header__list_elem}><Link href="/"><a>Обучение</a></Link></li>
                    {getAccountElems(session)}
                </ul>
            </nav>
        </header>
    </>
}