import styles from "./BackgroundWrapper.module.scss"


export default function BackgroundWrapper({content, navbarOn = true}) {
    return <>
        <div className={navbarOn ? styles.background : styles.background_navbarless}>
            <div className={styles.background_wrapper}>
                {content}
            </div>
        </div>
    </>
}