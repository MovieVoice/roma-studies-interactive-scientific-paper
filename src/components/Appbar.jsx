import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Appbar.module.css';

function Appbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

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

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    return (
        <>
            <div className={styles.appbar}>
                <h1 className={styles.title}>
                    Künstliche Intelligenz (KI) zur Erzeugung von Produktvideos:
                    Erkennbarkeit und Auswirkungen
                </h1>

                <div className={styles.placeholder}></div>
                <img src="/src/assets/logo/logo-big.svg" alt="" className={styles.logo} />

                <button className={styles.settingsToggle} onClick={toggleMenu}>
                    <img src="/src/assets/icons/settings.svg" alt="Einstellungen" />
                </button>
            </div>

            {menuOpen && (
                <div className={styles.dropdown}>
                    <Link to="/about" state={{ background: location }} className={styles.dropdownAction}>
                        <img src="/src/assets/icons/about.svg" alt="" />
                        About
                    </Link>

                    <Link to="/privacy-policy" state={{ background: location }} className={styles.dropdownAction}>
                        <img src="/src/assets/icons/law.svg" alt="" />
                        Datenschutzerklärung
                    </Link>

                    <Link to="/imprint" state={{ background: location }} className={styles.dropdownAction}>
                        <img src="/src/assets/icons/imprint.svg" alt="" />
                        Impressum
                    </Link>

                    <button className={styles.dropdownAction} onClick={localStorage.clear()}>
                        <img src="/src/assets/icons/reset.svg" alt="" />
                        Fragebogen zurücksetzen
                    </button>
                </div>
            )}
        </>
    );
}

export default Appbar;
