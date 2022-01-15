import { useState } from "react"
import { useRouter } from 'next/router'
import { getSession } from "next-auth/react"
import axios from 'axios'

import Select from 'react-select'
import BackgroundWrapper from "../../components/BackgroundWrapper"
import FormCenter from "../../components/FormCenter"
import Input from "../../components/Input"


export default function SignUpPage({ defectOptions }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [selectedOptions, setOptions] = useState("")
    const router = useRouter()

    const handleChange = (option) => {
        setOptions(option)
    }

    const addUser = async () => {
        try {
            await axios.post('http://localhost:5000/api/user/register', {
                username,
                password,
                "defects": selectedOptions.map(x => x.value)
            }).then((res) => {
                console.log(res.data.isOk)
                router.push('/auth/signin')
            })
        } catch (err) {
            console.log(err)
        }
    }

    return <>
        <BackgroundWrapper navbarOn={false} content={<>
            <FormCenter content={<>
                <form onSubmit={e => e.preventDefault(e)} className="form">
                    <h1 className="sign_header">Регистрация</h1>
                    <Input type="text" onChange={e => setUsername(e.target.value)} />
                    <Input type="password" onChange={e => setPassword(e.target.value)} />
                    <p>Выберите свой дефект речи:</p>
                    <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={defectOptions}
                        onChange={handleChange}
                    />
                    <button onClick={e => addUser()} className="button">Подтвердить</button>
                </form>
            </>} />
        </>} />
    </>
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (session) {
        return {
            redirect: {
                destination: "/learn",
                permanent: false
            }
        }
    }

    let { defectOptions } = await (await fetch("http://localhost:5000/api/defect/get-all")).json()
    defectOptions = defectOptions.map(x => {
        return {
            label: x.description, value: x._id
        }
    })
    return {
        props: {
            session: session,
            defectOptions: defectOptions
        }
    }
}