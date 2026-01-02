import { NavLink } from 'react-router-dom';
import styles from './ResultsPage.module.css';

function ResultsPage() {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <p className={styles.headline}>Ergebnisübersicht der Befragung</p>

                </div>
            </div>
            <div className={styles.bottomNavbar}>
                <NavLink
                    to="/questionnaire/19"
                    end
                    title="Fragebogen"
                    className={styles.bottomNavbarItem}
                >
                    <span className={styles.bottomNavbarItemBox}>
                        <img src="/src/assets/icons/previous-page.svg" alt="" />
                        <span className={styles.linkTitle}>Zurück</span>
                    </span>
                </NavLink>
                <NavLink
                    to="/conclusion"
                    end
                    title="Fazit"
                    className={styles.bottomNavbarItem}
                >
                    <span className={styles.bottomNavbarItemBox}>
                        <span className={styles.linkTitle}>Weiter</span>
                        <img src="/src/assets/icons/next-page.svg" alt="" />
                    </span>
                </NavLink>
            </div>
        </>
    );
}

export default ResultsPage;