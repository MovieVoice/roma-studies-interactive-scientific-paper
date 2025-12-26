import styles from './Modals.module.css';

function AboutModal() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.appbar}>
                    <p>About</p>
                    <button><img src="/src/assets/icons/close.svg" alt="Fenster schließen" /></button>
                </div>
                <div className={styles.content && styles.contentCenter}>
                    <p>Hinzufügen für Webversion.</p>
                </div>
            </div>
            <div className={styles.overlay}></div>
        </>
    );
}

export default AboutModal;