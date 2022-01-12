import styles from './Timeline.module.scss'
import Link from 'next/link'

const N_DAYS_AHEAD = 2 //(new Date().getDay() + 6) % 7

function grabNDayAgoDate(D, N) {
    var t = new Date(D.getTime())
    t.setDate(t.getDate() - N)
    return t
}

function grabNDates(lastInSeqDate, grabLastNDays, joinedDate) {
    let last_ = [...Array(Math.abs(grabLastNDays)).keys()].map((x) => grabNDayAgoDate(lastInSeqDate, x * Math.sign(grabLastNDays))).filter(x => x > new Date(joinedDate))
    if (grabLastNDays < 0) {
        return last_.reverse()
    } 
    return last_
}

function getDateComponent(date, text, className = styles.timeline__list_elem) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    return <> 
        <li className={className}>
            <div className={styles.timeline__date}>{day}/{month}</div>
            <p className={styles.timeline__text}>{text}</p>
        </li>
    </>
}

function getTodayComponent(date, text, sessionAddres){
    let day = date.getDate();
    let month = date.getMonth() + 1;
    return <> 
        <li className={styles.timeline__button_wrapper}>
            <Link href={sessionAddres}><a className={styles.timeline__button}>{text}</a></Link>
        </li>
    </>
}

function processPastDay(date, text, greenDays) {
    let isGreen = greenDays.filter(x => {
        return x.getDate() === date.getDate() && x.getMonth() === date.getMonth() && x.getFullYear() === date.getFullYear()
    }).length > 0
    return getDateComponent(date, text, isGreen ? styles.timeline__list_elem_green : styles.timeline__list_elem_red)
}


// https://codepen.io/TajShireen/pen/JjGvVzg
// https://codepen.io/TutulDevs/pen/oNbEgYx?editors=1100
export default function Timeline( { userSessionLastN, grabLastNDays, joinedDate, sessionAddres, todayDone = false} ) {
    const n = new Date()
    const tomorrow = grabNDayAgoDate(n, -1)
    const yesterday = grabNDayAgoDate(n, 1)
    console.log(joinedDate)
    let pastDays = grabNDates(yesterday, grabLastNDays, joinedDate)
    return <>
        <div className={styles.timeline}>
            <h1 className={styles.timeline__header}>Проверим ваше усердие...</h1>
            <ul className={styles.timeline__list}>
                {
                    grabNDates(tomorrow, -N_DAYS_AHEAD + pastDays.length - grabLastNDays, joinedDate).map((d) => getDateComponent(d, ""))

                }
                {
                    getTodayComponent(n, !todayDone ? "▸" : "✓", sessionAddres)
                }
                {
                    pastDays.map((d) => processPastDay(d, "", userSessionLastN))
                }
            </ul>
        </div>
    </>
}