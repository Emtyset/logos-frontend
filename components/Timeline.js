import styles from './Timeline.module.scss'
import Link from 'next/link'

const N_DAYS_AHEAD = (new Date().getDay() + 6) % 7

function grabNthDayAgoDate(D, N) {
    var t = new Date(D.getTime())
    t.setDate(t.getDate() - N)
    return t
}

function grabNDates(lastInSeqDate, grabLastNDays, joinedDate) {
    let last_ = [...Array(Math.abs(grabLastNDays)).keys()].map((x) => grabNthDayAgoDate(lastInSeqDate, x * Math.sign(grabLastNDays))).filter(x => x > new Date(joinedDate))
    if (grabLastNDays < 0) {
        return last_.reverse()
    }
    return last_
}

// function getDateComponent(date, text, className = styles.timeline__list_elem) {
//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     return <>
//         <li className={className}>
//             <div className={styles.timeline__date}>{day}/{month}</div>
//             <p className={styles.timeline__text}>{text}</p>
//         </li>
//     </>
// }

// function getTodayComponent(date, text, sessionAddres) {
//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     return <>
//         <li className={styles.timeline__button_wrapper}>
//             <Link href={sessionAddres}><a className={styles.timeline__button}>{text}</a></Link>
//         </li>
//     </>
// }

// function processPastDay(date, text, greenDays) {
//     let isGreen = greenDays.filter(x => {
//         return x.getDate() === date.getDate() && x.getMonth() === date.getMonth() && x.getFullYear() === date.getFullYear()
//     }).length > 0
//     return getDateComponent(date, text, isGreen ? styles.timeline__list_elem_green : styles.timeline__list_elem_red)
// }

function isDateInArray(date, array) {
    for (const e of array) {
        if (date.getDate() == e.getDate() &&
            date.getMonth() == e.getMonth() &&
            date.getFullYear() == e.getFullYear())
            return true
    }
    return false
}

function constructOneList(dates, sessionArray, pastDays, now, sessionAddres, todayDone) {
    return <>
        {dates.map((day, idx) => {
            if (!isDateInArray(day, [now])) {
                let className = styles.timeline__list_elem
                if (pastDays.includes(day)) {
                    className = isDateInArray(day, sessionArray) ? styles.timeline__list_elem_green : styles.timeline__list_elem_red
                }
                return <li className={className}>
                    {day.getDate()}/{day.getMonth() + 1}
                </li>
            }
            return <li className={todayDone ? styles.timeline__button_wrapper_green : styles.timeline__button_wrapper}>
                <Link href={sessionAddres}><a className={styles.timeline__button}>{!todayDone ? "▸" : "✓"}</a></Link>
            </li>
        })}
    </>
}


// https://codepen.io/TajShireen/pen/JjGvVzg
// https://codepen.io/TutulDevs/pen/oNbEgYx?editors=1100
export default function Timeline({ user, sessionAddres, N, todayDone = false }) {
    const now = new Date()
    const tomorrow = grabNthDayAgoDate(now, -1)
    const yesterday = grabNthDayAgoDate(now, 1)
    let sessionArray = user.sessions.map(x => new Date(x))
    let pastDays = grabNDates(yesterday, N, user.joined)
    let futureDays = grabNDates(tomorrow, -N_DAYS_AHEAD + pastDays.length - N, user.joined)
    const totalDays = pastDays.length + futureDays.length + 1;
    const totalWeeks = Math.ceil(totalDays / 7)
    let allDays = futureDays.concat([now]).concat(pastDays)

    return <>
        <div className={styles.timeline}>
            <h1 className={styles.timeline__header}>Проверим ваше усердие...</h1>
            {
                <ul className={styles.timeline__list}>
                    {constructOneList(allDays, sessionArray, pastDays, now, sessionAddres, todayDone )}
                </ul>
            }
        </div>
    </>
}