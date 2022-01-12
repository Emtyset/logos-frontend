import styles from "./FormCenter.module.scss"

export default function FormCenter({ content }) {
    return <>
        <div className="container">
            <div className={styles.form_center__wrapper}>
                <div className={styles.form_center__form_wrapper}>
                    {content}
                </div>
            </div>
        </div>
    </>
}