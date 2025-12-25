import styles from './Appbar.module.css';

function Appbar() {
    return (
        <>

            <div className={styles.appbar}>
                <h1 className={styles.title}>Künstliche Intelligenz (KI) zur Erzeugung von Produktvideos: Erkennbarkeit und Auswirkungen</h1>
            </div>
            <button className={styles.settingsToggle}><img src="/src/assets/settings.svg" alt="" /></button>
        </>
    );
}

export default Appbar;