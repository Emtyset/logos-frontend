import styles from "./Input.module.scss"

export default function Input({ type="text", onChange= () => undefined, name="", defaultValue=""}) {
    return <>
        <div className={styles.input_wrapper}>
            <input type={type} onChange={onChange} className={styles.input} name={name} defaultValue={defaultValue}/>
        </div>
    </>
}