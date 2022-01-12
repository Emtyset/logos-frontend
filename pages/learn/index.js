import { getSession, useSession } from 'next-auth/react'
import Timeline from '../../components/Timeline'
import styles from "../../styles/Learn.module.scss"
import Navbar from "../../components/Navbar"


const N = 30

function prepareJSON(data) {
    // wtf is this? https://stackoverflow.com/questions/70449092/reason-object-object-date-cannot-be-serialized-as-json-please-only-ret
    return data.map(x => Math.floor(x / 1000))
}

export default function LearnPage({userSessionsNLast, totalSessions, joinedDate, todayDone = false}) {
    const { data: session, status } = useSession()
	  const loading = status === 'loading'
    userSessionsNLast = userSessionsNLast.map(x => new Date(x * 1000))
    joinedDate = new Date(joinedDate * 1000)
    return <>
      <Navbar />
      <div className={styles.learn_page}>
          <Timeline userSessionLastN={userSessionsNLast} grabLastNDays={N} joinedDate={joinedDate} sessionAddres={`/learn/${totalSessions + 1}`} todayDone = {todayDone}/>
      </div>
    </>
}

function isToday(date) {
  if (date) {
    const date_ = new Date(date * 1000)
    const today = new Date()
    return date_.getDate() == today.getDate() &&
      date_.getMonth() == today.getMonth() &&
      date_.getFullYear() == today.getFullYear()
  }
  return false;
}

export async function getServerSideProps(context) {
    let session = await getSession(context)
    const username = session.user.name
    const {sessions, totalSessions, joined} = await (await fetch(`http://localhost:5000/api/user/${username}/session-dates/${N}`)).json()
    const todayDone = isToday(sessions.slice(-1)[0])
    console.log(todayDone)
    return {
      props: {
        session: session,
        userSessionsNLast: sessions,
        totalSessions: totalSessions,
        joinedDate: joined,
        todayDone: todayDone
      }
    }
  }
