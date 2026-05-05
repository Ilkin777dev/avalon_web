import styles from './BlueButton.module.css'

export default function BlueButton({linkText, linkDesc}) {
    return(
        <a href={linkText} class={styles.blue_button}>
            {linkDesc}
        </a>
    )
}