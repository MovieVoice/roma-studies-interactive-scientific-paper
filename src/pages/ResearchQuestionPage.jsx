import { NavLink } from 'react-router-dom';
import styles from './ResearchQuestionPage.module.css';

function ResearchQuestionPage() {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <p className={styles.subheadline}>Forschungsfrage</p>
                    <p className={styles.headline}>Wie erkennbar sind KI-generierte Produktvideos auf Social-Media-Plattformen wie Instagram oder TikTok für 18- bis 29-Jährige und wie reagieren diese auf solche Videos?</p>
                    <p className={styles.text}>Ziel der Arbeit ist es, die Erkennbarkeit von KI‑generierten Produktvideos auf Social‑Media-Plattformen in der Altersgruppe der 18‑ bis 29‑Jährigen zu untersuchen. Darüber hinaus werden Chancen und Risiken dieser Werbeform herausgearbeitet und darauf aufbauend Handlungsempfehlungen für Unternehmen abgeleitet. Zusätzlich wird geprüft, ob sich die Erkennbarkeit im Zuge neuer KI‑Modelle im Vergleich zu bestehenden Studien verändert (insbesondere verschlechtert) hat und ob sich zwischen verschiedenen KI-Plattformen Unterschiede in der Erkennungsleistung zeigen.</p>
                </div>
            </div>
            <div className={styles.bottomNavbar}>
                <NavLink
                    to="/conclusion"
                    end
                    title="Fazit"
                    className={styles.bottomNavbarItem}
                >
                    <span className={styles.bottomNavbarItemBox}>
                        <img src="/src/assets/icons/previous-page.svg" alt="" />
                        <span className={styles.linkTitle}>Zum Fazit</span>
                    </span>
                </NavLink>
                <NavLink
                    to="/method"
                    end
                    title="Methodik & Vorgehen"
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

export default ResearchQuestionPage;