import { getCsrfToken, getSession } from "next-auth/react"

import BackgroundWrapper from "../../components/BackgroundWrapper"
import FormCenter from "../../components/FormCenter"


export default function SignOutPage({ session, csrfToken }) {
    return <>
        <BackgroundWrapper navbarOn={false} content={<>
            <FormCenter content={<>
                <form action="http://localhost:3000/api/auth/signout" method="POST" className="form">
                    <h1 className={"sign_header"}>Вы уверенны что хотите выйти из {session.user.name}?</h1>
                    <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
                    <button type="submit" className="button">Выйти</button>
                </form>
            </>} />
        </>} />
    </>
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
        props: {
            session: session,
            csrfToken: await getCsrfToken(context),
        },
    }
}