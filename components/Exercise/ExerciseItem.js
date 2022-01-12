import styles from './ExerciseItem.module.scss'

const orderToTitle = [
    "Гимнастика", "Упражнение", "Контрольная точка"
]

export default function ExerciseItem({ exercise, focus = false, itemHeight = undefined, textFontSize = 16, onClick=() => null}) {
    const itemHeightPx = (itemHeight) ? `${itemHeight}px` : "auto"
    const textFontSizePx = `${textFontSize}px`
    console.log(styles.item_height)
    return (
        <li className={focus ? styles.exercise_item_li_chosen : styles.exercise_item_li} style={{ height: itemHeightPx }} key={exercise._id} onClick={onClick}>
            <br />
            <div className={styles.exercise_item_text_wrapper}>
                <span className={styles.exercise_item_header}>
                    {orderToTitle[exercise.order]}
                </span>
                {
                    exercise.text.map(subarray => {
                        return subarray.map((textblock, idx) => {
                            if (idx % 2) {
                                return <pre className={styles.exercise_item_pre} style={{ fontSize: textFontSizePx }}>
                                    {textblock}
                                </pre>
                            }
                            return <p className={styles.exercise_item_p} style={{ fontSize: textFontSizePx }}>
                                {textblock}
                            </p>
                        })
                    })
                }
            </div>
            <span className={styles.exercise_item_time}>
                {'≤ ' + exercise.time + ' sec'}
            </span>
        </li>
    )
}
