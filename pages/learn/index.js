import { getSession, useSession } from 'next-auth/react'
import Timeline from '../../components/Timeline'
import styles from "../../styles/Learn.module.scss"
import Navbar from "../../components/Navbar"
import StatPage from '../../components/Stats'
//import styled from "styled-components"

const N = 30

export default function LearnPage({ user, todayDone = false }) {
	const { data: session, status } = useSession()
	const loading = status === 'loading'

	return <>
		<Navbar />
		<div className="container">
			<div className={styles.wrapper}>
				<div className={styles.wrapper_timeline}>
					<Timeline user={user} N={N} todayDone={todayDone} sessionAddres={`/learn/${user.totalTrainings + 1}`} />
				</div>
				<div className={styles.wrapper_stats}>
					<StatPage user={user} />
				</div>
			</div>
		</div>
	</>
}


export async function getServerSideProps(context) {
	function isToday(date) {
		if (date) {
			const date_ = new Date(date)
			const today = new Date()
			return date_.getDate() == today.getDate() &&
				date_.getMonth() == today.getMonth() &&
				date_.getFullYear() == today.getFullYear()
		}
		return false;
	}

	let session = await getSession(context)
	const username = session.user.name
	const { sessions } = await (await fetch(`http://localhost:5000/api/user/${username}/session-dates/${N}`)).json()
	let { user } = await (await fetch(`http://localhost:5000/api/user/${username}`)).json()

	user.sessions = sessions
	const todayDone = isToday(user.lastTraining)

	return {
		props: {
			session: session,
			user: user,
			todayDone: todayDone
		}
	}
}
