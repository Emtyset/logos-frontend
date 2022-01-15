import styles from './ExerciseText.module.scss'


export default function ExerciseItem({ exercise, title="", content=undefined}) {
    console.log(styles.item_height)
    return (
        <div className={styles.exercise_text}>
            <br />
            <div className={styles.exercise_text_wrapper}>
                <span className={styles.exercise_text_header}>
                    {title}
                </span>
                {
                    exercise.text.map(subarray => {
                        return subarray.map((textblock, idx) => {
                            if (idx % 2) {
                                return <pre className={styles.exercise_text_pre}>
                                    {textblock}
                                </pre>
                            }
                            return <p className={styles.exercise_text_p}>
                                {textblock}
                            </p>
                        })
                    })
                }
            </div>
            <div className={styles.exercise_text__extra_content}>
            {content}
            </div>
        </div>
    )
}
