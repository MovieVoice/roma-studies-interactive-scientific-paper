import { useEffect, useState } from 'react';
import styles from './Appbar.module.css';

function Appbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest(`.${styles.dropdown}`) && !e.target.closest(`.${styles.settingsToggle}`)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    useEffect(() => {
        const handleResize = () => setMenuOpen(false);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className={styles.appbar}>
                <h1 className={styles.title}>Künstliche Intelligenz (KI) zur Erzeugung von Produktvideos: Erkennbarkeit und Auswirkungen</h1>
                <div className={styles.placeholder}></div>
                <img src="/src/assets/logo-big.svg" alt="" className={styles.logo} />
                <button className={styles.settingsToggle} onClick={toggleMenu}><img src="/src/assets/settings.svg" alt="" /></button>
            </div>

            {menuOpen && (
                <div className={styles.dropdown}>
                    {/* TODO Funktionen der Knöpfe hinzufügen */}
                    <button className={styles.dropdownAction}>
                        <img src="/src/assets/about.svg" alt="" />
                        About
                    </button>
                    <button className={styles.dropdownAction}>
                        <img src="/src/assets/law.svg" alt="" />
                        Datenschutzerklärung
                    </button>
                    <button className={styles.dropdownAction}>
                        <img src="/src/assets/imprint.svg" alt="" />
                        Impressum
                    </button>
                    <button className={styles.dropdownAction}>
                        <img src="/src/assets/reset.svg" alt="" />
                        Fragebogen zurücksetzen
                    </button>
                </div>
            )}
        </>
    );
}

export default Appbar;