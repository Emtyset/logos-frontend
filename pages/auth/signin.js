import { getCsrfToken } from "next-auth/react"

import BackgroundWrapper from "../../components/BackgroundWrapper"
import FormCenter from "../../components/FormCenter"
import Input from "../../components/Input"


export default function SignIn({ csrfToken }) {

  return <>
    <BackgroundWrapper navbarOn={false} content={<>
      <FormCenter content={<>
        <form method="post" action="/api/auth/callback/credentials" className="form">
          <h1 className="sign_header">Вход</h1>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Input name="username" type="text" />
          <Input name="password" type="password" />
          <button type="submit" className="button">Подтвердить</button>
        </form>
      </>} />
    </>} />
  </>
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}